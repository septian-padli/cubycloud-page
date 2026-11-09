# CubyCrate Analytics Event Manifest & Handoff Specification

**Container ID:** `GTM-MMF4R3FS`  
**Measurement ID:** `G-GRFZ1ZVX0Q`  
**Stream ID:** `16297834902`  
**Target Domain:** `cubycrate.com` (and `www.cubycrate.com`)  
**Specification Date:** November 9, 2026  
**Status:** Codebase Implemented & Automated Tests Verified (28/28 Pass); GTM & GA4 Configuration Handed Off to Property Owner.

---

## A. Event-to-Parameter Mapping

This table outlines every analytics event emitted by CubyCrate across the landing page, interactive demos, Starlight documentation, and consent lifecycle.

| Event Name | Source Component / File | Exact UI Trigger | Parameters | Allowed Parameter Values | Consent Required | Deduplication Rules | Verification Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `section_view` | `src/App.tsx` | IntersectionObserver / ScrollTrigger when section enters viewport | `section_name` | `'hero'`, `'files'`, `'highlights'`, `'self_hosting'`, `'storage'`, `'sharing'`, `'open_source'`, `'faq'`, `'get_started'`, `'footer'` | Granted | `Set<string>` in component memory; fires at most once per section per page session | Verified (Automated + Local) |
| `cta_click` | `src/components/HeroExperience.tsx`, `src/components/Sections.tsx`, `src/components/SiteNavigation.tsx` | Click on primary CTAs, links, buttons, footer back-to-top | `cta_name`, `cta_location`, `destination` (optional) | `cta_name`: `'get_started'`, `'view_source'`, `'view_license'`, `'install_cubycrate'`, `'back_to_top'`, `'github_source'`<br>`cta_location`: `'hero'`, `'open_source'`, `'get_started'`, `'footer'`, `'header'`, `'mobile_menu'`<br>`destination`: target anchor or external URL | Granted | None; fires per intentional user click | Verified (Automated + Local) |
| `installation_intent` | `src/components/Sections.tsx` | Click on "START HERE / Install CubyCrate" button in Get Started section | `cta_name`, `cta_location`, `destination` | `cta_name`: `'install_cubycrate'`<br>`cta_location`: `'get_started'`<br>`destination`: `'/docs/getting-started/installation/'` | Granted | Fires per intentional installation CTA click (Key Event in GA4) | Verified (Automated + Local) |
| `navigation_click` | `src/components/SiteNavigation.tsx` | Click on header nav link, mobile menu link, or chapter rail indicator | `navigation_location`, `target_section` | `navigation_location`: `'header'`, `'mobile_menu'`, `'chapter_nav'`<br>`target_section`: `'top'`, `'files'`, `'docs'`, `'self-hosting'`, `'storage'`, `'sharing'` | Granted | None; fires per intentional user navigation click | Verified (Automated + Local) |
| `faq_open` | `src/components/Sections.tsx` | Expanding an accordion `<details>` element in Practical FAQ | `faq_id`, `section_name` | `faq_id`: `'faq_1'`, `'faq_2'`, `'faq_3'`, `'faq_4'`, `'faq_5'`<br>`section_name`: `'faq'` | Granted | Only fires when `details.open` transitions to `true` | Verified (Automated + Local) |
| `feature_select` | `src/components/Sections.tsx` | Clicking feature tab buttons in Feature Highlights section | `feature_name`, `selection`, `section_name` | `feature_name`: feature heading title (`'Local or S3 Storage'`, `'Fast Full-Text Search'`, etc.)<br>`selection`: `'01'`, `'02'`, `'03'`<br>`section_name`: `'highlights'` | Granted | Fires on explicit user tab switch | Verified (Automated + Local) |
| `demo_interaction` | `src/components/FileExplorerDemo.tsx`, `src/components/SharingDemo.tsx`, `src/components/StorageSelectorDemo.tsx` | Clicking folders, preview buttons, breadcrumbs, sharing permissions, password toggle, storage nodes | `demo_name`, `action`, `selection` (optional), `file_type` (optional), `result` (optional) | `demo_name`: `'file_explorer'`, `'sharing'`, `'storage'`<br>`action`: `'folder_opened'`, `'file_selected'`, `'preview_opened'`, `'preview_unsupported'`, `'navigation'`, `'mode_select'`, `'permission_change'`, `'password_toggle'`, `'validation_failure'`, `'node_select'`, `'back_to_overview'`<br>`selection`: `'folder'`, `'root'`, `'internal'`, `'public'`, `'viewer'`, `'editor'`, `'enabled'`, `'disabled'`, `'local_disk'`, `'s3_compatible'`<br>`file_type`: `'folder'`, `'text'`, `'image'`, `'unsupported'`<br>`result`: `'error'`, `'missing_password'` | Granted | Fires per interactive click; sensitive inputs (passwords) are excluded | Verified (Automated + Local) |
| `demo_complete` | `src/components/SharingDemo.tsx` | Clicking "SHOW SIMULATED RESULT" button after setting sharing rules | `demo_name`, `action`, `selection`, `result` | `demo_name`: `'sharing'`<br>`action`: `'simulated_share_complete'`<br>`selection`: `'internal'` or `'public'`<br>`result`: `'success'` | Granted | Fires when simulated flow completes successfully | Verified (Automated + Local) |
| `demo_reset` | `src/components/FileExplorerDemo.tsx`, `src/components/SharingDemo.tsx`, `src/components/StorageSelectorDemo.tsx` | Clicking reset / back-to-root buttons in interactive demos | `demo_name` | `demo_name`: `'file_explorer'`, `'sharing'`, `'storage'` | Granted | Fires on reset click | Verified (Automated + Local) |
| `docs_search` | `src/analytics/starlight-analytics.ts` | Entering text in Starlight / Pagefind search input (length >= 2 characters) | `action`, `docs_section` | `action`: `'search_query_submitted'`<br>`docs_section`: current docs pathname (e.g. `'/docs/getting-started/installation/'`) | Granted | Emitted once per search session when input reaches 2+ characters; reset when input is cleared. Never sends raw search text | Verified (Automated + Local) |
| `docs_search_result_click` | `src/analytics/starlight-analytics.ts` | Clicking a search result item link in Pagefind modal | `action`, `target_section` | `action`: `'result_clicked'`<br>`target_section`: sanitized relative destination path without query or hash | Granted | Fires per result click | Verified (Automated + Local) |
| `docs_search_no_results` | `src/analytics/starlight-analytics.ts` | Pagefind search results container shows "No results found" message | `action` | `action`: `'no_results'` | Granted | Deduplicated with boolean flag `noResultsReported` to avoid repeated triggers per keystroke | Verified (Automated + Local) |
| `docs_toc_click` | `src/analytics/starlight-analytics.ts` | Clicking a table-of-contents link in the Starlight right rail | `heading_id`, `docs_section` | `heading_id`: target heading slug (e.g. `'prerequisites'`, `'configuration-options'`)<br>`docs_section`: current docs pathname | Granted | Fires on TOC anchor click | Verified (Automated + Local) |
| `docs_code_copy` | `src/analytics/starlight-analytics.ts` | Clicking code block copy button | `code_context` | `code_context`: programming or shell language identifier (e.g. `'bash'`, `'yaml'`, `'json'`, `'dockerfile'`, `'code'`) | Granted | Fires on copy button click; never sends copied code content | Verified (Automated + Local) |
| `docs_read_milestone` | `src/analytics/starlight-analytics.ts` | Scrolling through article content reaching reading depth milestones | `milestone`, `docs_section` | `milestone`: `'25%'`, `'50%'`, `'75%'`, `'100%'`<br>`docs_section`: current docs pathname | Granted | Guarded by `milestonesReached` Set; emitted strictly once per milestone per article view. Requires article height > 200px | Verified (Automated + Local) |
| `docs_theme_change` | `src/docs/ThemeSelect.astro` | Clicking the theme toggle button in docs header | `selection` | `selection`: `'dark'`, `'light'` | Granted | Gated by `isUserAction = true`. Ignored on automated `matchMedia` system color-scheme changes | Verified (Automated + Local) |
| `consent_update` | `src/analytics/dataLayer.ts` | User clicks Accept or Decline in privacy banner, or updates preferences | `selection` | `selection`: `'granted'`, `'denied'` | None (operational event) | Logged on consent state transitions | Verified (Automated + Local) |

