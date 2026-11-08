export type AnalyticsEvent =
  | {
      name: 'section_view';
      payload: {
        section_name: string;
      };
    }
  | {
      name: 'cta_click';
      payload: {
        cta_name: string;
        cta_location: string;
        destination?: string;
      };
    }
  | {
      name: 'installation_intent';
      payload: {
        cta_name: string;
        cta_location: string;
        destination: string;
      };
    }
  | {
      name: 'navigation_click';
      payload: {
        navigation_location: string;
        target_section: string;
      };
    }
  | {
      name: 'faq_open';
      payload: {
        faq_id: string;
        section_name: string;
      };
    }
  | {
      name: 'feature_select';
      payload: {
        feature_name: string;
        selection: string;
        section_name: string;
      };
    }
  | {
      name: 'demo_interaction';
      payload: {
        demo_name: 'file_explorer' | 'sharing' | 'storage';
        action: string;
        selection?: string;
        file_type?: string;
        result?: string;
      };
    }
  | {
      name: 'demo_complete';
      payload: {
        demo_name: 'file_explorer' | 'sharing' | 'storage';
        action: string;
        selection?: string;
        result?: string;
      };
    }
  | {
      name: 'demo_reset';
      payload: {
        demo_name: 'file_explorer' | 'sharing' | 'storage';
      };
    }
  | {
      name: 'docs_search';
      payload: {
        action: string;
        docs_section?: string;
      };
    }
  | {
      name: 'docs_search_result_click';
      payload: {
        action: string;
        target_section?: string;
      };
    }
  | {
      name: 'docs_search_no_results';
      payload: {
        action: string;
      };
    }
  | {
      name: 'docs_toc_click';
      payload: {
        heading_id: string;
        docs_section?: string;
      };
    }
  | {
      name: 'docs_code_copy';
      payload: {
        code_context: string;
      };
    }
  | {
      name: 'docs_read_milestone';
      payload: {
        milestone: '25%' | '50%' | '75%' | '100%';
        docs_section: string;
      };
    }
  | {
      name: 'docs_theme_change';
      payload: {
        selection: string;
      };
    }
  | {
      name: 'consent_update';
      payload: {
        selection: 'granted' | 'denied' | 'withdrawn';
      };
    };

export type ConsentStatus = 'granted' | 'denied';
