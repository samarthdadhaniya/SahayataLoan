import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url?: string;
  role: string;
}

export interface LenderProfile {
  id: string;
  user_id: string;
  total_lent: number;
  repayments_received: number;
  impact_score: number;
  auto_invest: boolean;
  preferred_categories: string[];
  preferred_regions: string[];
}

export interface BorrowerProfile {
  id: string;
  user_id: string;
  business_name: string;
  business_type: string;
  business_description: string | null;
  aadhaar_number: string | null;
  pan_number: string | null;
  loan_amount: number;
  loan_purpose: string | null;
  loan_status: string;
  region: string | null;
  phone: string | null;
  address: string | null;
  image_url?: string | null;
  video_url?: string | null;
  trust_score: number;
  ngo_verified: boolean;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data as Profile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, refetch: fetchProfile };
}

export const useLenderProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<LenderProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchLenderProfile();
    }
  }, [user]);

  const fetchLenderProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('lenders')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching lender profile:', error);
      } else {
        setProfile(data as LenderProfile);
      }
    } catch (error) {
      console.error('Error fetching lender profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const createLenderProfile = async (profileData: Partial<LenderProfile>) => {
    if (!user) return { error: 'No user found' };

    try {
      const { data, error } = await supabase
        .from('lenders')
        .insert([
          {
            user_id: user.id,
            ...profileData
          }
        ])
        .select()
        .single();

      if (error) {
        return { error };
      }

      setProfile(data as LenderProfile);
      return { data };
    } catch (error) {
      return { error };
    }
  };

  const updateLenderProfile = async (profileData: Partial<LenderProfile>) => {
    if (!user || !profile) return { error: 'No user or profile found' };

    try {
      const { data, error } = await supabase
        .from('lenders')
        .update(profileData)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        return { error };
      }

      setProfile(data as LenderProfile);
      return { data };
    } catch (error) {
      return { error };
    }
  };

  return { profile, loading, createLenderProfile, updateLenderProfile, refetch: fetchLenderProfile };
};

export const useBorrowerProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<BorrowerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBorrowerProfile();
    }
  }, [user]);

  const fetchBorrowerProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('borrowers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching borrower profile:', error);
      } else {
        setProfile(data as BorrowerProfile);
      }
    } catch (error) {
      console.error('Error fetching borrower profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const createBorrowerProfile = async (profileData: Partial<BorrowerProfile>) => {
    if (!user) return { error: 'No user found' };

    try {
      const { data, error } = await supabase
        .from('borrowers')
        .insert({
          user_id: user.id,
          business_name: profileData.business_name!,
          business_type: profileData.business_type!,
          loan_amount: profileData.loan_amount!,
          ...profileData
        } as any)
        .select()
        .single();

      if (error) {
        return { error };
      }

      setProfile(data as BorrowerProfile);
      return { data };
    } catch (error) {
      return { error };
    }
  };

  const updateBorrowerProfile = async (profileData: Partial<BorrowerProfile>) => {
    if (!user || !profile) return { error: 'No user or profile found' };

    try {
      const { data, error } = await supabase
        .from('borrowers')
        .update(profileData)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        return { error };
      }

      setProfile(data as BorrowerProfile);
      return { data };
    } catch (error) {
      return { error };
    }
  };

  return { profile, loading, createBorrowerProfile, updateBorrowerProfile, refetch: fetchBorrowerProfile };
};