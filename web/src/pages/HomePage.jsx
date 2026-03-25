import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import LoadingSpinner from '@/components/LoadingSpinner.jsx';
import SuccessMessage from '@/components/SuccessMessage.jsx';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';
import pb from '@/lib/pocketbaseClient';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { googleReviews } from '@/data/reviews';
import { getRelativeTime } from '@/utils/dateUtils';

const { X, Phone, Mail, Star, AlertTriangle } = LucideIcons;

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Valeurs de secours si la base de données est vide
const fallbackServices = [
  { icon: 'Clock', title: 'Dépannage Urgent 24/7', description: 'Intervention rapide à toute heure, jour et nuit, week-ends et jours fériés.' },
  { icon: 'DoorOpen', title: 'Portes de Garage', description: 'Installation, réparation et motorisation de portes de garage. Tous types de mécanismes.' },
  { icon: 'ShieldCheck', title: 'Portes Blindées', description: 'Pose et installation de portes blindées certifiées pour une sécurité maximale.' },
  { icon: 'Lock', title: 'Rideaux Métalliques', description: 'Installation et dépannage de rideaux métalliques pour commerces et locaux.' },
  { icon: 'Lightbulb', title: 'Conseil en Sécurité', description: 'Audit de sécurité et recommandations personnalisées.' }
];

const fallbackHighlights = [
  { icon: 'CheckCircle2', title: 'Satisfaction Garantie', description: 'Travail soigné et garantie sur toutes nos interventions' },
  { icon: 'FileText', title: 'Devis Gratuit', description: 'Estimation transparente avant toute intervention' },
  { icon: 'Clock', title: 'Dépannage 24/7', description: 'Disponible à toute heure pour vos urgences' }
];

