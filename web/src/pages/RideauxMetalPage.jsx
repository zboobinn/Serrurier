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

const MetalShuttersPage = () => {
  const { businessInfo } = useBusinessInfo();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: "Quel est le délai d'intervention pour un rideau métallique bloqué ?",
      a: "Nous intervenons en urgence 24h/24 et 7j/7 à Lyon et dans le Grand Lyon. En général, un technicien est sur place en moins de 30 à 45 minutes pour débloquer votre rideau et sécuriser votre commerce."
    },
    {
      q: "Peut-on motoriser un rideau métallique manuel existant ?",
      a: "Oui, tout à fait. Si l'axe de votre rideau est en bon état, nous pouvons installer un moteur central ou tubulaire pour vous offrir plus de confort au quotidien sans avoir à remplacer toute l'installation."
    },
    {
      q: "Quels types de grilles proposez-vous pour les boutiques ?",
      a: "Nous proposons des rideaux à lames pleines (opacité totale), des grilles tubes ondulés (visibilité maximale de la vitrine) ou des lames micro-perforées (le compromis idéal entre sécurité et visibilité)."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Rideaux Métalliques Lyon | Installation & Dépannage 24/7 | Serrurerie Roland</title>
        <meta name="description" content="Expert en rideaux et grilles métalliques à Lyon depuis 20 ans. Installation sur-mesure, motorisation et dépannage express 24h/24." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-slate-950 pt-24">
        {/* HERO SECTION */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Image de fond avec calque sombre à 85% */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/rideau-metallique.webp)' }}>
            <div className="absolute inset-0 bg-slate-950/85"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <Link to="/#services" className="inline-flex items-center text-slate-400 hover:text-amber-500 transition-colors mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" /> Retour aux services
            </Link>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-6">
                Rideaux & Grilles <span className="text-amber-500">Métalliques</span> sur Mesure
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Pose, Réparation et Dépannage express à Lyon et dans tout le Grand Lyon. Protégez votre commerce avec l'expertise de Serrurerie Roland.
              </p>
              <a href={`tel:${(businessInfo?.phone ?? '06 68 67 65 65').replace(/\s/g, '')}`} className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-slate-950 rounded-xl font-bold hover:bg-amber-400 transition-all">
                <Phone className="h-5 w-5" /> Urgence Dépannage 24/7
              </a>
            </div>
          </div>
        </section>

        {/* EXPERTISE & ENGAGEMENTS */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-100 mb-6">Plus de 20 ans d'expertise à Lyon</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    Protégez efficacement votre commerce ou espace résidentiel grâce aux solutions innovantes de rideaux métalliques proposées par Serrurerie Roland.
                  </p>
                  <p>
                    Que vous soyez un professionnel cherchant à sécuriser votre vitrine ou un particulier souhaitant renforcer la sécurité de son garage, nous concevons des solutions qui allient <strong>robustesse, sécurité et esthétique</strong>.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                  {[
                    { icon: Shield, text: "Qualité Incontestable" },
                    { icon: Zap, text: "Réactivité sans faille" },
                    { icon: CheckCircle2, text: "Expérience Avérée" },
                    { icon: Settings, text: "Conseil Personnalisé" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <item.icon className="h-5 w-5 text-amber-500" />
                      <span className="text-slate-200 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/rideau-metallique.webp" 
                  alt="Installation de rideau métallique à Lyon" 
                  className="rounded-3xl shadow-2xl border border-slate-800"
                />
                <div className="absolute -bottom-6 -right-6 bg-amber-500 p-8 rounded-2xl hidden md:block">
                  <p className="text-slate-950 font-bold text-4xl">20+</p>
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
              <p className="text-slate-400">Installation, motorisation et maintenance sur-mesure</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Settings className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Installation & Pose</h3>
                <p className="text-slate-400 leading-relaxed">
                  Nous vous guidons dans le choix du rideau (lames pleines, micro-perforées, grilles) pour combiner élégance et sécurité maximale.
                </p>
              </div>

              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Dépannage Express</h3>
                <p className="text-slate-400 leading-relaxed">
                  Un rideau bloqué ou une panne moteur ? Nos techniciens interviennent rapidement sur Lyon et alentours pour minimiser vos pertes d'activité.
                </p>
              </div>

              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Wrench className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Motorisation</h3>
                <p className="text-slate-400 leading-relaxed">
                  Modernisez vos installations existantes avec nos solutions de motorisation pour une manœuvre fluide, rapide et sans effort.
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
                    {openFaq === index ? <ChevronUp className="h-5 w-5 text-amber-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-6">Besoin d'un devis gratuit pour votre commerce ?</h2>
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

export default MetalShuttersPage;