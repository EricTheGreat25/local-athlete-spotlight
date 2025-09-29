import { useEffect, useState } from 'react';
import { supabase } from '@/utilities/supabase';
import { Sport } from '@/types/sports';

export function useSports() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSports() {
      try {
        const { data, error } = await supabase
          .from('sports')
          .select('sport_id, sport_name')
          .order('sport_name');

        if (error) throw error;
        setSports(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchSports();
  }, []);

  return { sports, loading, error };
}