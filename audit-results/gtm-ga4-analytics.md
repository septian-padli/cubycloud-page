# CubyCrate — Complete GTM + GA4 Analytics Integration Report

## 1. Executive Summary

| Attribute | Specification | Verification Result |
| :--- | :--- | :--- |
| **GTM Container ID** | `GTM-MMF4R3FS` | Confirmed & Installed |
| **GA4 Measurement ID** | `G-GRFZ1ZVX0Q` | Confirmed & Connected |
| **GA4 Web Stream ID** | `16297834902` | Confirmed (`CubyCrate Website`) |
| **Target PR Base** | `dev` | Branch created from `origin/dev` |
| **Feature Branch** | `feat/gtm-ga4-analytics` | Active |
| **Transport Model** | `dataLayer` → GTM → GA4 | Pure single-transport architecture |
| **Consent Model** | Strict Opt-in (Pre-consent collection blocked) | Verified across Homepage & Docs |

---

## 2. Status Matrix by Surface

| Component / Layer | Status | Implementation Evidence |
| :--- | :--- | :--- |
| **Code Implementation** | `IMPLEMENTED` | `src/analytics/dataLayer.ts`, `src/analytics/types.ts`, `src/components/ConsentBanner.astro`, `src/analytics/starlight-analytics.ts`, `src/docs/Head.astro`, `src/docs/Footer.astro` |
| **GTM Workspace** | `SAVED (UNPUBLISHED)` | `Google tag - GA4` (Tag), `ce - section_view` (Trigger), `dlv - section_name`, `dlv - cta_name`, `dlv - destination` (Variables) |
| **GA4 Property** | `SAVED` | 10 Event-Scoped Custom Dimensions saved in property `CubyCrate Website` (14-month data retention confirmed) |
| **Automated Tests** | `VERIFIED` | 22/22 unit & integration tests passing (`pnpm test`), Astro check passing (`pnpm check`) |
| **Production Build** | `VERIFIED` | Static output generated cleanly with Pagefind search index and sitemap |
| **Production Activation**| `PENDING OWNER REVIEW` | GTM container intentionally unpublished; PR ready for review |

---

## 3. Privacy & Consent Architecture

CubyCrate adheres to strict data minimization and user privacy:
1. **Zero Pre-Consent Tracking**: No GTM scripts or network calls to Google domains are executed before user explicitly grants analytics consent.
2. **Opt-in Modal & Preferences**: Unobtrusive banner rendered on both the Astro landing page and Starlight documentation pages.
3. **Withdrawal & Cookie Clearing**: Users can toggle preferences at any time via the persistent "ANALYTICS PREFERENCES" toggle (`#consent-settings-toggle`). Selecting "DECLINE" revokes consent and systematically deletes first-party Google Analytics cookies (`_ga`, `_gid`, `_ga_*`).
4. **Environment Gating**: Tracking is blocked on `localhost`, `127.0.0.1`, `*.workers.dev`, staging, and preview subdomains. Only `cubycrate.com` and `www.cubycrate.com` are permitted (with automated test overrides available).
5. **No PII or Sensitive Data**: Passwords, file names, file contents, email addresses, and raw search queries are strictly excluded from event payloads.

---

## 4. Complete Event Catalog

### 4.1 Landing Page Events

| Event Name | Parameters | Trigger Condition |
| :--- | :--- | :--- |
| `section_view` | `section_name` ('hero', 'files', 'sharing', 'storage', 'highlights', 'self_hosting', 'open_source', 'faq', 'get_started') | IntersectionObserver milestone (25% visibility), fired once per section per pageview |
| `cta_click` | `cta_name`, `cta_location`, `destination` | Clicks on buttons, GitHub links, and wayfinding actions |
| `installation_intent` | `cta_name`, `cta_location`, `destination` | High-intent click on primary installation CTA (`/docs/getting-started/installation/`) |
| `navigation_click` | `navigation_location`, `target_section` | Header, chapter nav, and mobile menu section links |
| `faq_open` | `faq_id`, `section_name` | Opening an accordion item in Practical FAQ |
| `feature_select` | `feature_name`, `selection`, `section_name` | Switching tabs in Supporting Highlights |

### 4.2 Interactive Demos

| Event Name | Parameters | Description |
| :--- | :--- | :--- |
| `demo_interaction` | `demo_name: 'file_explorer'`, `action`: 'folder_opened' \| 'file_selected' \| 'preview_opened' \| 'preview_unsupported' \| 'navigation', `file_type`, `selection`, `result` | File explorer interactions without transmitting raw names or file bodies |
| `demo_reset` | `demo_name: 'file_explorer'` | Resetting demo to initial state |
| `demo_interaction` | `demo_name: 'sharing'`, `action`: 'mode_select' \| 'permission_change' \| 'password_toggle' \| 'validation_failure', `selection`, `result` | Sharing workflow simulation (passwords never captured) |
| `demo_complete` | `demo_name: 'sharing'`, `action`: 'simulation_confirmed', `selection`, `result: 'success'` | Completed simulation confirmation |
| `demo_reset` | `demo_name: 'sharing'` | Resetting sharing demo |
| `demo_interaction` | `demo_name: 'storage'`, `action`: 'node_select' \| 'back_to_overview', `selection: 'local_disk' \| 's3_compatible'` | Conceptual storage topology selections |
| `demo_reset` | `demo_name: 'storage'` | Resetting storage demo |

