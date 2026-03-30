import React from 'react';
import { Phone } from 'lucide-react';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';

const HeroSection = () => {
  const { businessInfo } = useBusinessInfo();

  return (
    <section id="accueil" className="relative min-h-[100dvh] flex items-center justify-center py-32">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/FondAccueil.webp)' }}>
        <div className="absolute inset-0 bg-slate-950/80"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <h1 
          className="text-5xl md:text-7xl font-bold text-slate-100 mb-6" 
          style={{ letterSpacing: '-0.02em' }}
          data-aos="fade-down"
        >
          Votre Serrurier Lyonnais de Confiance
        </h1>
        <p 
          className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto"
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          Intervention rapide 24h/24 et 7j/7. 25 ans d'expérience.
        </p>
        <div data-aos="zoom-in" data-aos-delay="400">
          <a href={`tel:${(businessInfo?.phone ?? '06 68 67 65 65').replace(/\s/g, '')}`} className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-slate-950 rounded-xl text-lg font-semibold hover:bg-amber-400 shadow-lg transition-transform hover:scale-105">
            <Phone className="h-6 w-6" /><span>Appelez le {businessInfo?.phone ?? '06 68 67 65 65'}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;