---

## B. GTM Data Layer Variable Inventory

The table below lists all 17 Data Layer Variables required by the container. Each variable must be defined in GTM as a **Data Layer Variable** (Version 2).

| GTM Variable Name | Data Layer Variable Name | Value Type | Events Using This Variable | Status in GTM Workspace |
| :--- | :--- | :--- | :--- | :--- |
| `dlv - action` | `action` | String | `demo_interaction`, `demo_complete`, `docs_search`, `docs_search_result_click`, `docs_search_no_results` | Reported Created |
| `dlv - code_context` | `code_context` | String | `docs_code_copy` | Pending Owner Verification / Creation |
| `dlv - cta_location` | `cta_location` | String | `cta_click`, `installation_intent` | Reported Created |
| `dlv - cta_name` | `cta_name` | String | `cta_click`, `installation_intent` | Reported Created |
| `dlv - demo_name` | `demo_name` | String | `demo_interaction`, `demo_complete`, `demo_reset` | Reported Created |
| `dlv - destination` | `destination` | String | `cta_click`, `installation_intent` | Reported Created |
| `dlv - docs_section` | `docs_section` | String | `docs_search`, `docs_toc_click`, `docs_read_milestone` | Pending Owner Verification / Creation |
| `dlv - faq_id` | `faq_id` | String | `faq_open` | Reported Created |
| `dlv - feature_name` | `feature_name` | String | `feature_select` | Reported Created |
| `dlv - file_type` | `file_type` | String | `demo_interaction` | Reported Created |
| `dlv - heading_id` | `heading_id` | String | `docs_toc_click` | Pending Owner Verification / Creation |
| `dlv - milestone` | `milestone` | String | `docs_read_milestone` | Pending Owner Verification / Creation |
| `dlv - navigation_location` | `navigation_location` | String | `navigation_click` | Reported Created |
| `dlv - result` | `result` | String | `demo_interaction`, `demo_complete` | Reported Created |
| `dlv - section_name` | `section_name` | String | `section_view`, `faq_open`, `feature_select` | Reported Created |
| `dlv - selection` | `selection` | String | `feature_select`, `demo_interaction`, `demo_complete`, `docs_theme_change`, `consent_update` | Reported Created |
| `dlv - target_section` | `target_section` | String | `navigation_click`, `docs_search_result_click` | Reported Created |

