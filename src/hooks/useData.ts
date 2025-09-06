import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useBorrowers = () => {
  const [borrowers, setBorrowers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBorrowers();
  }, []);

  const fetchBorrowers = async () => {
    try {
      const { data, error } = await supabase
        .from('borrowers')
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching borrowers:', error);
      } else {
        setBorrowers(data || []);
      }
    } catch (error) {
      console.error('Error fetching borrowers:', error);
    } finally {
      setLoading(false);
    }
  };

  return { borrowers, loading, refetch: fetchBorrowers };
};

export const useLenders = () => {
  const [lenders, setLenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLenders();
  }, []);

  const fetchLenders = async () => {
    try {
      const { data, error } = await supabase
        .from('lenders')
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .order('total_lent', { ascending: false });

      if (error) {
        console.error('Error fetching lenders:', error);
      } else {
        setLenders(data || []);
      }
    } catch (error) {
      console.error('Error fetching lenders:', error);
    } finally {
      setLoading(false);
    }
  };

  return { lenders, loading, refetch: fetchLenders };
};