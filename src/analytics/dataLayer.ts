import type { AnalyticsEvent, ConsentStatus } from './types';

export const GTM_ID = 'GTM-MMF4R3FS';
export const GA4_MEASUREMENT_ID = 'G-GRFZ1ZVX0Q';
export const CONSENT_STORAGE_KEY = 'cubycrate_consent_status';

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown> | unknown[]>;
    __CUBYCRATE_GTM_INITIALIZED__?: boolean;
    __CUBYCRATE_GTM_LOADED__?: boolean;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

/**
 * Optional Data Layer parameters that must be normalized and reset to undefined
 * when absent from subsequent events, preventing stale state leakage across GTM tags.
 */
export const OPTIONAL_EVENT_KEYS = [
  'selection',
  'result',
  'file_type',
  'docs_section',
  'destination',
  'target_section',
] as const;

const SENSITIVE_KEY_PATTERNS = [
  /password/i,
  /credential/i,
  /secret/i,
  /token/i,
  /search_term/i,
  /^query$/i,
  /api[_-]?key/i,
];

/**
 * Strips sensitive parameter keys from event payloads.
 */
export function sanitizePayload(
  payload: Record<string, unknown>
): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(payload)) {
    const isSensitive = SENSITIVE_KEY_PATTERNS.some((pattern) => pattern.test(key));
    if (!isSensitive) {
      sanitized[key] = val;
    }
  }
  return sanitized;
}

/**
 * Normalizes event payloads so that optional parameters not explicitly
 * provided on an event are set to undefined. Google Tag Manager recognizes
 * undefined values to clear variables from its internal Data Layer model.
 */
export function normalizeEventPayload(
  payload: Record<string, unknown>
): Record<string, unknown> {
  const normalized: Record<string, unknown> = {};
  for (const key of OPTIONAL_EVENT_KEYS) {
    normalized[key] = undefined;
  }
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined) {
      normalized[key] = value;
    }
  }
  return normalized;
}

/**
 * Validates whether current runtime is on an allowed production domain.
 * Restricts tracking on localhost, preview, staging, and workers.dev domains.
 * Supports dependency injection of hostname for deterministic testing without global bypasses.
 */
export function isTrackingAllowed(targetHostname?: string): boolean {
  if (typeof window === 'undefined' && !targetHostname) return false;

  const rawHostname =
    targetHostname ??
    (typeof window !== 'undefined' && window.location ? window.location.hostname : '');
  const hostname = rawHostname.toLowerCase().trim();

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

  // Check if GTM script is already present in DOM or already loaded in memory
  const existingScript =
    typeof document !== 'undefined' && typeof document.querySelector === 'function'
      ? document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${GTM_ID}"]`)
      : null;

  if (existingScript || window.__CUBYCRATE_GTM_LOADED__) {
    window[`ga-disable-${GA4_MEASUREMENT_ID}`] = false;
    window.__CUBYCRATE_GTM_INITIALIZED__ = true;
    window.__CUBYCRATE_GTM_LOADED__ = true;
    return true;
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
  window.__CUBYCRATE_GTM_LOADED__ = true;
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
      trackEvent({
        name: 'consent_update',
        payload: {
          selection: 'denied',
        },
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
  const sanitized = sanitizePayload(event.payload as Record<string, unknown>);
  const normalized = normalizeEventPayload(sanitized);

  window.dataLayer.push({
    event: event.name,
    ...normalized,
  });
}