const HomePage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { businessInfo } = useBusinessInfo();
  const [bannerVisible, setBannerVisible] = useState(true);

  // States pour les données dynamiques de PocketBase
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

        // On ne garde que ceux qui sont visibles
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess(false);
    try {
      await pb.collection('contact_messages').create(formData, { $autoCancel: false });
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) { setError('Erreur d\'envoi.'); } 
    finally { setLoading(false); }
  };

  const position = [45.7640, 4.8357];
  const interventionRadius = (businessInfo?.intervention_radius || 20) * 1000;
  const filteredReviews = reviews.filter(review => review.rating >= 4);
  const scrollingReviews = [...filteredReviews, ...filteredReviews];

  return (
    <>
      <Helmet>
        <title>Serrurerie Roland - Serrurier Lyon 24/7</title>
        <style>{`
          @keyframes scrollRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
          .animate-marquee { animation: scrollRight 80s linear infinite; width: max-content; }
          .animate-marquee:hover { animation-play-state: paused; }
        `}</style>
      </Helmet>

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
        {/* ACCUEIL */}
        <section id="accueil" className="relative min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/fond-homepage.jpg)' }}>
            <div className="absolute inset-0 bg-slate-950/80"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6" style={{ letterSpacing: '-0.02em' }}>
              Votre Serrurier Lyonnais de Confiance
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Intervention rapide 24h/24 et 7j/7. 25 ans d'expérience.
            </p>
            <a href={`tel:${(businessInfo?.phone ?? '06 68 67 65 65').replace(/\s/g, '')}`} className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-slate-950 rounded-xl text-lg font-semibold hover:bg-amber-400 shadow-lg">
              <Phone className="h-6 w-6" /><span>Appelez le {businessInfo?.phone ?? '06 68 67 65 65'}</span>
            </a>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-100 mb-4">Nos Services</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Une gamme complète de services de serrurerie pour particuliers et professionnels
              </p>
            </div>

            {/* Les 2 premières cartes (Design horizontal) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {services.slice(0, 2).map((service, index) => {
                const IconComp = LucideIcons[service.icon] || LucideIcons.Wrench;
                return (
                  <Card key={index} className="bg-slate-900/50 border-slate-800 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                    <CardContent className="p-8 flex-1">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-amber-500/10 rounded-xl flex-shrink-0">
                          <IconComp className="h-8 w-8 text-amber-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-slate-100 mb-3 break-words">{service.title}</h3>
                          <p className="text-slate-400 leading-relaxed break-words">{service.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Le reste des cartes (Design vertical) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.slice(2).map((service, index) => {
                const IconComp = LucideIcons[service.icon] || LucideIcons.Wrench;
                return (
                  <Card key={index} className="bg-slate-900/50 border-slate-800 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                    <CardContent className="p-8 flex-1 flex flex-col">
                      <div className="p-3 bg-amber-500/10 rounded-xl w-fit mb-4">
                        <IconComp className="h-8 w-8 text-amber-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-100 mb-3 break-words">{service.title}</h3>
                      <p className="text-slate-400 leading-relaxed break-words flex-1">{service.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS & A PROPOS */}
        <section id="apropos" className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-100 mb-6">25 Ans d'Expérience</h2>
              <div className="max-w-3xl mx-auto space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Depuis plus de 25 ans, Serrurerie Roland est votre partenaire de confiance pour tous vos besoins en serrurerie à Lyon et dans ses alentours. Notre expertise couvre l'installation, la réparation et le dépannage d'urgence de tous types de serrures et systèmes de sécurité.
                </p>
                <p>
                  Nous intervenons rapidement, 24h/24 et 7j/7, pour résoudre vos problèmes de serrurerie : porte claquée, clé cassée, changement de serrure, installation de porte blindée, et bien plus encore. Notre équipe de professionnels qualifiés met son savoir-faire à votre service pour garantir votre sécurité et votre tranquillité d'esprit.
                </p>
                <p>
                  Que vous soyez un particulier ou un professionnel, nous vous proposons des solutions adaptées à vos besoins et à votre budget. Devis gratuit et transparent, intervention rapide, travail soigné : tels sont nos engagements.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {highlights.map((highlight, index) => {
                const IconComp = LucideIcons[highlight.icon] || LucideIcons.CheckCircle2;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex p-4 bg-amber-500/10 rounded-2xl mb-4">
                      <IconComp className="h-12 w-12 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-100 mb-2">{highlight.title}</h3>
                    <p className="text-slate-400">{highlight.description}</p>
                  </div>
                );
              })}
            </div>

            {/* AVIS */}
            <div className="border-t border-slate-800 pt-16">
              <div className="text-center mb-12"><h2 className="text-3xl font-semibold text-slate-100">Ce que disent nos clients</h2></div>
              <div className="relative w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                <div className="flex gap-6 animate-marquee py-4">
                  {scrollingReviews.map((review, index) => (
                    <Card key={`${review.id}-${index}`} className="w-[500px] shrink-0 bg-slate-950 border-slate-800">
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="flex gap-1 text-amber-500 mb-5">{[...Array(review.rating)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
                        <p className="text-slate-300 italic mb-5">"{review.text}"</p>
                        <div className="flex justify-between mt-auto">
                          <span className="font-semibold text-slate-100">{review.author}</span>
                          <span className="text-slate-500">{getRelativeTime(review.date)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAP */}
        <section id="zone-intervention" className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12"><h2 className="text-3xl font-semibold text-slate-100">Zone d'Intervention</h2></div>
            <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 h-[500px]">
              <MapContainer center={position} zoom={11} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Circle center={position} radius={interventionRadius} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.2 }} />
                <Marker position={position}><Popup>Serrurerie Roland</Popup></Marker>
              </MapContainer>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 bg-slate-900">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12"><h2 className="text-3xl font-semibold text-slate-100">Contactez-nous</h2></div>
            <Card className="bg-slate-950 border-slate-800">
              <CardContent className="p-8">
                {success ? <SuccessMessage message="Message envoyé avec succès." /> : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input placeholder="Nom" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="bg-slate-800 border-slate-700 text-slate-100" />
                    <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="bg-slate-800 border-slate-700 text-slate-100" />
                    <Textarea placeholder="Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required rows={5} className="bg-slate-800 border-slate-700 text-slate-100" />
                    {error && <p className="text-red-500">{error}</p>}
                    <Button type="submit" disabled={loading} className="w-full bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all active:scale-95">{loading ? 'Envoi...' : 'Envoyer le message'}</Button>
                  </form>
                )}
              </CardContent>
            </Card>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-6 bg-slate-950 rounded-xl border border-slate-800">
                <Phone className="h-8 w-8 text-amber-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-400 mb-1">Téléphone</p>
                  <a href={`tel:${(businessInfo?.phone ?? '06 68 67 65 65').replace(/\s/g, '')}`} className="text-lg font-semibold text-slate-100 hover:text-amber-500 transition-colors duration-200">
                    {businessInfo?.phone ?? '06 68 67 65 65'}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-slate-950 rounded-xl border border-slate-800">
                <Mail className="h-8 w-8 text-amber-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-400 mb-1">Email</p>
                  <a href={`mailto:${businessInfo?.email ?? 'serrurerieroland@orange.fr'}`} className="text-lg font-semibold text-slate-100 hover:text-amber-500 transition-colors duration-200">
                    {businessInfo?.email ?? 'serrurerieroland@orange.fr'}
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;