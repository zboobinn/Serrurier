// src/pages/ServicePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as LucideIcons from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import LoadingSpinner from '@/components/LoadingSpinner.jsx';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';
import pb from '@/lib/pocketbaseClient';

const ServicePage = () => {
  const { id } = useParams(); // On récupère l'ID dans l'URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const { businessInfo } = useBusinessInfo();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const record = await pb.collection('services').getOne(id);
        setService(record);
      } catch (error) {
        console.error("Erreur lors de la récupération du service:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
    // On remonte tout en haut de la page au chargement
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  
  if (!service) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl text-slate-100 font-bold mb-4">Service introuvable</h1>
      <Link to="/" className="text-amber-500 hover:underline">Retour à l'accueil</Link>
    </div>
  );

  const IconComp = LucideIcons[service.icon] || LucideIcons.Wrench;
  const { Phone, ArrowLeft } = LucideIcons;

  return (
    <>
      <Helmet>
        <title>{service.title} - Serrurerie Roland</title>
      </Helmet>
      
      <Header />

      <main className="min-h-screen bg-slate-950 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-amber-500 transition-colors mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" /> Retour à l'accueil
          </Link>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="flex items-center gap-6 mb-8 border-b border-slate-800 pb-8">
              <div className="p-4 bg-amber-500/10 rounded-2xl flex-shrink-0">
                <IconComp className="h-12 w-12 text-amber-500" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-100">{service.title}</h1>
            </div>

            <div className="prose prose-invert prose-amber max-w-none mb-12">
              {/* Si tu ajoutes un champ 'content' de type Editor dans PocketBase, il s'affichera ici, sinon on utilise la description */}
              {service.content ? (
                <div dangerouslySetInnerHTML={{ __html: service.content }} className="text-slate-300 leading-relaxed text-lg" />
              ) : (
                <p className="text-slate-300 leading-relaxed text-lg">{service.description}</p>
              )}
            </div>

            <div className="bg-slate-950 rounded-xl p-8 text-center border border-slate-800">
              <h3 className="text-xl font-semibold text-slate-100 mb-4">Besoin de ce service ?</h3>
              <p className="text-slate-400 mb-6">Contactez-nous pour une intervention rapide ou un devis gratuit.</p>
              <a href={`tel:${(businessInfo?.phone ?? '06 68 67 65 65').replace(/\s/g, '')}`} className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-amber-500 text-slate-950 rounded-xl font-semibold hover:bg-amber-400 transition-all active:scale-[0.98]">
                <Phone className="h-5 w-5" />
                <span>Appelez le {businessInfo?.phone ?? '06 68 67 65 65'}</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ServicePage;