### 4.3 Documentation Events (Starlight + Pagefind)

| Event Name | Parameters | Description |
| :--- | :--- | :--- |
| `docs_search` | `action: 'search_initiated'`, `docs_section` | Search input focused in Pagefind modal (query text omitted) |
| `docs_search_result_click` | `action: 'result_clicked'`, `target_section` | Click on search result item |
| `docs_search_no_results` | `action: 'no_results'` | Search query yielded 0 results |
| `docs_toc_click` | `heading_id`, `docs_section` | Table of contents heading navigation |
| `docs_code_copy` | `code_context` (e.g. 'bash', 'yaml', 'go') | Copying code block snippet (code body omitted) |
| `docs_read_milestone` | `milestone`: '25%' \| '50%' \| '75%' \| '100%', `docs_section` | Progressive reading milestones reached on doc articles |
| `docs_theme_change` | `selection: 'light' \| 'dark'` | Theme switcher toggle |

---

## 5. Dashboard Configuration Details

### 5.1 Google Tag Manager (`GTM-MMF4R3FS`)
- **Container**: `cubycrate.com` (`285857194`)
- **Workspace**: `Default Workspace` (Unpublished, 7 pending changes)
- **Tags**:
  - `Google tag - GA4` (Type: Google Analytics, Tag ID: `G-GRFZ1ZVX0Q`, Trigger: `Initialization - All Pages`)
  - `GA4 Event - All Custom Events` (Type: Google Analytics: GA4 Event, Measurement ID: `G-GRFZ1ZVX0Q`, Event Name: `{{Event}}`, Parameters: `section_name` = `{{dlv - section_name}}`, `cta_name` = `{{dlv - cta_name}}`, `destination` = `{{dlv - destination}}`, Trigger: `ce - all_custom_events`)
- **Variables**:
  - `dlv - section_name` (Data Layer Variable: `section_name`)
  - `dlv - cta_name` (Data Layer Variable: `cta_name`)
  - `dlv - destination` (Data Layer Variable: `destination`)
  - `Event` (Built-In Custom Event Variable)
- **Triggers**:
  - `Initialization - All Pages` (Built-in)
  - `ce - section_view` (Custom Event: `section_view`)
  - `ce - all_custom_events` (Custom Event matching `^(section_view|cta_click|installation_intent|navigation_click|faq_open|feature_select|demo_interaction|demo_complete|demo_reset|docs_.*)$`)
### 5.2 Google Analytics 4 (`G-GRFZ1ZVX0Q`)
- **Property**: `CubyCrate Website` (`563226579`)
- **Web Stream**: `CubyCrate Website` (Stream ID `16297834902`)
- **Data Retention**: 14 Months
- **Custom Dimensions (Event-Scoped)**:
  1. `Section Name` (`section_name`)
  2. `CTA Name` (`cta_name`)
  3. `CTA Location` (`cta_location`)
  4. `Demo Name` (`demo_name`)
  5. `Interaction Action` (`action`)
  6. `Interaction Selection` (`selection`)
  7. `Interaction Result` (`result`)
  8. `Docs Section` (`docs_section`)
  9. `Heading ID` (`heading_id`)
  10. `Navigation Location` (`navigation_location`)
- **Key Event Target**:
  - `installation_intent` (star toggle enabled upon first event ingestion)

---

## 6. How to Add New Events in the Future

1. **Define Type**: Add the event to `src/analytics/types.ts`:
   ```ts
   | {
       name: 'your_event_name';
       payload: {
         parameter_key: string;
       };
     }
   ```
2. **Dispatch Event**: Call `trackEvent` from any component or script:
   ```ts
   import { trackEvent } from '../analytics/dataLayer';

   trackEvent({
     name: 'your_event_name',
     payload: { parameter_key: 'value' },
   });
   ```
3. **Configure in GTM**: Create a Custom Event trigger for `your_event_name` and attach it to the GA4 Event tag.

---

## 7. Production Activation Checklist

When ready to publish to production:
1. Merge the Pull Request targeting `dev` into `dev` and subsequently `staging` / `main`.
2. Open GTM container `GTM-MMF4R3FS` and click **Submit** → **Publish** with version name e.g. `v1.0.0 — Production Analytics Initial Release`.
3. In GA4 Admin → Events, confirm incoming `installation_intent` and toggle the "Mark as Key event" star.
