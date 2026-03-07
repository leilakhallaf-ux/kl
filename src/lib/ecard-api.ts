import { supabase } from './supabase';
import type { ECard } from './database.types';

const getClientIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return 'unknown';
  }
};

export const getECards = async (filters?: {
  advertiser?: string;
  vintage?: number;
  agency?: string;
  distributor?: string;
  technology?: string;
  topic?: string;
  is_featured?: boolean;
  limit?: number;
  offset?: number;
  orderBy?: 'created_at' | 'likes' | 'score_avg' | 'views';
  orderDirection?: 'asc' | 'desc';
}) => {
  let query = supabase
    .from('e_cards')
    .select('*')
    .eq('is_published', true);

  if (filters?.advertiser) {
    query = query.ilike('advertiser_name', `%${filters.advertiser}%`);
  }
  if (filters?.vintage) {
    query = query.eq('vintage', filters.vintage);
  }
  if (filters?.agency) {
    query = query.ilike('agency', `%${filters.agency}%`);
  }
  if (filters?.distributor) {
    query = query.ilike('distributor', `%${filters.distributor}%`);
  }
  if (filters?.technology) {
    query = query.ilike('technology', `%${filters.technology}%`);
  }
  if (filters?.topic) {
    query = query.ilike('topic', `%${filters.topic}%`);
  }
  if (filters?.is_featured !== undefined) {
    query = query.eq('is_featured', filters.is_featured);
  }

  const orderBy = filters?.orderBy || 'created_at';
  const orderDirection = filters?.orderDirection || 'desc';
  query = query.order(orderBy, { ascending: orderDirection === 'asc' });

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }
  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as ECard[];
};

export const getECardById = async (id: string) => {
  const { data, error } = await supabase
    .from('e_cards')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .maybeSingle();

  if (error) throw error;
  return data as ECard | null;
};

export const incrementViews = async (ecardId: string) => {
  const { error } = await supabase.rpc('increment_ecard_views', {
    ecard_uuid: ecardId,
  });

  if (error) console.error('Error incrementing views:', error);
};

export const likeECard = async (ecardId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  const ip = await getClientIP();

  const { error } = await supabase
    .from('user_likes')
    .insert({
      ecard_id: ecardId,
      user_id: user?.id || null,
      ip_address: !user ? ip : null,
    });

  if (error) throw error;
};

export const unlikeECard = async (ecardId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  const ip = await getClientIP();

  let query = supabase.from('user_likes').delete().eq('ecard_id', ecardId);

  if (user) {
    query = query.eq('user_id', user.id);
  } else {
    query = query.eq('ip_address', ip);
  }

  const { error } = await query;
  if (error) throw error;
};

export const hasLiked = async (ecardId: string): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  const ip = await getClientIP();

  let query = supabase
    .from('user_likes')
    .select('id')
    .eq('ecard_id', ecardId);

  if (user) {
    query = query.eq('user_id', user.id);
  } else {
    query = query.eq('ip_address', ip);
  }

  const { data } = await query.maybeSingle();
  return !!data;
};

export const rateECard = async (ecardId: string, score: number) => {
  const { data: { user } } = await supabase.auth.getUser();
  const ip = await getClientIP();

  const { error } = await supabase
    .from('user_ratings')
    .upsert({
      ecard_id: ecardId,
      user_id: user?.id || null,
      ip_address: !user ? ip : null,
      score,
    });

  if (error) throw error;
};

export const getUserRating = async (ecardId: string): Promise<number | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  const ip = await getClientIP();

  let query = supabase
    .from('user_ratings')
    .select('score')
    .eq('ecard_id', ecardId);

  if (user) {
    query = query.eq('user_id', user.id);
  } else {
    query = query.eq('ip_address', ip);
  }

  const { data } = await query.maybeSingle();
  return data?.score || null;
};

export const searchECards = async (searchTerm: string) => {
  const { data, error } = await supabase
    .from('e_cards')
    .select('*')
    .eq('is_published', true)
    .or(`advertiser_name.ilike.%${searchTerm}%,agency.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,topic.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as ECard[];
};

export const getECardsByTag = async (tag: string) => {
  const { data, error } = await supabase
    .from('e_cards')
    .select('*')
    .eq('is_published', true)
    .contains('tags', [tag])
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as ECard[];
};

export const getAllTags = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('e_cards')
    .select('tags')
    .eq('is_published', true);

  if (error) throw error;

  const allTags = new Set<string>();
  data.forEach((ecard) => {
    ecard.tags?.forEach((tag) => allTags.add(tag));
  });

  return Array.from(allTags).sort();
};

export const getVintages = async (): Promise<number[]> => {
  const { data, error } = await supabase
    .from('e_cards')
    .select('vintage')
    .eq('is_published', true)
    .order('vintage', { ascending: false });

  if (error) throw error;

  const vintages = new Set<number>();
  data.forEach((ecard) => vintages.add(ecard.vintage));

  return Array.from(vintages);
};

export const getFilterOptions = async () => {
  const { data, error } = await supabase
    .from('e_cards')
    .select('advertiser_name, agency, distributor, technology, topic, business_sector')
    .eq('is_published', true);

  if (error) throw error;

  const advertisers = new Set<string>();
  const agencies = new Set<string>();
  const distributors = new Set<string>();
  const technologies = new Set<string>();
  const topics = new Set<string>();
  const sectors = new Set<string>();

  data.forEach((ecard) => {
    if (ecard.advertiser_name) advertisers.add(ecard.advertiser_name);
    if (ecard.agency) agencies.add(ecard.agency);
    if (ecard.distributor) distributors.add(ecard.distributor);
    if (ecard.technology) technologies.add(ecard.technology);
    if (ecard.topic) topics.add(ecard.topic);
    if (ecard.business_sector) sectors.add(ecard.business_sector);
  });

  return {
    advertisers: Array.from(advertisers).sort(),
    agencies: Array.from(agencies).sort(),
    distributors: Array.from(distributors).sort(),
    technologies: Array.from(technologies).sort(),
    topics: Array.from(topics).sort(),
    sectors: Array.from(sectors).sort(),
  };
};

export const createECard = async (ecard: Omit<ECard, 'id' | 'created_at' | 'updated_at' | 'views' | 'likes' | 'score_avg' | 'score_count'>) => {
  const { data, error } = await supabase
    .from('e_cards')
    .insert(ecard)
    .select()
    .single();

  if (error) throw error;
  return data as ECard;
};

export const updateECard = async (id: string, updates: Partial<ECard>) => {
  const { data, error } = await supabase
    .from('e_cards')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as ECard;
};

export const deleteECard = async (id: string) => {
  const { error } = await supabase
    .from('e_cards')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const getAllECardsAdmin = async () => {
  const { data, error } = await supabase
    .from('e_cards')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as ECard[];
};
