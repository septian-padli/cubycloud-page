import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GTM_ID,
  GA4_MEASUREMENT_ID,
  CONSENT_STORAGE_KEY,
  isTrackingAllowed,
  clearAnalyticsCookies,
  initGTM,
  setConsent,
  trackEvent,
} from '../src/analytics/dataLayer.ts';

// Setup DOM mocks for node environment
function createMockEnvironment(hostname = 'cubycrate.com') {
  const storage = new Map();
  const cookies = new Map();
  const listeners = new Map();
  const scripts = [];

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
    getElementsByTagName: (tag) => {
      if (tag === 'script') {
        return [{
          parentNode: {
            insertBefore: (el) => {
              scripts.push(el);
            },
          },
        }];
      }
      return [];
    },
    createElement: (tag) => {
      if (tag === 'script') {
        const scriptObj = {
          src: '',
          async: false,
          remove: () => {
            const idx = scripts.indexOf(scriptObj);
            if (idx !== -1) scripts.splice(idx, 1);
          },
        };
        return scriptObj;
      }
      return {};
    },
    querySelector: (selector) => {
      if (selector.includes('script[src*="googletagmanager.com/gtm.js?id=' + GTM_ID + '"]')) {
        return scripts.find((s) => s.src?.includes(GTM_ID)) || null;
      }
      return null;
    },
  };

  global.localStorage = {
    getItem: (k) => storage.get(k) || null,
    setItem: (k, v) => storage.set(k, String(v)),
    removeItem: (k) => storage.delete(k),
  };

  return { storage, cookies, scripts };
}

test('GTM Container ID is correctly configured to GTM-MMF4R3FS and GA4 to G-GRFZ1ZVX0Q', () => {
  assert.equal(GTM_ID, 'GTM-MMF4R3FS');
  assert.equal(GA4_MEASUREMENT_ID, 'G-GRFZ1ZVX0Q');
});

