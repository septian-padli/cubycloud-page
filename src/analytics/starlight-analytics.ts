import { trackEvent, getStoredConsent } from './dataLayer';

/**
 * Client-side analytics instrumentation for Starlight documentation pages.
 */
function initStarlightAnalytics() {
  if (typeof window === 'undefined') return;

  const currentPath = window.location.pathname;

  // 1. Table of Contents link clicks
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement)?.closest('starlight-toc a, .right-sidebar a, nav[aria-label="Table of contents"] a');
    if (target) {
      const href = target.getAttribute('href') || '';
      const headingId = href.startsWith('#') ? href.slice(1) : href.split('#')[1] || '';
      if (headingId) {
        trackEvent({
          name: 'docs_toc_click',
          payload: {
            heading_id: headingId.slice(0, 50),
            docs_section: currentPath,
          },
        });
      }
    }
  });

  // 2. Code Copy button clicks
  document.addEventListener('click', (e) => {
    const copyBtn = (e.target as HTMLElement)?.closest('button[data-code], .copy-code-button, button[aria-label*="copy" i], button[title*="copy" i]');
    if (copyBtn) {
      const pre = copyBtn.closest('figure, pre, .expressive-code');
      const codeEl = pre?.querySelector('code');
      const langClass = Array.from(codeEl?.classList || []).find((c) => c.startsWith('language-'));
      const lang = langClass ? langClass.replace('language-', '') : 'code';

      trackEvent({
        name: 'docs_code_copy',
        payload: {
          code_context: lang.slice(0, 30),
        },
      });
    }
  });

  // 3. Documentation Read Milestones (25%, 50%, 75%, 100%)
  const milestonesReached = new Set<string>();
  const checkMilestones = () => {
    if (getStoredConsent() !== 'granted') return;
    const content = document.querySelector('.sl-markdown-content, main, article');
    if (!content) return;

    const rect = content.getBoundingClientRect();
    const contentHeight = rect.height;
    if (contentHeight <= 0) return;

    const viewportHeight = window.innerHeight;
    const scrolled = Math.max(0, -rect.top + (viewportHeight * 0.5));
    const progress = Math.min(1, scrolled / contentHeight);

    const thresholds: Array<{ pct: number; label: '25%' | '50%' | '75%' | '100%' }> = [
      { pct: 0.25, label: '25%' },
      { pct: 0.50, label: '50%' },
      { pct: 0.75, label: '75%' },
      { pct: 0.95, label: '100%' },
    ];

    for (const t of thresholds) {
      if (progress >= t.pct && !milestonesReached.has(t.label)) {
        milestonesReached.add(t.label);
        trackEvent({
          name: 'docs_read_milestone',
          payload: {
            milestone: t.label,
            docs_section: currentPath,
          },
        });
      }
    }
  };

  window.addEventListener('scroll', checkMilestones, { passive: true });
  window.addEventListener('cubycrate:consent-changed', checkMilestones);
  setTimeout(checkMilestones, 1000);
  // 4. Pagefind / Starlight Search Instrumentation
  let searchInitiated = false;
  document.addEventListener('focusin', (e) => {
    const input = e.target as HTMLElement;
    if (input && (input.matches('.pagefind-ui__search-input') || input.matches('input[type="search"]'))) {
      if (!searchInitiated) {
        searchInitiated = true;
        trackEvent({
          name: 'docs_search',
          payload: {
            action: 'search_initiated',
            docs_section: currentPath,
          },
        });
      }
    }
  });

  // Search result clicks
  document.addEventListener('click', (e) => {
    const resultLink = (e.target as HTMLElement)?.closest('.pagefind-ui__result-link, .pagefind-ui__result a');
    if (resultLink) {
      const href = resultLink.getAttribute('href') || '';
      const sanitizedTarget = href.split('?')[0].split('#')[0];
      trackEvent({
        name: 'docs_search_result_click',
        payload: {
          action: 'result_clicked',
          target_section: sanitizedTarget.slice(0, 100),
        },
      });
    }
  });

  // Search no results detection via MutationObserver
  const searchObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        const noResults = document.querySelector('.pagefind-ui__message:not(:empty)');
        if (noResults && noResults.textContent?.toLowerCase().includes('no results')) {
          trackEvent({
            name: 'docs_search_no_results',
            payload: {
              action: 'no_results',
            },
          });
          break;
        }
      }
    }
  });

  const searchContainer = document.querySelector('dialog, starlight-search, .pagefind-ui');
  if (searchContainer) {
    searchObserver.observe(searchContainer, { childList: true, subtree: true });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStarlightAnalytics);
} else {
  initStarlightAnalytics();
}
