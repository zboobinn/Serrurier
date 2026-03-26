import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Phone, ArrowLeft, Shield, Wrench, Award, Maximize, HeartHandshake, HelpCircle, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';

const ArmoredDoorsPage = () => {
  const { businessInfo } = useBusinessInfo();

  // Remonter en haut de la page au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Portes Blindées à Lyon | Serrurerie Roland</title>
        <meta name="description" content="Serrurerie Roland propose à Lyon des solutions de portes blindées haut de gamme. Alliant esthétique, robustesse et isolation optimale." />
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
              Portes Blindées à Lyon : <span className="text-amber-500">Expertise et Sécurité</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Depuis plus de deux décennies, Serrurerie Roland propose à Lyon des solutions de portes blindées haut de gamme. Alliant esthétique, robustesse et isolation optimale, nos portes sont conçues pour offrir une sécurité sans compromis. Que vous soyez un particulier ou un professionnel, découvrez comment nous pouvons transformer et sécuriser votre espace.
            </p>
          </div>

          {/* EMPLACEMENT POUR TA PREMIÈRE GRANDE PHOTO */}
          <div className="w-full h-64 md:h-96 bg-slate-800 rounded-3xl mb-16 border border-slate-700 flex items-center justify-center overflow-hidden">
             <p className="text-slate-500 font-medium">[ Emplacement pour une belle photo de porte blindée ]</p>
          </div>

          {/* SECTION 1 : VOTRE EXPERT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-slate-100 mb-6">Serrurerie Roland : Votre Expert en Portes Blindées</h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Depuis plus de deux décennies, Serrurerie Roland s’est imposée comme la référence incontournable à Lyon pour les portes blindées et les blocs portes. Notre expertise englobe tout, de la conception initiale à la maintenance durable, assurant une sécurité optimale pour chaque espace.
                </p>
                <p>
                  Notre engagement ne se limite pas à la simple fourniture de produits. Nous nous efforçons de comprendre et d’anticiper les besoins spécifiques de chaque client. Que vous soyez un particulier désireux de renforcer la sécurité de votre résidence ou un professionnel en quête de solutions solides, nous sommes votre allié de confiance.
                </p>
                <p>
                  Nos solutions combinent esthétique et fonctionnalité, garantissant une protection sans compromis. Avec Serrurerie Roland, vous bénéficiez d’une tranquillité d’esprit, sachant que votre espace est sécurisé par les meilleurs à Lyon. Chaque projet est traité avec le plus grand soin, assurant une installation précise et durable.
                </p>
              </div>
            </div>
            
            {/* EMPLACEMENT POUR UNE SECONDE PHOTO */}
            <div className="h-full min-h-[400px] bg-slate-800 rounded-3xl border border-slate-700 flex items-center justify-center overflow-hidden">
               <p className="text-slate-500 font-medium text-center px-4">[ Emplacement photo : Détail d'une serrure haute sécurité ]</p>
            </div>
          </div>

          {/* SECTION 2 : POURQUOI NOUS CHOISIR (CARTES) */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-slate-100 mb-10 text-center">Pourquoi choisir Serrurerie Roland pour votre Porte Blindée ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                <Shield className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-100 mb-3">Sécurité Inégalée</h3>
                <p className="text-slate-400">
                  Nos portes blindées à Lyon offrent une protection sans faille contre les intrusions, alliant technologie avancée et matériaux robustes.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                <Wrench className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-100 mb-3">Service Global</h3>
                <p className="text-slate-400">
                  De la consultation initiale à l’installation, nous proposons une gamme complète de services, incluant le blindage et la motorisation pour une défense renforcée.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                <Award className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-100 mb-3">Expertise Éprouvée</h3>
                <p className="text-slate-400">
                  Avec plus de 25 ans sur le marché lyonnais, notre savoir-faire en matière de portes blindées est incontesté, garantissant des installations de qualité supérieure.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                <Maximize className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-100 mb-3">Adaptabilité</h3>
                <p className="text-slate-400">
                  Reconnaissant que chaque domicile ou entreprise a ses spécificités, nous offrons des solutions sur mesure, avec une variété de designs et de finitions.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl lg:col-span-2">
                <HeartHandshake className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-100 mb-3">Engagement Total</h3>
                <p className="text-slate-400">
                  La satisfaction client est au cœur de notre mission. C’est pourquoi nous offrons des conseils experts, une garantie longue durée et un devis transparent pour tous nos services de portes blindées à Lyon.
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
              <p className="text-slate-400">
                Explorez notre section FAQ pour trouver des réponses rapides et précises à vos questions fréquentes concernant nos services de serrurerie à Lyon et dans le Grand Lyon. Que vous ayez besoin de conseils sur le dépannage d’urgence, l’ouverture de portes, ou la sécurité de votre domicile, notre FAQ est là pour vous éclairer.
              </p>
              {/* Tu pourras ajouter tes questions/réponses spécifiques ici plus tard */}
            </div>
          </div>

          {/* BANNIÈRE DE CONTACT */}
          <div className="bg-amber-500 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4">Besoin de sécuriser votre domicile ?</h3>
            <p className="text-slate-900 mb-8 max-w-2xl mx-auto font-medium">
              Notre réputation à Lyon repose sur la confiance et la satisfaction de nos clients. Contactez-nous pour un devis gratuit et transparent.
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

export default ArmoredDoorsPage;