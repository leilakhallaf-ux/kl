export interface Database {
    public: {
          Tables: {
                  e_cards: {
                            Row: ECard;
                            Insert: Omit<ECard, 'id' | 'created_at' | 'updated_at' | 'views' | 'likes' | 'score_avg' | 'score_count'>;
                            Update: Partial<Omit<ECard, 'id' | 'created_at'>>;
                  };
                  user_likes: {
                    Row: UserLike;
                    Insert: Omit<UserLike, 'id' | 'created_at'>;
                    Update: never;
                  };
                  user_ratings: {
                    Row: UserRating;
                    Insert: Omit<UserRating, 'id' | 'created_at'>;
                    Update: { score: number };
                  };
          };
    };
}

export interface ECard {
    id: string;
    thumbnail_url: string | null;
    advertiser_name: string;
    advertiser_logo_url: string;
    business_sector: string | null;
    vintage: number;
    language: string;
    card_type: string;
    version: string | null;
    topic: string | null;
    technology: string | null;
    distributor: string | null;
    tags: string[];
    url: string | null;
    fallback_url: string | null;
    swf_url: string | null;
      video_url: string | null;
    is_hosted: boolean;
    file_path: string | null;
    campaign_aim: string | null;
    target_audience: string | null;
    key_message: string | null;
    tone: string | null;
    submitted_by: string;
    submitted_capacity: string;
    agency: string | null;
    credits: Record<string, unknown>;
    description: string | null;
    views: number;
    likes: number;
    score_avg: number;
    score_count: number;
    admin_score: number | null;
    created_at: string;
    updated_at: string;
    is_published: boolean;
    is_featured: boolean;
}

export interface UserLike {
    id: string;
    user_id: string | null;
    ecard_id: string;
    ip_address: string | null;
    browser_id: string | null;
    created_at: string;
}

export interface UserRating {
    id: string;
    user_id: string | null;
    ecard_id: string;
    score: number;
    ip_address: string | null;
    browser_id: string | null;
    created_at: string;
}
