import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  Shield, Wrench, Zap, Settings, CheckCircle2, 
  ChevronDown, ChevronUp, Phone, ArrowLeft, HelpCircle 
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';

const MenuiserieFermeturePage = () => {
  const { businessInfo } = useBusinessInfo();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: "Quels matériaux proposez-vous pour les menuiseries ?",
      a: "Nous proposons une gamme complète incluant l'Aluminium pour le design, le PVC pour l'isolation et le budget, le Bois pour l'authenticité, et l'Acier pour une sécurité maximale."
    },
    {
      q: "Est-ce que l'installation de nouvelles fenêtres améliore la sécurité ?",
      a: "Oui, absolument. Toutes nos nouvelles menuiseries peuvent être équipées de vitrages anti-effraction, de poignées sécurisées et de systèmes de fermeture multipoints retardateurs d'effraction."
    },
    {
      q: "Intervenez-vous pour la réparation de fermetures existantes ?",
      a: "Bien sûr. Nos serruriers-menuisiers interviennent pour réparer des gonds arrachés, remplacer des serrures sur des portes métalliques, ou réajuster des baies vitrées coulissantes qui bloquent."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Menuiserie Extérieure & Métallerie à Lyon | Serrurerie Roland</title>
        <meta name="description" content="Serrurerie Roland installe, répare et sécurise vos menuiseries à Lyon : Alu, PVC, Bois, Acier. Devis gratuit pour vos fenêtres et fermetures." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-slate-950">
        {/* HERO SECTION */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Image de fond avec calque sombre à 85% */}
          {/* N'oublie pas d'ajouter une image 'Menuiserie1.webp' dans ton dossier public */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/Menuiserie1.webp)', backgroundColor: '#0f172a' }}>
            <div className="absolute inset-0 bg-slate-950/85"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <Link to="/#services" className="inline-flex items-center text-slate-400 hover:text-amber-500 transition-colors mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" /> Retour aux services
            </Link>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-6">
                Menuiserie & <span className="text-amber-500">Fermetures</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Alu, PVC, Bois ou Acier : nous installons et sécurisons toutes vos menuiseries extérieures à Lyon. L'alliance parfaite entre isolation, design et protection.
              </p>
              <a href={`tel:${(businessInfo?.phone ?? '06 68 67 65 65').replace(/\s/g, '')}`} className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-slate-950 rounded-xl font-bold hover:bg-amber-400 transition-all">
                <Phone className="h-5 w-5" /> Demander un devis
              </a>
            </div>
          </div>
        </section>

        {/* EXPERTISE & ENGAGEMENTS */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-100 mb-6">L'expertise d'un artisan pour vos fermetures</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    Une bonne serrure ne suffit pas si la porte ou la fenêtre qui la soutient est fragile. C'est pourquoi nous maîtrisons l'installation de tous types de menuiseries.
                  </p>
                  <p>
                    De la création d'une structure en <strong>acier sur-mesure</strong> au remplacement de vos <strong>fenêtres en PVC</strong> pour une meilleure isolation, nos menuisiers vous garantissent une pose dans les règles de l'art.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                  {[
                    { icon: CheckCircle2, text: "Bois, Alu, PVC, Acier" },
                    { icon: Shield, text: "Haute Sécurité" },
                    { icon: Settings, text: "Sur-Mesure" },
                    { icon: Zap, text: "Isolation Thermique" }
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
                    src="/Menuiserie2.webp" 
                    alt="Installation de menuiserie à Lyon par Serrurerie Roland" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-500">[Photo Menuiserie]</div>'; }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-amber-500 p-8 rounded-2xl hidden md:block shadow-xl">
                  <p className="text-slate-950 font-bold text-4xl">100%</p>
                  <p className="text-slate-950 font-medium">Sur-mesure</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTIONS DÉTAILLÉES */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Nos Solutions Complètes</h2>
              <p className="text-slate-400">Pour l'habitat des particuliers et les locaux professionnels</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Métallerie & Acier</h3>
                <p className="text-slate-400 leading-relaxed">
                  Conception et pose de grilles de défense, portes de cave renforcées, et structures métalliques nécessitant une résistance maximale face aux effractions.
                </p>
              </div>

              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Settings className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Fenêtres & Baies</h3>
                <p className="text-slate-400 leading-relaxed">
                  Remplacement de fenêtres en Alu ou PVC. Nous optimisons l'isolation thermique de votre logement tout en modernisant l'esthétique de votre façade.
                </p>
              </div>

              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Wrench className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Entretien & Réparation</h3>
                <p className="text-slate-400 leading-relaxed">
                  Volet roulant bloqué, menuiserie qui frotte ou vitre brisée ? Nous intervenons rapidement pour réparer et sécuriser vos ouvertures endommagées.
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-6">Un projet de menuiserie en tête ?</h2>
              <p className="text-slate-900 text-lg mb-8 max-w-2xl mx-auto">
                L'artisanat de qualité au service de votre maison. Demandez un conseil personnalisé et un devis gratuit pour vos nouvelles fermetures.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href={`tel:${(businessInfo?.phone ?? '06 68 67 65 65').replace(/\s/g, '')}`} className="px-8 py-4 bg-slate-950 text-white rounded-xl font-bold hover:bg-slate-900 transition-all">
                  Nous appeler
                </a>
                <Link to="/#contact" className="px-8 py-4 bg-transparent border-2 border-slate-950 text-slate-950 rounded-xl font-bold hover:bg-slate-950 hover:text-white transition-all">
                  Demander un devis par écrit
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

export default MenuiserieFermeturePage;