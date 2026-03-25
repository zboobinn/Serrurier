import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { X, Clock, Shield, FileText, Phone, Mail, CheckCircle2, Wrench, DoorOpen, Lock, ShieldCheck, Lightbulb, Star, AlertTriangle } from 'lucide-react';
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

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const HomePage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { businessInfo } = useBusinessInfo();
  console.log("Infos reçues :", businessInfo);
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await pb.collection('site_visits').create({ 
          timestamp: new Date().toISOString(),
          page: 'home'
        }, { $autoCancel: false });
      } catch (error) {
        console.error('Failed to track visit:', error);
      }
    };

    trackVisit();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await pb.collection('contact_messages').create(formData, { $autoCancel: false });
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      icon: Clock,
      title: 'Dépannage Urgent 24/7',
      description: 'Intervention rapide à toute heure, jour et nuit, week-ends et jours fériés. Nous sommes toujours disponibles pour vos urgences.'
    },
    {
      icon: DoorOpen,
      title: 'Portes de Garage',
      description: 'Installation, réparation et motorisation de portes de garage. Tous types de mécanismes et marques.'
    },
    {
      icon: ShieldCheck,
      title: 'Portes Blindées',
      description: 'Pose et installation de portes blindées certifiées pour une sécurité maximale de votre domicile.'
    },
    {
      icon: Lock,
      title: 'Rideaux Métalliques',
      description: 'Installation et dépannage de rideaux métalliques pour commerces et locaux professionnels.'
    },
    {
      icon: Lightbulb,
      title: 'Conseil en Sécurité',
      description: 'Audit de sécurité et recommandations personnalisées pour protéger efficacement votre propriété.'
    }
  ];

  const highlights = [
    {
      icon: CheckCircle2,
      title: 'Satisfaction Garantie',
      description: 'Travail soigné et garantie sur toutes nos interventions'
    },
    {
      icon: FileText,
      title: 'Devis Gratuit',
      description: 'Estimation transparente avant toute intervention'
    },
    {
      icon: Clock,
      title: 'Dépannage 24/7',
      description: 'Disponible à toute heure pour vos urgences'
    }
  ];

  const position = [45.7640, 4.8357]; // Lyon center coordinates
  const interventionRadius = (businessInfo?.intervention_radius || 20) * 1000;

  // 🟢 On filtre les avis (>= 4 étoiles) puis on les duplique pour créer la boucle infinie
  const filteredReviews = googleReviews.filter(review => review.rating >= 4);
  const scrollingReviews = [...filteredReviews, ...filteredReviews];

  return (
    <>
      <Helmet>
        <title>Serrurerie Roland - Serrurier Lyon 24/7 | Dépannage Urgent</title>
        <meta name="description" content="Serrurier professionnel à Lyon et Villeurbanne. Dépannage urgent 24h/24, portes blindées, rideaux métalliques. 25 ans d'expérience. Devis gratuit." />
        {/* 🟢 Ajout du CSS pour l'animation de défilement vers la droite */}
        <style>{`
          @keyframes scrollRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee {
            animation: scrollRight 80s linear infinite;
            width: max-content;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </Helmet>

      <Header />

      {/* 🟢 BANNIÈRE DE FERMETURE : Fixée en haut sous le menu */}
      {businessInfo?.closure_message && bannerVisible && (
        <div className="fixed top-[76px] left-0 w-full bg-red-600/95 backdrop-blur-sm border-b border-red-500 px-4 py-3 z-50 shadow-lg animate-in slide-in-from-top-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-center">
            
            <div className="flex items-center justify-center gap-3 flex-1">
              <AlertTriangle className="h-5 w-5 text-white flex-shrink-0" />
              <p className="text-white font-medium text-sm md:text-base">
                {businessInfo.closure_message}
              </p>
            </div>
            
            <button 
              onClick={() => setBannerVisible(false)} 
              className="p-1.5 rounded-full text-white/80 hover:bg-white/20 hover:text-white transition-colors"
              title="Fermer cette alerte"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <main>
        <section id="accueil" className="relative min-h-screen flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1683115098516-9b8d5c643b5b)' }}
          >
            <div className="absolute inset-0 bg-slate-950/80"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-6" style={{ letterSpacing: '-0.02em' }}>
              Votre Serrurier Lyonnais de Confiance
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Intervention rapide 24h/24 et 7j/7 à Lyon et ses alentours. 25 ans d'expérience à votre service.
            </p>
            <a
              href={`tel:${(businessInfo?.phone ?? '06 68 67 65 65').replace(/\s/g, '')}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-slate-950 rounded-xl text-lg font-semibold hover:bg-amber-400 transition-all duration-200 active:scale-[0.98] shadow-lg"
            >
              <Phone className="h-6 w-6" />
              <span>Appelez le {businessInfo?.phone ?? '06 68 67 65 65'}</span>
            </a>
          </div>
        </section>

        <section id="services" className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-100 mb-4">Nos Services</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Une gamme complète de services de serrurerie pour particuliers et professionnels
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {services.slice(0, 2).map((service, index) => (
                <Card key={index} className="bg-slate-900/50 border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-amber-500/10 rounded-xl">
                        <service.icon className="h-8 w-8 text-amber-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-100 mb-3">{service.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.slice(2).map((service, index) => (
                <Card key={index} className="bg-slate-900/50 border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="p-3 bg-amber-500/10 rounded-xl w-fit mb-4">
                      <service.icon className="h-8 w-8 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-100 mb-3">{service.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

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
              {highlights.map((highlight, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex p-4 bg-amber-500/10 rounded-2xl mb-4">
                    <highlight.icon className="h-12 w-12 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">{highlight.title}</h3>
                  <p className="text-slate-400">{highlight.description}</p>
                </div>
              ))}
            </div>

            {/* --- SECTION AVIS CLIENTS DÉFILANTS --- */}
            <div className="border-t border-slate-800 pt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-semibold text-slate-100 mb-4">Ce que disent nos clients</h2>
                <p className="text-lg text-slate-400">Avis authentiques laissés sur Google et PagesJaunes</p>
              </div>

              {/* Le conteneur du carrousel avec le masque de fondu transparent sur les bords */}
              <div 
                className="relative w-full overflow-hidden" 
                style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
              >
                <div className="flex gap-6 animate-marquee py-4">
                  {scrollingReviews.map((review, index) => (
                    <Card key={`${review.id}-${index}`} className="w-[500px] shrink-0 bg-slate-950 border-slate-800 hover:border-slate-700 transition-colors flex flex-col">
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="flex gap-1 text-amber-500 mb-5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-current" />
                          ))}
                        </div>
                        <p className="text-slate-300 italic mb-5 leading-relaxed flex-1">
                          "{review.text}"
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="font-semibold text-slate-100">{review.author}</span>
                          <span className="text-sm text-slate-500">{getRelativeTime(review.date)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="zone-intervention" className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-100 mb-4">Zone d'Intervention</h2>
              <p className="text-lg text-slate-400">Lyon et ses alentours</p>
            </div>

            <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              <div style={{ height: '500px' }}>
                <MapContainer center={position} zoom={11} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  <Circle 
                    center={position} 
                    radius={interventionRadius}
                    pathOptions={{ 
                      color: '#f59e0b',
                      fillColor: '#f59e0b',
                      fillOpacity: 0.2,
                      weight: 2
                    }}
                  />

                  <Marker position={position}>
                    <Popup>
                      <div className="text-center">
                        <p className="font-semibold">Serrurerie Roland</p>
                        <p className="text-sm">{(businessInfo?.address ?? '62 rue Racine\n69100 Villeurbanne').split('\n')[0]}</p>
                        <p className="text-sm">{(businessInfo?.address ?? '62 rue Racine\n69100 Villeurbanne').split('\n')[1] ?? ''}</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-slate-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-100 mb-4">Contactez-nous</h2>
              <p className="text-lg text-slate-400">
                Une question ? Un devis ? N'hésitez pas à nous contacter
              </p>
            </div>

            <Card className="bg-slate-950 border-slate-800">
              <CardContent className="p-8">
                {success ? (
                  <SuccessMessage message="Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais." />
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-200">Nom</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-200">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-200">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                        placeholder="Décrivez votre besoin..."
                      />
                    </div>

                    {error && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-sm text-red-500">{error}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all duration-200 active:scale-[0.98]"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <LoadingSpinner size="sm" />
                          <span>Envoi en cours...</span>
                        </div>
                      ) : (
                        'Envoyer le message'
                      )}
                    </Button>
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