---

## C. Recommended GTM Tags and Triggers

### 1. Google Tag (Base Configuration)
- **Tag Type:** Google Tag
- **Tag Name:** `GA4 - Google Tag - G-GRFZ1ZVX0Q`
- **Tag ID:** `G-GRFZ1ZVX0Q`
- **Trigger:** `Initialization - All Pages` (or `Consent Initialization - All Pages`)
- **Configuration Parameters:**
  - `send_page_view`: `true`
  - `cookie_flags`: `SameSite=Lax;Secure`

### 2. Custom Event Triggers
Create dedicated Custom Event triggers for each event name to ensure isolation and prevent cross-event parameter leakage:

1. `ce - section_view` → Event name: `section_view`
2. `ce - cta_click` → Event name: `cta_click`
3. `ce - installation_intent` → Event name: `installation_intent`
4. `ce - navigation_click` → Event name: `navigation_click`
5. `ce - faq_open` → Event name: `faq_open`
6. `ce - feature_select` → Event name: `feature_select`
7. `ce - demo_interaction` → Event name: `demo_interaction`
8. `ce - demo_complete` → Event name: `demo_complete`
9. `ce - demo_reset` → Event name: `demo_reset`
10. `ce - docs_search` → Event name: `docs_search`
11. `ce - docs_search_result_click` → Event name: `docs_search_result_click`
12. `ce - docs_search_no_results` → Event name: `docs_search_no_results`
13. `ce - docs_toc_click` → Event name: `docs_toc_click`
14. `ce - docs_code_copy` → Event name: `docs_code_copy`
15. `ce - docs_read_milestone` → Event name: `docs_read_milestone`
16. `ce - docs_theme_change` → Event name: `docs_theme_change`

### 3. GA4 Event Tags with Isolated Parameter Mapping
To prevent stale parameters (where parameters from a prior event inadvertently persist into subsequent events), configure each GA4 Event Tag with **only its explicit parameters**:

