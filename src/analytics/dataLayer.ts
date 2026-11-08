import type { AnalyticsEvent, ConsentStatus } from './types';

export const GTM_ID = 'GTM-MMF4R3FS';
export const GA4_MEASUREMENT_ID = 'G-GRFZ1ZVX0Q';
export const CONSENT_STORAGE_KEY = 'cubycrate_consent_status';

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown> | unknown[]>;
    __CUBYCRATE_GTM_INITIALIZED__?: boolean;
    __CUBYCRATE_ANALYTICS_FORCE__?: boolean;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

/**
 * Validates whether current runtime is on an allowed production domain.
 * Restricts tracking on localhost, preview, staging, and workers.dev domains.
 */
export function isTrackingAllowed(): boolean {
  if (typeof window === 'undefined') return false;

  if (window.__CUBYCRATE_ANALYTICS_FORCE__ || sessionStorage.getItem('cubycrate_analytics_force') === 'true') {
    return true;
  }

  const hostname = window.location.hostname.toLowerCase();

  // Explicitly deny non-production domains
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.workers.dev') ||
    hostname.includes('staging') ||
    hostname.includes('preview')
  ) {
    return false;
  }

  return hostname === 'cubycrate.com' || hostname === 'www.cubycrate.com';
}

/**
 * Gets the current stored consent status.
 */
export function getStoredConsent(): ConsentStatus | null {
  if (typeof window === 'undefined') return null;
  try {
    const val = localStorage.getItem(CONSENT_STORAGE_KEY);
    return val === 'granted' || val === 'denied' ? val : null;
  } catch {
    return null;
  }
}

/**
 * Clears Google Analytics first-party cookies upon consent denial or withdrawal.
 */
export function clearAnalyticsCookies(): void {
  if (typeof document === 'undefined') return;

  const cookies = document.cookie.split(';');
  const domainParts = window.location.hostname.split('.');
  const domains = [
    '',
    window.location.hostname,
    '.' + window.location.hostname,
  ];

  if (domainParts.length >= 2) {
    domains.push('.' + domainParts.slice(-2).join('.'));
  }

  for (const cookie of cookies) {
    const name = cookie.split('=')[0]?.trim();
    if (name && (name === '_ga' || name === '_gid' || name.startsWith('_ga_') || name.startsWith('_gat'))) {
      for (const d of domains) {
        document.cookie = `${name}=; Path=/; Domain=${d}; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0; SameSite=Lax;`;
        document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0; SameSite=Lax;`;
      }
    }
  }
}

export function initGTM(): boolean {
  if (typeof window === 'undefined') return false;
  if (!isTrackingAllowed()) return false;
  if (getStoredConsent() !== 'granted') return false;
  if (window.__CUBYCRATE_GTM_INITIALIZED__) return true;

  window.dataLayer = window.dataLayer || [];

  // Set default consent state
  window.dataLayer.push([
    'consent',
    'default',
    {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    },
  ]);

  // Ensure ga-disable is inactive
  window[`ga-disable-${GA4_MEASUREMENT_ID}`] = false;

  // Standard GTM loader
  (function (w: Window, d: Document, s: string, l: string, i: string) {
    w[l as 'dataLayer'] = w[l as 'dataLayer'] || [];
    w[l as 'dataLayer'].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement(s) as HTMLScriptElement;
    const dl = l !== 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f?.parentNode?.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', GTM_ID);

  window.__CUBYCRATE_GTM_INITIALIZED__ = true;
  return true;
}

/**
 * Updates user consent preference, loads GTM if granted, or clears cookies if revoked.
 */
export function setConsent(status: ConsentStatus): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, status);
  } catch {
    // Storage access restricted
  }

  window.dispatchEvent(new CustomEvent('cubycrate:consent-changed', { detail: status }));

  if (status === 'granted') {
    window[`ga-disable-${GA4_MEASUREMENT_ID}`] = false;
    if (window.dataLayer) {
      window.dataLayer.push([
        'consent',
        'update',
        {
          analytics_storage: 'granted',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        },
      ]);
    }
    initGTM();
    trackEvent({
      name: 'consent_update',
      payload: { selection: 'granted' },
    });
  } else {
    // Disable GA4 collection completely
    window[`ga-disable-${GA4_MEASUREMENT_ID}`] = true;
    clearAnalyticsCookies();
    if (window.dataLayer) {
      window.dataLayer.push([
        'consent',
        'update',
        {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        },
      ]);
      window.dataLayer.push({
        event: 'consent_update',
        selection: 'denied',
      });
    }
  }
}

/**
 * Dispatches a typed event to dataLayer if tracking is allowed and consent is granted.
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  // Consent update is always permitted to log state transition
  if (event.name !== 'consent_update') {
    if (!isTrackingAllowed() || getStoredConsent() !== 'granted') {
      return;
    }
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: event.name,
    ...event.payload,
  });
}
