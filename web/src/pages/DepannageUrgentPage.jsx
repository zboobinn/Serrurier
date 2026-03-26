import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  Shield, Wrench, Zap, CheckCircle2, 
  ChevronDown, ChevronUp, Phone, ArrowLeft, HelpCircle, MapPin
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';

const EmergencyPage = () => {
  const { businessInfo } = useBusinessInfo();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: "En combien de temps pouvez-vous intervenir à Lyon ?",
      a: "Pour les urgences (porte bloquée, effraction), nous nous engageons à intervenir en moins de 30 à 45 minutes dans tous les arrondissements de Lyon et les communes limitrophes."
    },
    {
      q: "Allez-vous casser ma serrure pour ouvrir la porte ?",
      a: "Dans 90% des cas de porte simplement claquée (non verrouillée), nous utilisons des techniques d'ouverture fine (comme la radio) sans aucun dégât pour votre serrure."
    },
    {
      q: "Quels sont vos tarifs pour une urgence la nuit ou le week-end ?",
      a: "Nos tarifs sont clairs et vous sont annoncés par téléphone avant notre déplacement. Une majoration légale s'applique pour les interventions de nuit, le week-end et les jours fériés, mais nous restons parmi les plus compétitifs de Lyon."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dépannage Serrurier Urgent 24/7 à Lyon | Serrurerie Roland</title>
        <meta name="description" content="Intervention rapide et pas chère 24/7 à Lyon et alentours. Ouverture de porte, clé cassée, effraction. Devis transparent, serrurier de confiance." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-slate-950 pt-24">
        {/* HERO SECTION */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Image de fond avec calque sombre à 85% */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/depannage.webp)' }}>
            <div className="absolute inset-0 bg-slate-950/85"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <Link to="/#services" className="inline-flex items-center text-slate-400 hover:text-amber-500 transition-colors mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" /> Retour aux services
            </Link>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-6">
                Dépannage <span className="text-amber-500">Urgent 24/7</span> à Lyon
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Bénéficiez d’une intervention rapide et efficace à toute heure. Que ce soit pour une porte claquée ou une effraction, votre tranquillité est notre priorité.
              </p>
              <a href={`tel:${(businessInfo?.phone ?? '06 68 67 65 65').replace(/\s/g, '')}`} className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-slate-950 rounded-xl font-bold hover:bg-amber-400 transition-all">
                <Phone className="h-5 w-5" /> Urgence Dépannage
              </a>
            </div>
          </div>
        </section>

        {/* EXPERTISE & ENGAGEMENTS */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-100 mb-6">Spécialiste de l'Ouverture de Portes</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    Votre porte est bloquée ou vous avez été victime d’une effraction à Lyon ? Chez Serrurerie Roland, nous comprenons l’urgence et l’importance de résoudre rapidement vos problèmes de serrurerie.
                  </p>
                  <p>
                    Qu’il s’agisse d’une clé cassée ou d’une serrure endommagée, nous ne nous contentons pas simplement d’ouvrir vos portes : nous proposons des <strong>solutions complètes avec un souci de qualité et de transparence sur les prix.</strong>
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                  {[
                    { icon: Zap, text: "Rapidité d'intervention" },
                    { icon: Shield, text: "Tarifs Compétitifs" },
                    { icon: CheckCircle2, text: "Devis Transparent" },
                    { icon: MapPin, text: "Grand Lyon & Périphérie" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <item.icon className="h-5 w-5 text-amber-500" />
                      <span className="text-slate-200 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-[500px] bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden">
                  <img 
                    src="/DepannageUrgent2.webp" 
                    alt="Serrurier dépannage d'urgence à Lyon" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-500">[Photo Dépannage Urgence]</div>'; }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-amber-500 p-8 rounded-2xl hidden md:block shadow-xl">
                  <p className="text-slate-950 font-bold text-4xl">&lt; 30</p>
                  <p className="text-slate-950 font-medium">min en moyenne</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTIONS DÉTAILLÉES */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Nos Solutions d'Urgence</h2>
              <p className="text-slate-400">Ouverture fine, mise en sécurité et remplacement immédiat</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Ouverture Sans Casse</h3>
                <p className="text-slate-400 leading-relaxed">
                  Face à une porte claquée avec les clés à l'intérieur, nous utilisons des techniques professionnelles d'ouverture fine pour préserver votre serrure.
                </p>
              </div>

              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Mise en Sécurité</h3>
                <p className="text-slate-400 leading-relaxed">
                  Suite à un cambriolage, nous intervenons en urgence pour fermer provisoirement vos accès et sécuriser les lieux avant réparation définitive.
                </p>
              </div>

              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Wrench className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Extraction de Clé</h3>
                <p className="text-slate-400 leading-relaxed">
                  Vous avez cassé votre clé dans le barillet ? Ne forcez pas. Nos techniciens disposent des extracteurs spécifiques pour la retirer sans endommager le cylindre.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 bg-slate-900/30">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-12 justify-center">
              <HelpCircle className="h-8 w-8 text-amber-500" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Foire Aux Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-slate-800 rounded-2xl bg-slate-950 overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-900/50 transition-colors"
                  >
                    <span className="font-semibold text-slate-100 pr-4">{faq.q}</span>
                    {openFaq === index ? <ChevronUp className="h-5 w-5 text-amber-500 flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-slate-500 flex-shrink-0" />}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6 text-slate-400 animate-in slide-in-from-top-2 duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-amber-500 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-6">Une urgence ? N'attendez plus.</h2>
              <p className="text-slate-900 text-lg mb-8 max-w-2xl mx-auto">
                Ne compromettez pas votre sécurité. Contactez dès maintenant votre serrurier pour assurer une protection optimale.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href={`tel:${(businessInfo?.phone ?? '06 68 67 65 65').replace(/\s/g, '')}`} className="px-8 py-4 bg-slate-950 text-white rounded-xl font-bold hover:bg-slate-900 transition-all">
                  Appeler en Urgence
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default EmergencyPage;