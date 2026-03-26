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

const ArmoredDoorsPage = () => {
  const { businessInfo } = useBusinessInfo();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: "Combien de temps faut-il pour installer une porte blindée ?",
      a: "En général, l'installation d'une porte blindée sur-mesure prend une demi-journée à une journée complète. Nos techniciens veillent à laisser les lieux parfaitement propres après leur intervention."
    },
    {
      q: "Vos portes blindées sont-elles certifiées A2P ?",
      a: "Absolument. Nous travaillons uniquement avec des portes et des serrures certifiées A2P (Assurance Prévention Protection), reconnues par les compagnies d'assurance pour leur haute résistance aux effractions."
    },
    {
      q: "Est-il possible de blinder une porte existante au lieu de la changer ?",
      a: "Oui, c'est ce qu'on appelle un blindage de porte. Nous pouvons conserver votre porte en bois d'origine (pour respecter le règlement de copropriété par exemple) tout en la renforçant avec des plaques d'acier et une serrure haute sécurité."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Portes Blindées à Lyon | Serrurerie Roland</title>
        <meta name="description" content="Serrurerie Roland propose à Lyon des solutions de portes blindées haut de gamme. Alliant esthétique, robustesse et isolation optimale." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-slate-950 pt-24">
        {/* HERO SECTION */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Image de fond avec calque sombre à 85% */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/fond-homepage.webp)' }}>
            <div className="absolute inset-0 bg-slate-950/85"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <Link to="/#services" className="inline-flex items-center text-slate-400 hover:text-amber-500 transition-colors mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" /> Retour aux services
            </Link>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-6">
                Portes <span className="text-amber-500">Blindées</span> sur Mesure
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Depuis plus de deux décennies, Serrurerie Roland propose à Lyon des solutions de portes blindées haut de gamme alliant esthétique et protection absolue.
              </p>
              <a href={`tel:${(businessInfo?.phone ?? '06 68 67 65 65').replace(/\s/g, '')}`} className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-slate-950 rounded-xl font-bold hover:bg-amber-400 transition-all">
                <Phone className="h-5 w-5" /> Obtenir un devis
              </a>
            </div>
          </div>
        </section>

        {/* EXPERTISE & ENGAGEMENTS */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-100 mb-6">Votre Expert en Sécurité à Lyon</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    Notre expertise englobe tout, de la conception initiale à la maintenance durable, assurant une sécurité optimale pour chaque espace.
                  </p>
                  <p>
                    Que vous soyez un particulier désireux de renforcer la sécurité de votre résidence ou un professionnel en quête de solutions solides, nos installations combinent <strong>esthétique, isolation et protection sans compromis</strong>.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                  {[
                    { icon: Shield, text: "Sécurité Inégalée" },
                    { icon: Zap, text: "Intervention Rapide" },
                    { icon: CheckCircle2, text: "Certification A2P" },
                    { icon: Settings, text: "Solutions sur-mesure" }
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
                    src="/porte-blindee.webp" 
                    alt="Installation d'une porte blindée à Lyon" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-500">[Photo Porte Blindée]</div>'; }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-amber-500 p-8 rounded-2xl hidden md:block shadow-xl">
                  <p className="text-slate-950 font-bold text-4xl">25+</p>
                  <p className="text-slate-950 font-medium">ans d'expérience</p>
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
              <p className="text-slate-400">Installation, blindage et dépannage de serrures haute sécurité</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Blocs-Portes</h3>
                <p className="text-slate-400 leading-relaxed">
                  Remplacement total de votre ancienne porte par un bloc-porte blindé certifié pour une résistance maximale aux tentatives d'effraction.
                </p>
              </div>

              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Settings className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Blindage sur Existant</h3>
                <p className="text-slate-400 leading-relaxed">
                  Conservez l'esthétique extérieure de votre porte en bois actuelle tout en la renforçant avec des plaques d'acier et des charnières renforcées.
                </p>
              </div>

              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Wrench className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Dépannage & Serrures</h3>
                <p className="text-slate-400 leading-relaxed">
                  Installation de serrures multipoints (3 à 7 points) certifiées A2P pour transformer votre fermeture en un véritable rempart.
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-6">Besoin de sécuriser votre domicile ?</h2>
              <p className="text-slate-900 text-lg mb-8 max-w-2xl mx-auto">
                Nos experts se déplacent gratuitement pour étudier votre projet et vous proposer la meilleure solution de protection.
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

export default ArmoredDoorsPage;