// lib/userHelpers.ts
import { supabase } from './supabase';

export const fetchUsername = async (userId: string): Promise<string | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', userId)
    .single();

  if (error || !data) return null;
  return data.username;
};

export const setUsername = async (userId: string, username: string): Promise<boolean> => {
  const { error } = await supabase
    .from('profiles')
    .upsert({ id: userId, username });

  return !error;
};
