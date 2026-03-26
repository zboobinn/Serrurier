import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  Shield, Wrench, Zap, CheckCircle2, 
  ChevronDown, ChevronUp, Phone, ArrowLeft, HelpCircle, LayoutTemplate
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';

const VitreriePage = () => {
  const { businessInfo } = useBusinessInfo();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: "Intervenez-vous d'urgence pour une vitrine cassée la nuit ?",
      a: "Oui, nous intervenons 24h/24 et 7j/7. En cas de bris de glace, nous procédons d'abord à une mise en sécurité provisoire (fermeture provisoire en bois) pour sécuriser les lieux, avant de commander et poser le vitrage définitif."
    },
    {
      q: "Vos devis sont-ils acceptés par les assurances ?",
      a: "Absolument. Nos devis sont clairs, détaillés et respectent les barèmes des compagnies d'assurance. Ils sont conçus pour faciliter votre prise en charge suite à un sinistre ou un acte de vandalisme."
    },
    {
      q: "Quels types de vitrages pouvez-vous installer ?",
      a: "Nous installons tous types de verres : simple vitrage, double vitrage isolant, verre feuilleté (anti-effraction), verre trempé (sécurit) et vitrages décoratifs ou imprimés."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Vitrerie & Bris de Glace à Lyon | Serrurerie Roland</title>
        <meta name="description" content="Dépannage vitrerie d'urgence à Lyon. Remplacement de vitres cassées, installation de double vitrage et mise en sécurité suite à un bris de glace. Agréé assurances." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-slate-950">
        {/* HERO SECTION */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Image de fond avec calque sombre à 85% */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/Vitrerie1.webp)' }}>
            <div className="absolute inset-0 bg-slate-950/85"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <Link to="/#services" className="inline-flex items-center text-slate-400 hover:text-amber-500 transition-colors mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" /> Retour aux services
            </Link>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-6">
                Vitrerie & <span className="text-amber-500">Remplacement</span> de Vitrage
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Intervention rapide à Lyon pour tout bris de glace, mise en sécurité suite à une effraction, et installation de vitrages sur-mesure (simple, double, feuilleté).
              </p>
              <a href={`tel:${(businessInfo?.phone ?? '06 68 67 65 65').replace(/\s/g, '')}`} className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-slate-950 rounded-xl font-bold hover:bg-amber-400 transition-all">
                <Phone className="h-5 w-5" /> Urgence Vitrerie 24/7
              </a>
            </div>
          </div>
        </section>

        {/* EXPERTISE & ENGAGEMENTS */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-100 mb-6">Votre Artisan Vitrier à Lyon</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    Une vitre cassée représente une faille de sécurité majeure et une perte d'isolation thermique pour votre domicile ou votre commerce. Nous intervenons dans les plus brefs délais pour résoudre ce problème.
                  </p>
                  <p>
                    Nous vous accompagnons de la <strong>mise en sécurité d'urgence</strong> jusqu'au <strong>remplacement définitif</strong> de votre vitrage, avec des solutions adaptées à votre budget et conformes aux exigences de votre assurance.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                  {[
                    { icon: Zap, text: "Mise en sécurité 24/7" },
                    { icon: Shield, text: "Verre Anti-Effraction" },
                    { icon: LayoutTemplate, text: "Double Vitrage" },
                    { icon: CheckCircle2, text: "Agréé Assurances" }
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
                    src="/Vitrerie2.webp" 
                    alt="Artisan vitrier remplaçant une vitre à Lyon" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-500">[Photo Vitrerie]</div>'; }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-amber-500 p-8 rounded-2xl hidden md:block shadow-xl">
                  <p className="text-slate-950 font-bold text-4xl">24/7</p>
                  <p className="text-slate-950 font-medium">Intervention express</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTIONS DÉTAILLÉES */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Nos Prestations en Vitrerie</h2>
              <p className="text-slate-400">Remplacement, isolation et sécurité des ouvertures</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Dépannage Bris de Glace</h3>
                <p className="text-slate-400 leading-relaxed">
                  Intervention rapide suite à une effraction ou un accident. Nettoyage des débris de verre et pose d'une fermeture provisoire si le verre doit être commandé.
                </p>
              </div>

              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <LayoutTemplate className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Double & Triple Vitrage</h3>
                <p className="text-slate-400 leading-relaxed">
                  Améliorez l'isolation thermique et phonique de vos menuiseries existantes en remplaçant vos anciens carreaux par des vitrages performants.
                </p>
              </div>

              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Verre de Sécurité</h3>
                <p className="text-slate-400 leading-relaxed">
                  Installation de verre feuilleté ou trempé pour les devantures de magasins, les portes d'entrée vitrées ou les garde-corps, empêchant les effractions rapides.
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-6">Une vitre cassée ?</h2>
              <p className="text-slate-900 text-lg mb-8 max-w-2xl mx-auto">
                Ne restez pas dans l'insécurité. Contactez-nous immédiatement pour une mise en sécurité et un devis de remplacement.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href={`tel:${(businessInfo?.phone ?? '06 68 67 65 65').replace(/\s/g, '')}`} className="px-8 py-4 bg-slate-950 text-white rounded-xl font-bold hover:bg-slate-900 transition-all">
                  Appeler en Urgence
                </a>
                <Link to="/#contact" className="px-8 py-4 bg-transparent border-2 border-slate-950 text-slate-950 rounded-xl font-bold hover:bg-slate-950 hover:text-white transition-all">
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default VitreriePage;