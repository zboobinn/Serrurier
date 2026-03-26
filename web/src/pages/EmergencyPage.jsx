import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Phone, ArrowLeft, Clock, Unlock, Banknote, ShieldCheck, MapPin, HelpCircle, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';

const EmergencyPage = () => {
  const { businessInfo } = useBusinessInfo();

  // Remonter en haut de la page au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Dépannage Serrurier Urgent 24/7 à Lyon | Serrurerie Roland</title>
        <meta name="description" content="Intervention rapide et pas chère 24/7 à Lyon et alentours. Ouverture de porte, clé cassée, effraction. Devis transparent, serrurier de confiance." />
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
              Dépannage Urgent 24/7 : <span className="text-amber-500">Votre tranquillité est notre priorité</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Bénéficiez d’une intervention rapide et efficace à toute heure avec nos serruriers experts. Que ce soit pour une porte claquée ou un remplacement de serrure suite à une effraction, nous sommes à votre service jour et nuit, le dimanche et même les jours fériés.
            </p>
          </div>

          {/* EMPLACEMENT POUR TA PREMIÈRE GRANDE PHOTO */}
          <div className="w-full h-64 md:h-96 bg-slate-800 rounded-3xl mb-16 border border-slate-700 flex items-center justify-center overflow-hidden">
             <p className="text-slate-500 font-medium">[ Emplacement pour une photo d'intervention d'urgence / camionnette ]</p>
          </div>

          {/* SECTION 1 : EXPERTISE ET ZONE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-slate-100 mb-6">Spécialiste de l'Ouverture de Portes à Lyon</h2>
              <div className="space-y-4 text-slate-300 leading-relaxed mb-6">
                <p>
                  Votre porte est bloquée ou vous avez été victime d’une effraction à Lyon ? Chez Serrurerie Roland, nous comprenons l’urgence et l’importance de résoudre rapidement vos problèmes de serrurerie. Nous intervenons avec rapidité et efficacité pour vous offrir un accès sécurisé à vos espaces.
                </p>
                <p>
                  Qu’il s’agisse d’une clé cassée, d’une serrure endommagée ou d’une porte blindée récalcitrante, notre équipe d’experts est prête à répondre à vos besoins 24/7. Nous ne nous contentons pas simplement d’ouvrir vos portes : nous proposons également des solutions complètes avec un souci de qualité et de sécurité optimale.
                </p>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-300"><strong className="text-slate-100">Intervention Rapide :</strong> Tous les arrondissements de Lyon et les communes environnantes (Vénissieux, Villeurbanne, Tassin...).</p>
                </li>
              </ul>
            </div>
            
            {/* EMPLACEMENT POUR UNE SECONDE PHOTO */}
            <div className="h-full min-h-[400px] bg-slate-800 rounded-3xl border border-slate-700 flex items-center justify-center overflow-hidden">
               <p className="text-slate-500 font-medium text-center px-4">[ Emplacement photo : Serrure cassée ou serrurier au travail ]</p>
            </div>
          </div>

          {/* SECTION 2 : SERRURIER PAS CHER (CARTES) */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-slate-100 mb-4 text-center">Serrurier Pas Cher à Lyon</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto text-center mb-10">La sécurité de votre domicile ne devrait pas être un luxe, mais un droit accessible à tous.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                <Banknote className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-100 mb-3">Tarifs Compétitifs</h3>
                <p className="text-slate-400">
                  Nous nous engageons à fournir des services de haute qualité à des prix transparents et abordables, sans compromis sur la qualité.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                <Unlock className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-100 mb-3">Toutes Ouvertures</h3>
                <p className="text-slate-400">
                  Portes claquées, serrures bloquées, clés perdues ou cassées à l'intérieur du cylindre. Nous avons le matériel adapté à chaque situation.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                <ShieldCheck className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-100 mb-3">Mise en Sécurité</h3>
                <p className="text-slate-400">
                  Suite à un cambriolage ou une effraction, nous intervenons en urgence pour fermer provisoirement ou remplacer définitivement vos fermetures.
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
              {/* FAQ à remplir */}
            </div>
          </div>

          {/* BANNIÈRE DE CONTACT */}
          <div className="bg-red-600 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Effet visuel urgence */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-red-500 rounded-full blur-3xl opacity-50"></div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">Besoin d'une intervention immédiate ?</h3>
            <p className="text-red-100 mb-8 max-w-2xl mx-auto font-medium relative z-10">
              Ne compromettez pas votre sécurité. Contactez dès maintenant votre serrurier pour assurer une protection optimale sans alourdir vos dépenses.
            </p>
            <a href={`tel:${(businessInfo?.phone ?? '06 68 67 65 65').replace(/\s/g, '')}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-600 rounded-xl font-bold hover:bg-gray-100 transition-all active:scale-[0.98] shadow-xl relative z-10">
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

export default EmergencyPage;