import React, { createContext, useContext, useState, useEffect } from 'react';
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
      try {
        const { data: records, error } = await supabase.from('business_info').select('*');
        if (records && records.length > 0) {
          setBusinessInfo(records[0]);
        } else {
          setBusinessInfo({
            address: '62 rue Racine\n69100 Villeurbanne',
            phone: '06 68 67 65 65',
            email: 'serrurerieroland@orange.fr',
            closure_message: ''
          });
        }
      } catch (err) {
        console.error('Failed to fetch business info:', err);
        setError(err);
        setBusinessInfo({
          address: '62 rue Racine\n69100 Villeurbanne',
          phone: '06 68 67 65 65',
          email: 'serrurerieroland@orange.fr',
          closure_message: ''
        });
      } finally {
        setLoading(false);
      }
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