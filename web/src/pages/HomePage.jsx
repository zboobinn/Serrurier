import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AlertTriangle, X } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SEOSchema from '@/components/SEOSchema.jsx';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';
import pb from '@/lib/pocketbaseClient';
import { googleReviews } from '@/data/reviews';

// Import de nos nouveaux composants de page d'accueil
import HeroSection from '@/components/home/HeroSection.jsx';
import ServicesSection from '@/components/home/ServicesSection.jsx';
import InterventionZoneSection from '@/components/home/InterventionZoneSection.jsx';
import AboutSection from '@/components/home/AboutSection.jsx';
import ContactSection from '@/components/home/ContactSection.jsx';

// 🟢 J'ai mis à jour tes 5 services par défaut
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

  // État des données
  const [services, setServices] = useState(fallbackServices);
  const [highlights, setHighlights] = useState(fallbackHighlights);
  const [reviews, setReviews] = useState(googleReviews);

  useEffect(() => {
    const fetchDynamicData = async () => {
      try {
        const [servicesData, highlightsData, reviewsData] = await Promise.all([
          pb.collection('services').getFullList({ sort: 'created', $autoCancel: false }),
          pb.collection('highlights').getFullList({ sort: 'created', $autoCancel: false }),
          pb.collection('reviews').getFullList({ sort: '-date', $autoCancel: false })
        ]);

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
        await pb.collection('site_visits').create({ timestamp: new Date().toISOString(), page: 'home' }, { $autoCancel: false });
      } catch (error) {}
    };

    fetchDynamicData();
    trackVisit();
  }, []);

  // Gestion du scroll lors d'un accès par lien d'ancrage
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

      {/* Bannière d'alerte (si configurée dans le panel admin) */}
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
        {/* L'orchestration propre de tes 5 composants */}
        <HeroSection />
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