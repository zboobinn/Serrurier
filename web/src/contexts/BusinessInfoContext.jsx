import React, { createContext, useContext, useState, useEffect } from 'react';
//import pb from '@/lib/pocketbaseClient';
import { supabase } from '@/lib/supabaseClient';

const BusinessInfoContext = createContext({
  businessInfo: null,
  loading: true,
  error: null
});

export const BusinessInfoProvider = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      const { data, error } = await supabase
        .from('business_info')
        .select('*')
        .single(); // On récupère la seule ligne de configuration

      if (data) setBusinessInfo(data);
    };

    fetchBusinessInfo();
  }, []);

  return (
    <BusinessInfoContext.Provider value={{ businessInfo, loading, error }}>
      {children}
    </BusinessInfoContext.Provider>
  );
};

export const useBusinessInfo = () => {
  const context = useContext(BusinessInfoContext);
  if (!context) {
    throw new Error('useBusinessInfo must be used within BusinessInfoProvider');
  }
  return context;
};