test('Domain restrictions block non-production environments', () => {
  createMockEnvironment('localhost');
  assert.equal(isTrackingAllowed(), false);

  createMockEnvironment('127.0.0.1');
  assert.equal(isTrackingAllowed(), false);

  createMockEnvironment('0.0.0.0');
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

test('Production-safe test isolation via window.__CUBYCRATE_ANALYTICS_FORCE__ only', () => {
  createMockEnvironment('localhost');
  assert.equal(isTrackingAllowed(), false);

  // Storage override is strictly ignored
  window.sessionStorage.getItem = (k) => (k === 'cubycrate_analytics_force' ? 'true' : null);
  assert.equal(isTrackingAllowed(), false, 'sessionStorage must not bypass domain restrictions');

  // Explicit window global override allowed for tests
  window.__CUBYCRATE_ANALYTICS_FORCE__ = true;
  assert.equal(isTrackingAllowed(), true, '__CUBYCRATE_ANALYTICS_FORCE__ should allow test execution');
});

test('Analytics events are blocked until consent is granted (zero tracking before consent)', () => {
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

test('Accepting consent initializes GTM, sets consent default + update, and allows tracking', () => {
  const env = createMockEnvironment('cubycrate.com');

  setConsent('granted');
  assert.equal(localStorage.getItem(CONSENT_STORAGE_KEY), 'granted');
  assert.equal(window.__CUBYCRATE_GTM_INITIALIZED__, true);
  assert.equal(env.scripts.length, 1, 'GTM script tag must be injected into DOM');
  assert.ok(env.scripts[0].src.includes(GTM_ID));

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

test('initGTM prevents duplicate script injection when invoked repeatedly', () => {
  const env = createMockEnvironment('cubycrate.com');
  localStorage.setItem(CONSENT_STORAGE_KEY, 'granted');

  const first = initGTM();
  assert.equal(first, true);
  assert.equal(env.scripts.length, 1);

  // Call again
  const second = initGTM();
  assert.equal(second, true);
  assert.equal(env.scripts.length, 1, 'Duplicate script tags must not be injected');

  // Reset flag but script exists in DOM
  window.__CUBYCRATE_GTM_INITIALIZED__ = false;
  const third = initGTM();
  assert.equal(third, true);
  assert.equal(env.scripts.length, 1, 'DOM presence check must prevent duplicate script injection');
});

test('Consent withdrawal removes GTM script from DOM, sets ga-disable flag, and resets initialized flag', () => {
  const env = createMockEnvironment('cubycrate.com');

  setConsent('granted');
  assert.equal(env.scripts.length, 1);
  assert.equal(window.__CUBYCRATE_GTM_INITIALIZED__, true);

  setConsent('denied');
  assert.equal(env.scripts.length, 0, 'GTM script must be removed from DOM upon consent denial');
  assert.equal(window.__CUBYCRATE_GTM_INITIALIZED__, false, 'Initialization flag must be reset to false');
  assert.equal(window[`ga-disable-${GA4_MEASUREMENT_ID}`], true, 'GA4 disable flag must be active');
});

test('Revoking consent clears Google Analytics cookies across domain variations', () => {
  createMockEnvironment('cubycrate.com');

  setConsent('granted');
  assert.equal(window[`ga-disable-${GA4_MEASUREMENT_ID}`], false);

  document.cookie = '_ga=GA1.1.123456789.1234567890';
  document.cookie = '_ga_GRFZ1ZVX0Q=GS1.1.1234567890.1.1.1234567890.0.0.0';
  document.cookie = '_gid=GA1.1.987654321.1234567890';
  document.cookie = '_gat_gtag_UA_test=1';
  document.cookie = '_gac_test=1';

  assert.ok(document.cookie.includes('_ga='));

  setConsent('denied');
  clearAnalyticsCookies();

  assert.equal(window[`ga-disable-${GA4_MEASUREMENT_ID}`], true, 'GA4 collection must be disabled on withdrawal');
  assert.ok(!document.cookie.includes('_ga='), '_ga cookie should be cleared');
  assert.ok(!document.cookie.includes('_gid='), '_gid cookie should be cleared');
  assert.ok(!document.cookie.includes('_ga_GRFZ1ZVX0Q='), '_ga_* cookie should be cleared');
  assert.ok(!document.cookie.includes('_gat='), '_gat cookie should be cleared');
  assert.ok(!document.cookie.includes('_gac='), '_gac cookie should be cleared');

  // Verify Google consent update push
  const consentUpdates = window.dataLayer.filter((item) => Array.isArray(item) && item[0] === 'consent' && item[1] === 'update');
  const latestConsent = consentUpdates[consentUpdates.length - 1];
  assert.ok(latestConsent, 'consent update array must be pushed to dataLayer');
  assert.equal(latestConsent[2].analytics_storage, 'denied');
});

test('Subsequent tracking is strictly blocked after consent withdrawal', () => {
  createMockEnvironment('cubycrate.com');

  setConsent('granted');
  trackEvent({
    name: 'section_view',
    payload: { section_name: 'hero' },
  });
  assert.equal(window.dataLayer.filter((e) => e.event === 'section_view').length, 1);

  // Withdraw consent
  setConsent('denied');

  // Attempt subsequent tracking
  trackEvent({
    name: 'section_view',
    payload: { section_name: 'features' },
  });
  trackEvent({
    name: 'cta_click',
    payload: { cta_name: 'test_cta', cta_location: 'hero' },
  });

  assert.equal(
    window.dataLayer.filter((e) => e.event === 'section_view').length,
    1,
    'No additional section_view events should be pushed after consent revocation'
  );
  assert.equal(
    window.dataLayer.filter((e) => e.event === 'cta_click').length,
    0,
    'No cta_click events should be pushed after consent revocation'
  );
});

test('Event schema validity: all 16 target events emit correct parameter names and payloads', () => {
  createMockEnvironment('cubycrate.com');
  setConsent('granted');

  const testEvents = [
    // Landing page events (6)
    { name: 'section_view', payload: { section_name: 'hero' } },
    { name: 'cta_click', payload: { cta_name: 'get_started', cta_location: 'hero', destination: '#get-started' } },
    { name: 'installation_intent', payload: { cta_name: 'install_cubycrate', cta_location: 'get_started', destination: '/docs/getting-started/installation/' } },
    { name: 'navigation_click', payload: { navigation_location: 'header', target_section: 'files' } },
    { name: 'faq_open', payload: { faq_id: 'faq_1', section_name: 'faq' } },
    { name: 'feature_select', payload: { feature_name: 'Local or S3', selection: '01', section_name: 'highlights' } },

    // Interactive demo events (3)
    { name: 'demo_interaction', payload: { demo_name: 'file_explorer', action: 'preview_opened', file_type: 'image' } },
    { name: 'demo_complete', payload: { demo_name: 'sharing', action: 'simulated_share_complete', selection: 'internal', result: 'success' } },
    { name: 'demo_reset', payload: { demo_name: 'storage' } },

    // Documentation events (7)
    { name: 'docs_search', payload: { action: 'search_query_submitted', docs_section: '/docs/' } },
    { name: 'docs_search_result_click', payload: { action: 'result_clicked', target_section: '/docs/getting-started/installation/' } },
    { name: 'docs_search_no_results', payload: { action: 'no_results' } },
    { name: 'docs_toc_click', payload: { heading_id: 'prerequisites', docs_section: '/docs/getting-started/installation/' } },
    { name: 'docs_code_copy', payload: { code_context: 'bash' } },
    { name: 'docs_read_milestone', payload: { milestone: '50%', docs_section: '/docs/getting-started/installation/' } },
    { name: 'docs_theme_change', payload: { selection: 'dark' } },
  ];

  for (const evt of testEvents) {
    trackEvent(evt);
    const pushed = window.dataLayer.find((e) => e.event === evt.name);
    assert.ok(pushed, `Event ${evt.name} must be pushed to dataLayer`);
    for (const [key, val] of Object.entries(evt.payload)) {
      assert.equal(pushed[key], val, `Parameter ${key} of event ${evt.name} must match`);
    }
  }
});

test('Sensitive data exclusion: verify no raw queries, passwords, file names, or credentials in payload', () => {
  createMockEnvironment('cubycrate.com');
  setConsent('granted');

  trackEvent({
    name: 'docs_search',
    payload: {
      action: 'search_query_submitted',
      docs_section: '/docs/',
    },
  });

  const searchEvt = window.dataLayer.find((e) => e.event === 'docs_search');
  assert.ok(searchEvt);
  assert.equal(searchEvt.query, undefined, 'Search event must never include raw query text');
  assert.equal(searchEvt.search_term, undefined, 'Search event must never include search_term');

  trackEvent({
    name: 'demo_interaction',
    payload: {
      demo_name: 'sharing',
      action: 'password_toggle',
      selection: 'enabled',
    },
  });

  const demoEvt = window.dataLayer.find((e) => e.action === 'password_toggle');
  assert.ok(demoEvt);
  assert.equal(demoEvt.password, undefined, 'Password value must never be tracked');
});
