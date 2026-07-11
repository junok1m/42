export type ApiProviderImage = {
    image: string;
    file_type?: string;
    profile?: boolean;
    priority?: number;
    real?: boolean;
  };
  
  export type ApiProvider = {
    id: number;
    slug: string;
    provider_name: string;
    description: string;
  
    country?: string | null;
  
    cup?: string;
    height?: number;
    weight?: number;
  
    images?: ApiProviderImage[];
  
    is_new?: boolean;
  
    service_bbbj?: boolean;
    service_cim?: boolean;
    service_dfk?: boolean;
    service_69?: boolean;
    service_rimming?: boolean;
    service_filming?: boolean;
    service_cbj?: boolean;
    service_massage?: boolean;
    service_gfe?: boolean;
    service_pse?: boolean;
    service_double?: boolean;
    service_shower?: boolean;
  
    total_30?: number;
    total_45?: number;
    total_60?: number;
  };
  
  export type ApiRosterEntry = {
    provider_id: number;
    provider_name: string;
    start_time: string;
    end_time: string;
  };
  
  export type ApiNewsItem = {
    id: number;
    title?: string;
    publish_date?: string;
    is_public?: boolean;
  };