import test from 'node:test';
import assert from 'node:assert/strict';
import { GTM_ID, CONSENT_STORAGE_KEY, isTrackingAllowed, clearAnalyticsCookies, setConsent, trackEvent } from '../src/analytics/dataLayer.ts';

// Setup minimal DOM mocks for node environment
function createMockEnvironment(hostname = 'cubycrate.com') {
  const storage = new Map();
  const cookies = new Map();
  const listeners = new Map();

  global.window = {
    location: {
      hostname,
      pathname: '/',
    },
    dataLayer: [],
    addEventListener: (event, cb) => {
      const arr = listeners.get(event) || [];
      arr.push(cb);
      listeners.set(event, arr);
    },
    removeEventListener: (event, cb) => {
      const arr = listeners.get(event) || [];
      listeners.set(event, arr.filter((fn) => fn !== cb));
    },
    dispatchEvent: (evt) => {
      const arr = listeners.get(evt.type) || [];
      for (const cb of arr) cb(evt);
      return true;
    },
    CustomEvent: class CustomEvent {
      constructor(type, init) {
        this.type = type;
        this.detail = init?.detail;
      }
    },
    sessionStorage: {
      getItem: () => null,
      setItem: () => {},
    },
  };

  global.document = {
    get cookie() {
      return Array.from(cookies.entries()).map(([k, v]) => `${k}=${v}`).join('; ');
    },
    set cookie(val) {
      const [pair] = val.split(';');
      const [k, v] = pair.split('=');
      if (val.includes('Expires=Thu, 01 Jan 1970') || val.includes('Max-Age=0')) {
        cookies.delete(k.trim());
      } else {
        cookies.set(k.trim(), v?.trim() || '');
      }
    },
    getElementsByTagName: () => [{
      parentNode: {
        insertBefore: () => {},
      },
    }],
    createElement: () => ({}),
  };

  global.localStorage = {
    getItem: (k) => storage.get(k) || null,
    setItem: (k, v) => storage.set(k, String(v)),
    removeItem: (k) => storage.delete(k),
  };

  return { storage, cookies };
}

test('GTM Container ID is correctly configured to GTM-MMF4R3FS', () => {
  assert.equal(GTM_ID, 'GTM-MMF4R3FS');
});

test('Domain restrictions block non-production environments', () => {
  createMockEnvironment('localhost');
  assert.equal(isTrackingAllowed(), false);

  createMockEnvironment('127.0.0.1');
  assert.equal(isTrackingAllowed(), false);

  createMockEnvironment('staging.cubycrate.com');
  assert.equal(isTrackingAllowed(), false);

  createMockEnvironment('my-app.workers.dev');
  assert.equal(isTrackingAllowed(), false);

  createMockEnvironment('preview-branch.cubycrate.com');
  assert.equal(isTrackingAllowed(), false);

  createMockEnvironment('cubycrate.com');
  assert.equal(isTrackingAllowed(), true);

  createMockEnvironment('www.cubycrate.com');
  assert.equal(isTrackingAllowed(), true);
});

test('Analytics events are blocked until consent is granted', () => {
  createMockEnvironment('cubycrate.com');

  trackEvent({
    name: 'section_view',
    payload: { section_name: 'hero' },
  });

  assert.equal(window.dataLayer.length, 0, 'No events should enter dataLayer without consent');

  // Explicitly deny
  setConsent('denied');
  assert.equal(localStorage.getItem(CONSENT_STORAGE_KEY), 'denied');

  trackEvent({
    name: 'cta_click',
    payload: { cta_name: 'install_cubycrate', cta_location: 'hero' },
  });

  // Only the consent_update event should exist
  const trackingEvents = window.dataLayer.filter((e) => !Array.isArray(e) && e.event !== 'consent_update');
  assert.equal(trackingEvents.length, 0, 'Tracking events must not fire when consent is denied');
});

test('Accepting consent initializes GTM and allows tracking', () => {
  createMockEnvironment('cubycrate.com');

  setConsent('granted');
  assert.equal(localStorage.getItem(CONSENT_STORAGE_KEY), 'granted');
  assert.equal(window.__CUBYCRATE_GTM_INITIALIZED__, true);

  trackEvent({
    name: 'installation_intent',
    payload: {
      cta_name: 'install_cubycrate',
      cta_location: 'get_started',
      destination: '/docs/getting-started/installation/',
    },
  });

  const intentEvent = window.dataLayer.find((e) => e.event === 'installation_intent');
  assert.ok(intentEvent, 'installation_intent event must exist in dataLayer');
  assert.equal(intentEvent.cta_name, 'install_cubycrate');
  assert.equal(intentEvent.destination, '/docs/getting-started/installation/');
});

test('Revoking consent clears Google Analytics cookies and sets ga-disable flag', () => {
  createMockEnvironment('cubycrate.com');

  setConsent('granted');
  assert.equal(window['ga-disable-G-GRFZ1ZVX0Q'], false);

  document.cookie = '_ga=GA1.1.123456789.1234567890';
  document.cookie = '_ga_GRFZ1ZVX0Q=GS1.1.1234567890.1.1.1234567890.0.0.0';
  document.cookie = '_gid=GA1.1.987654321.1234567890';

  assert.ok(document.cookie.includes('_ga='));

  setConsent('denied');
  clearAnalyticsCookies();

  assert.equal(window['ga-disable-G-GRFZ1ZVX0Q'], true, 'GA4 collection must be disabled on withdrawal');
  assert.ok(!document.cookie.includes('_ga='), '_ga cookie should be cleared');
  assert.ok(!document.cookie.includes('_gid='), '_gid cookie should be cleared');
  assert.ok(!document.cookie.includes('_ga_GRFZ1ZVX0Q='), '_ga_* cookie should be cleared');

  // Verify Google consent update push
  const consentUpdates = window.dataLayer.filter((item) => Array.isArray(item) && item[0] === 'consent' && item[1] === 'update');
  const latestConsent = consentUpdates[consentUpdates.length - 1];
  assert.ok(latestConsent, 'consent update array must be pushed to dataLayer');
  assert.equal(latestConsent[2].analytics_storage, 'denied');
});
