import React from 'react';
import { Phone, ShieldCheck, Clock, Star } from 'lucide-react';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';

const HeroSection = () => {
  const { businessInfo } = useBusinessInfo();
  const phone = businessInfo?.phone ?? '06 68 67 65 65';
  const cleanPhone = phone.replace(/\s/g, '');

  return (
    <section id="accueil" className="relative min-h-[100dvh] flex items-center justify-center pt-20 pb-32 overflow-hidden">
      
      {/* Arrière-plan & Filtres sombres */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/FondAccueil.webp)' }}>
        {/* Dégradé subtil pour rendre le texte parfaitement lisible */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/80 to-slate-950"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col items-center text-center">
        
        {/* 1. Badge d'urgence "Live" */}
        <div 
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/60 border border-slate-700/50 backdrop-blur-md mb-8 shadow-lg"
          data-aos="fade-down"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <span className="text-sm md:text-base text-slate-200 font-medium tracking-wide">
            Dépannage d'urgence 24/7 sur le Grand Lyon
          </span>
        </div>

        {/* 2. Titre Principal (Couleur unie rétablie) */}
        <h1 
          className="text-5xl md:text-7xl font-extrabold text-slate-100 mb-6 tracking-tight leading-tight" 
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Votre <span className="text-amber-500">Serrurier Lyonnais</span><br/> de Confiance
        </h1>
        
        {/* 3. Sous-titre */}
        <p 
          className="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          Ouverture de porte sans casse, mise en sécurité immédiate et installation de portes blindées. 25 ans de savoir-faire.
        </p>

        {/* 4. Boutons d'action (CTAs) */}
        <div 
          className="flex flex-col sm:flex-row items-center gap-4 mb-14 w-full sm:w-auto"
          data-aos="fade-up" 
          data-aos-delay="300"
        >
          {/* Bouton d'appel principal */}
          <a 
            href={`tel:${cleanPhone}`} 
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 text-slate-950 rounded-xl text-lg font-bold hover:bg-amber-400 shadow-[0_0_30px_-5px_rgba(245,158,11,0.5)] transition-all hover:scale-105 w-full sm:w-auto overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"></div>
            
            <Phone className="h-6 w-6" />
            <span>Appeler le {phone}</span>
          </a>

          {/* Bouton secondaire */}
          <a 
            href="#services" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800/60 text-slate-100 border border-slate-600 rounded-xl text-lg font-semibold hover:bg-slate-700 hover:border-slate-500 backdrop-blur-sm transition-all w-full sm:w-auto"
          >
            Voir nos prestations
          </a>
        </div>

        {/* 5. Barre de Réassurance (Trust Bar) */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 max-w-3xl mx-auto w-full"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="flex items-center justify-center gap-3 text-slate-300 bg-slate-900/40 p-3 rounded-lg border border-slate-800/50 backdrop-blur-sm">
            <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <span className="font-medium text-sm md:text-base">Intervention en 30 min</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-slate-300 bg-slate-900/40 p-3 rounded-lg border border-slate-800/50 backdrop-blur-sm">
            <ShieldCheck className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <span className="font-medium text-sm md:text-base">Agréé Assurances</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-slate-300 bg-slate-900/40 p-3 rounded-lg border border-slate-800/50 backdrop-blur-sm">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500 flex-shrink-0" />
            <span className="font-medium text-sm md:text-base">Devis 100% Gratuit</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;