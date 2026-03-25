import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Phone, ArrowLeft, ShieldCheck, Wrench, Settings, HelpCircle, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';

const GarageDoorsPage = () => {
  const { businessInfo } = useBusinessInfo();

  // Remonter en haut de la page au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Portes de Garage sur-mesure à Lyon | Serrurerie Roland</title>
        <meta name="description" content="Serrurerie Roland est votre expert en portes de garage à Lyon. Installation, réparation, motorisation et sur-mesure. Sécurité, esthétique et durabilité." />
      </Helmet>
      
      <Header />

      <main className="min-h-screen bg-slate-950 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-amber-500 transition-colors mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" /> Retour à l'accueil
          </Link>

          {/* EN-TÊTE DE LA PAGE */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-6 leading-tight">
              Portes de Garage sur-mesure à Lyon : <span className="text-amber-500">Sécurité, Esthétique et Fonctionnalité</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              À Lyon, Serrurerie Roland est votre expert en portes de garage, offrant une gamme complète de services, de la conception sur-mesure à l’installation. Que vous cherchiez une porte sectionnelle, coulissante ou basculante, nous avons la solution adaptée à vos besoins.
            </p>
          </div>

          {/* EMPLACEMENT POUR TA PREMIÈRE GRANDE PHOTO */}
          <div className="w-full h-64 md:h-96 bg-slate-800 rounded-3xl mb-16 border border-slate-700 flex items-center justify-center overflow-hidden">
             {/* Pour mettre ta photo plus tard, remplace le <p> ci-dessous par :
                <img src="/ta-photo-garage.jpg" alt="Porte de garage à Lyon" className="w-full h-full object-cover" />
             */}
             <p className="text-slate-500 font-medium">[ Emplacement pour une belle photo de porte de garage ]</p>
          </div>

          {/* SECTION 1 : POURQUOI NOUS CHOISIR */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-slate-100 mb-6">Portes de Garage à Lyon : Sécurité, Design et Service Complet</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Serrurerie Roland, avec plus de 25 ans d’expérience à Lyon, est synonyme d’excellence en matière de portes de garage. Notre réputation repose sur la fusion parfaite entre sécurité robuste et design élégant. Chaque espace est unique, et nous l’avons bien compris. C’est pourquoi notre gamme variée de portes de garage répond à tous les besoins, qu’ils soient esthétiques, fonctionnels ou les deux.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-300"><strong className="text-slate-100">Choix Variés :</strong> Portes sectionnelles, électriques coulissantes ou avec système de motorisation. Idéal pour les espaces restreints ou les besoins sur-mesure.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-300"><strong className="text-slate-100">Matériaux de Premier Choix :</strong> Nos portes sont fabriquées en acier, aluminium ou PVC pour une durabilité et une protection optimales.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-300"><strong className="text-slate-100">Service Complet :</strong> De la consultation initiale à l’installation avec une garantie décennale pour votre tranquillité d'esprit.</p>
                </li>
              </ul>
            </div>
            
            {/* EMPLACEMENT POUR UNE SECONDE PHOTO */}
            <div className="h-full min-h-[400px] bg-slate-800 rounded-3xl border border-slate-700 flex items-center justify-center overflow-hidden">
               <p className="text-slate-500 font-medium text-center px-4">[ Emplacement photo : Détail d'une motorisation ou porte en action ]</p>
            </div>
          </div>

          {/* SECTION 2 : NOS EXPERTISES (CARTES) */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-slate-100 mb-10 text-center">Pourquoi choisir Serrurerie Roland ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                <ShieldCheck className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-100 mb-3">Installation Experte</h3>
                <p className="text-slate-400">
                  Une défense robuste contre les intrusions, une isolation efficace contre le bruit, tout en maximisant l'espace intérieur. Nous garantissons une utilisation fluide à long terme.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                <Settings className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-100 mb-3">Restauration & Modernisation</h3>
                <p className="text-slate-400">
                  Votre porte montre des signes d’usure ? Ne laissez pas cela compromettre votre sécurité. Nos artisans peuvent la restaurer ou motoriser votre installation actuelle.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                <Wrench className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-100 mb-3">Assistance & Dépannage</h3>
                <p className="text-slate-400">
                  Un mécanisme bloqué, une chaîne qui déraille ? Lorsque votre porte refuse de fonctionner, notre équipe est là pour un dépannage rapide afin de ne pas perturber votre quotidien.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION FAQ */}
          <div className="max-w-3xl mx-auto mb-20 bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6">
              <HelpCircle className="h-8 w-8 text-amber-500" />
              <h2 className="text-2xl font-bold text-slate-100">Questions Fréquentes</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-slate-100 mb-2">Proposez-vous des devis gratuits pour l'installation ?</h4>
                <p className="text-slate-400">Oui, nous nous déplaçons pour évaluer votre espace et vous fournir un devis transparent et sans engagement pour votre projet de porte de garage.</p>
              </div>
              <div className="w-full h-px bg-slate-800"></div>
              <div>
                <h4 className="text-lg font-semibold text-slate-100 mb-2">Faites-vous uniquement de l'installation de portes neuves ?</h4>
                <p className="text-slate-400">Non, nous assurons également la réparation, le remplacement de pièces défectueuses et la motorisation de portes de garage manuelles existantes.</p>
              </div>
            </div>
          </div>

          {/* BANNIÈRE DE CONTACT */}
          <div className="bg-amber-500 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4">Un projet de porte de garage en tête ?</h3>
            <p className="text-slate-900 mb-8 max-w-2xl mx-auto font-medium">
              En choisissant Serrurerie Roland, vous optez pour une entreprise qui allie tradition et innovation. Contactez-nous dès aujourd’hui pour découvrir comment nous pouvons transformer votre espace.
            </p>
            <a href={`tel:${(businessInfo?.phone ?? '06 68 67 65 65').replace(/\s/g, '')}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-950 text-amber-500 rounded-xl font-bold hover:bg-slate-900 transition-all active:scale-[0.98] shadow-xl">
              <Phone className="h-5 w-5" />
              <span>Appelez le {businessInfo?.phone ?? '06 68 67 65 65'}</span>
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default GarageDoorsPage;