| Tag Name | Trigger | GA4 Event Name | Parameter Mapping in Tag |
| :--- | :--- | :--- | :--- |
| `GA4 - Event - section_view` | `ce - section_view` | `section_view` | `section_name` = `{{dlv - section_name}}` |
| `GA4 - Event - cta_click` | `ce - cta_click` | `cta_click` | `cta_name` = `{{dlv - cta_name}}`<br>`cta_location` = `{{dlv - cta_location}}`<br>`destination` = `{{dlv - destination}}` |
| `GA4 - Event - installation_intent` | `ce - installation_intent` | `installation_intent` | `cta_name` = `{{dlv - cta_name}}`<br>`cta_location` = `{{dlv - cta_location}}`<br>`destination` = `{{dlv - destination}}` |
| `GA4 - Event - navigation_click` | `ce - navigation_click` | `navigation_click` | `navigation_location` = `{{dlv - navigation_location}}`<br>`target_section` = `{{dlv - target_section}}` |
| `GA4 - Event - faq_open` | `ce - faq_open` | `faq_open` | `faq_id` = `{{dlv - faq_id}}`<br>`section_name` = `{{dlv - section_name}}` |
| `GA4 - Event - feature_select` | `ce - feature_select` | `feature_select` | `feature_name` = `{{dlv - feature_name}}`<br>`selection` = `{{dlv - selection}}`<br>`section_name` = `{{dlv - section_name}}` |
| `GA4 - Event - demo_interaction` | `ce - demo_interaction` | `demo_interaction` | `demo_name` = `{{dlv - demo_name}}`<br>`action` = `{{dlv - action}}`<br>`selection` = `{{dlv - selection}}`<br>`file_type` = `{{dlv - file_type}}`<br>`result` = `{{dlv - result}}` |
| `GA4 - Event - demo_complete` | `ce - demo_complete` | `demo_complete` | `demo_name` = `{{dlv - demo_name}}`<br>`action` = `{{dlv - action}}`<br>`selection` = `{{dlv - selection}}`<br>`result` = `{{dlv - result}}` |
| `GA4 - Event - demo_reset` | `ce - demo_reset` | `demo_reset` | `demo_name` = `{{dlv - demo_name}}` |
| `GA4 - Event - docs_search` | `ce - docs_search` | `docs_search` | `action` = `{{dlv - action}}`<br>`docs_section` = `{{dlv - docs_section}}` |
| `GA4 - Event - docs_search_result_click` | `ce - docs_search_result_click` | `docs_search_result_click` | `action` = `{{dlv - action}}`<br>`target_section` = `{{dlv - target_section}}` |
| `GA4 - Event - docs_search_no_results` | `ce - docs_search_no_results` | `docs_search_no_results` | `action` = `{{dlv - action}}` |
| `GA4 - Event - docs_toc_click` | `ce - docs_toc_click` | `docs_toc_click` | `heading_id` = `{{dlv - heading_id}}`<br>`docs_section` = `{{dlv - docs_section}}` |
| `GA4 - Event - docs_code_copy` | `ce - docs_code_copy` | `docs_code_copy` | `code_context` = `{{dlv - code_context}}` |
| `GA4 - Event - docs_read_milestone` | `ce - docs_read_milestone` | `docs_read_milestone` | `milestone` = `{{dlv - milestone}}`<br>`docs_section` = `{{dlv - docs_section}}` |
| `GA4 - Event - docs_theme_change` | `ce - docs_theme_change` | `docs_theme_change` | `selection` = `{{dlv - selection}}` |

### 4. Consent-Aware Execution Rules
- All tags must use GTM's built-in Consent Settings check for `analytics_storage`.
- In CubyCrate, `initGTM()` sets default consent: `analytics_storage: granted`, with advertising storages denied. When consent is denied or withdrawn, `analytics_storage` is updated to `denied` and `ga-disable-G-GRFZ1ZVX0Q = true` disables all GA4 collection immediately.

---

## D. GA4 Configuration

### 1. Existing Custom Dimensions (Confirmed Active in GA4 Admin)
The following 10 event-scoped custom dimensions were verified in GA4 Property `407149270`:

| Dimension Name | Scope | Event Parameter | Description |
| :--- | :--- | :--- | :--- |
| `CTA Location` | Event | `cta_location` | Placement context of CTA (hero, footer, etc.) |
| `CTA Name` | Event | `cta_name` | Identifier of clicked CTA button/link |
| `Demo Name` | Event | `demo_name` | Name of interactive demo (file_explorer, sharing, storage) |
| `Docs Section` | Event | `docs_section` | Current documentation section or path |
| `Heading ID` | Event | `heading_id` | Anchor slug of TOC heading clicked |
| `Interaction Action` | Event | `action` | Action descriptor for demos and docs search |
| `Interaction Result` | Event | `result` | Result status of demo actions (success, error, etc.) |
| `Interaction Selection` | Event | `selection` | Selected item, mode, theme, or consent status |
| `Navigation Location` | Event | `navigation_location` | Location of navigation control (header, mobile, rail) |
| `Section Name` | Event | `section_name` | Main landing section name entered |

### 2. Recommended Additional Custom Dimensions
The owner should register the remaining event parameters in GA4 Admin › Custom Definitions › Custom Dimensions:

1. `Target Section` → Parameter: `target_section` (Scope: Event)
2. `Destination` → Parameter: `destination` (Scope: Event)
3. `Feature Name` → Parameter: `feature_name` (Scope: Event)
4. `FAQ ID` → Parameter: `faq_id` (Scope: Event)
5. `File Type` → Parameter: `file_type` (Scope: Event)
6. `Code Context` → Parameter: `code_context` (Scope: Event)
7. `Milestone` → Parameter: `milestone` (Scope: Event)

