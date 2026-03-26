import React from 'react';
import { Phone } from 'lucide-react';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';
import pb from '@/lib/pocketbaseClient';

const FloatingCallButton = () => {
  const { businessInfo } = useBusinessInfo();

  // Fonction pour enregistrer le clic dans tes statistiques
  const handlePhoneClick = async () => {
    try { 
      await pb.collection('phone_clicks').create({ timestamp: new Date().toISOString() }, { $autoCancel: false }); 
    } catch (error) {}
  };

  const phoneNumber = businessInfo?.phone ?? '06 68 67 65 65';
  const cleanPhone = phoneNumber.replace(/\s/g, '');

  return (
    // md:hidden cache le bouton sur ordinateur/tablette, z-[9999] le garde au-dessus de tout
    <div className="md:hidden fixed bottom-6 right-6 z-[9999]">
      <a
        href={`tel:${cleanPhone}`}
        onClick={handlePhoneClick}
        className="relative flex items-center justify-center w-14 h-14 bg-amber-500 text-slate-950 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-transform active:scale-95"
        aria-label="Appeler le serrurier"
      >
        {/* L'effet d'onde (ping) en arrière-plan pour attirer l'attention */}
        <span className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-10"></span>
        
        {/* L'icône de téléphone */}
        <Phone className="h-6 w-6 relative z-10" />
      </a>
    </div>
  );
};

export default FloatingCallButton;