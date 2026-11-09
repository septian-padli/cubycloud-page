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

  // Isolated test override: only permitted in test environments or explicit test global
  if (window.__CUBYCRATE_ANALYTICS_FORCE__) {
    return true;
  }

  const hostname = window.location.hostname.toLowerCase();

  // Explicitly deny non-production, staging, preview, local, and worker domains
  if (
    !hostname ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0' ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.localhost') ||
    hostname.endsWith('.workers.dev') ||
    hostname.includes('staging') ||
    hostname.includes('preview')
  ) {
    return false;
  }

  // Strictly allow only official production apex and www domains
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

  const cookies = document.cookie ? document.cookie.split(';') : [];
  const hostname = typeof window !== 'undefined' && window.location ? window.location.hostname : '';
  const domainParts = hostname.split('.');
  const domains = [
    '',
    hostname,
    '.' + hostname,
  ];

  if (domainParts.length >= 2) {
    domains.push('.' + domainParts.slice(-2).join('.'));
  }

  const cookiePrefixes = ['_ga', '_gid', '_gat', '_gac', '_gcl'];

  for (const cookie of cookies) {
    const name = cookie.split('=')[0]?.trim();
    if (name && cookiePrefixes.some((p) => name === p || name.startsWith(p + '_') || name.startsWith(p + '-'))) {
      for (const d of domains) {
        const domainAttr = d ? ` Domain=${d};` : '';
        document.cookie = `${name}=; Path=/;${domainAttr} Expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0; SameSite=Lax;`;
      }
    }
  }
}

export function initGTM(): boolean {
  if (typeof window === 'undefined') return false;
  if (!isTrackingAllowed()) return false;
  if (getStoredConsent() !== 'granted') return false;
  if (window.__CUBYCRATE_GTM_INITIALIZED__) return true;

  // Check if GTM script is already present in DOM
  if (typeof document !== 'undefined' && typeof document.querySelector === 'function') {
    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${GTM_ID}"]`);
    if (existingScript) {
      window.__CUBYCRATE_GTM_INITIALIZED__ = true;
      return true;
    }
  }

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
    if (f?.parentNode) {
      f.parentNode.insertBefore(j, f);
    } else {
      d.head?.appendChild(j);
    }
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

    // Remove injected GTM script if present and reset initialization state
    if (typeof document !== 'undefined' && typeof document.querySelector === 'function') {
      const gtmScript = document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${GTM_ID}"]`);
      gtmScript?.remove();
    }
    window.__CUBYCRATE_GTM_INITIALIZED__ = false;

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

  // Non-production environments never receive tracking or consent events
  if (!isTrackingAllowed()) return;

  // Standard events require explicit opt-in consent
  if (event.name !== 'consent_update') {
    if (getStoredConsent() !== 'granted') {
      return;
    }
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: event.name,
    ...event.payload,
  });
}
