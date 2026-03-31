import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AlertTriangle, X } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SEOSchema from '@/components/SEOSchema.jsx';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';
import { supabase } from '@/lib/supabaseClient';
import { googleReviews } from '@/data/reviews';

import HeroSection from '@/components/home/AccueilSection.jsx';
import ServicesSection from '@/components/home/ServicesSection.jsx';
import InterventionZoneSection from '@/components/home/ZoneInterventionSection.jsx';
import AboutSection from '@/components/home/AProposSection.jsx';
import ContactSection from '@/components/home/ContactSection.jsx';
import AssurancesBanner from '@/components/home/AssurancesBanner';


const fallbackServices = [
  { id: 'fb1', icon: 'Clock', title: 'Dépannage Urgent 24/7', description: 'Intervention rapide à toute heure, jour et nuit, week-ends et jours fériés.' },
  { id: 'fb2', icon: 'DoorOpen', title: 'Portes de Garage', description: 'Installation, réparation et motorisation de portes de garage. Tous types de mécanismes.' },
  { id: 'fb3', icon: 'ShieldCheck', title: 'Portes Blindées', description: 'Pose et installation de portes blindées certifiées pour une sécurité maximale.' },
  { id: 'fb4', icon: 'Lock', title: 'Rideaux Métalliques', description: 'Installation et dépannage de rideaux métalliques pour commerces et locaux professionnels.' },
  { id: 'fb5', icon: 'LayoutTemplate', title: 'Vitrerie', description: 'Dépannage rapide suite à un bris de glace, remplacement de vitres, installation de double vitrage et mise en sécurité.' }
];

const fallbackHighlights = [
  { id: 'hl1', icon: 'CheckCircle2', title: 'Satisfaction Garantie', description: 'Travail soigné et garantie sur toutes nos interventions' },
  { id: 'hl2', icon: 'FileText', title: 'Devis Gratuit', description: 'Estimation transparente avant toute intervention' },
  { id: 'hl3', icon: 'Clock', title: 'Dépannage 24/7', description: 'Disponible à toute heure pour vos urgences' }
];

const HomePage = () => {
  const location = useLocation();
  const { businessInfo } = useBusinessInfo();
  const [bannerVisible, setBannerVisible] = useState(true);

  const [services, setServices] = useState(fallbackServices);
  const [highlights, setHighlights] = useState(fallbackHighlights);
  const [reviews, setReviews] = useState(googleReviews);

  useEffect(() => {
    const fetchDynamicData = async () => {
      try {
        const [servicesRes, highlightsRes, reviewsRes] = await Promise.all([
          supabase.from('services').select('*'),
          supabase.from('highlights').select('*'),
          supabase.from('reviews').select('*')
        ]);

        const servicesData = servicesRes.data || [];
        const highlightsData = highlightsRes.data || [];
        const reviewsData = reviewsRes.data || [];

        const visibleServices = servicesData.filter(s => s.visible !== false);
        const visibleHighlights = highlightsData.filter(h => h.visible !== false);
        const visibleReviews = reviewsData.filter(r => r.visible !== false);

        if (visibleServices.length > 0) setServices(visibleServices);
        if (visibleHighlights.length > 0) setHighlights(visibleHighlights);
        if (visibleReviews.length > 0) setReviews(visibleReviews);
      } catch (error) {
        console.error('Erreur data:', error);
      }
    };

    const trackVisit = async () => {
      try {
        await supabase.from('site_visits').insert([{ page: 'home' }]);
      } catch (error) {}
    };

    fetchDynamicData();
    trackVisit();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      }, 150);
    }
  }, [location.hash]);

  return (
    <>
      <Helmet>
        <title>Serrurerie Roland - Serrurier Lyon 24/7</title>
        <meta name="description" content="Intervention rapide 24h/24 et 7j/7 à Lyon et alentours. Serrurerie Roland : dépannage urgent, portes blindées et portes de garage. 25 ans d'expérience." />
        <style>{`
          @keyframes scrollRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
          .animate-marquee { animation: scrollRight 80s linear infinite; width: max-content; }
          .animate-marquee:hover { animation-play-state: paused; }
        `}</style>
      </Helmet>
      
      <SEOSchema />
      <Header />

      {businessInfo?.closure_message && bannerVisible && (
        <div className="fixed top-[76px] left-0 w-full bg-red-600/95 backdrop-blur-sm border-b border-red-500 px-4 py-3 z-50 shadow-lg animate-in slide-in-from-top-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-center">
            <div className="flex items-center justify-center gap-3 flex-1">
              <AlertTriangle className="h-5 w-5 text-white flex-shrink-0" />
              <p className="text-white font-medium text-sm md:text-base">{businessInfo.closure_message}</p>
            </div>
            <button onClick={() => setBannerVisible(false)} className="p-1.5 rounded-full text-white/80 hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <main>
        <HeroSection />
        <AssurancesBanner />
        <ServicesSection services={services} />
        <InterventionZoneSection />
        <AboutSection highlights={highlights} reviews={reviews} />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
};

export default HomePage;