### 3. Key Event Configuration
- **Recommended Key Event:** `installation_intent`
- **Owner Action:** In GA4 Admin › Events, mark `installation_intent` as a Key Event (starred) once the first event hit is recorded by GA4 from the live or preview stream.

---

## E. Manual Testing Checklist

Use Google Tag Assistant (`tagassistant.google.com`) or GTM Preview mode together with GA4 DebugView (`analytics.google.com` › Admin › DebugView) to validate the integration:

### 1. Consent Gating & Initial State
- [ ] Open incognito tab to `https://cubycrate.com/` (or local build with force flag enabled).
- [ ] Verify banner appears with "MEASUREMENT CHOICES".
- [ ] Verify `window.dataLayer` contains no tracking events before interaction.
- [ ] Verify network tab shows zero requests to `googletagmanager.com/gtm.js` or `google-analytics.com/g/collect`.
- [ ] Click **Decline**:
  - [ ] `localStorage.getItem('cubycrate_consent_status')` is `'denied'`.
  - [ ] `window['ga-disable-G-GRFZ1ZVX0Q']` is `true`.
  - [ ] Cookies (`_ga`, `_gid`, `_gat`) are deleted.
- [ ] Click **Analytics Preferences** toggle button to reopen banner.
- [ ] Click **Accept Analytics**:
  - [ ] `localStorage.getItem('cubycrate_consent_status')` is `'granted'`.
  - [ ] GTM script tag injected into `<head>`.
  - [ ] `dataLayer` receives `consent, default` and `consent, update`.

### 2. Landing Page Events
- [ ] Scroll down page:
  - [ ] Verify `section_view` fires for `hero`, `files`, `highlights`, `self_hosting`, `storage`, `sharing`, `open_source`, `faq`, `get_started`, `footer`.
  - [ ] Verify each section fires at most once per visit.
- [ ] Click "GET STARTED" in hero:
  - [ ] Verify `cta_click` fires with `cta_name: 'get_started'`, `cta_location: 'hero'`.
- [ ] In Feature Highlights:
  - [ ] Click tab 02 and 03: verify `feature_select` fires with `selection: '02'`, `feature_name: '...'`.
- [ ] In Practical FAQ:
  - [ ] Expand FAQ item: verify `faq_open` fires with `faq_id: 'faq_1'`.
- [ ] In Get Started section:
  - [ ] Click "START HERE": verify `installation_intent` fires with `destination: '/docs/getting-started/installation/'`.

### 3. Interactive Demos
- [ ] **File Explorer Demo:**
  - [ ] Click folder: verify `demo_interaction` with `action: 'folder_opened'`.
  - [ ] Click unsupported file: verify `action: 'preview_unsupported'`, `result: 'error'`.
  - [ ] Click "RESET DEMO": verify `demo_reset` fires.
- [ ] **Sharing Demo:**
  - [ ] Select Public link: verify `action: 'mode_select'`, `selection: 'public'`.
  - [ ] Toggle password protection: verify `action: 'password_toggle'`.
  - [ ] Click "SHOW SIMULATED RESULT": verify `demo_complete` with `result: 'success'`.
- [ ] **Storage Selector Demo:**
  - [ ] Select S3-compatible node: verify `action: 'node_select'`, `selection: 's3_compatible'`.

### 4. Starlight Documentation
- [ ] Navigate to `/docs/`:
  - [ ] Verify TOC click on any heading: `docs_toc_click` with `heading_id`.
  - [ ] Click code copy button: `docs_code_copy` with language context (e.g. `'bash'`).
  - [ ] Scroll through article: `docs_read_milestone` fires sequentially at `25%`, `50%`, `75%`, `100%`.
  - [ ] Click Theme Toggle in docs header: `docs_theme_change` with `selection: 'dark'` or `'light'`.
  - [ ] Open search modal and type `docker`: `docs_search` fires with `action: 'search_query_submitted'`.
  - [ ] Click search result item: `docs_search_result_click` with `target_section`.
  - [ ] Type non-matching gibberish `xyzxyz123`: `docs_search_no_results` fires exactly once.

### 5. Consent Revocation
- [ ] In footer, click "ANALYTICS PREFERENCES" toggle.
- [ ] Click **Decline**.
- [ ] Verify GTM script tag is immediately removed from the DOM.
- [ ] Verify `window['ga-disable-G-GRFZ1ZVX0Q']` is set to `true`.
- [ ] Verify all `_ga*` cookies are deleted.
- [ ] Perform further interactions: verify zero subsequent tracking events are recorded.
