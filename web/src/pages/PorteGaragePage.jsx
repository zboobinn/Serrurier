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

const GarageDoorsPage = () => {
  const { businessInfo } = useBusinessInfo();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: "Proposez-vous des devis gratuits pour l'installation d'une porte de garage ?",
      a: "Oui, nous nous déplaçons pour évaluer votre espace et vous fournir un devis transparent et sans engagement pour votre projet de porte de garage."
    },
    {
      q: "Faites-vous uniquement de l'installation de portes neuves ?",
      a: "Non, nous assurons également la réparation, le dépannage express, le remplacement de pièces défectueuses et la motorisation de portes de garage manuelles existantes."
    },
    {
      q: "Quel type de porte de garage est le plus isolant ?",
      a: "Les portes sectionnelles avec panneaux à double paroi isolée en mousse polyuréthane sont actuellement les plus performantes pour l'isolation thermique et phonique de votre garage."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Portes de Garage sur-mesure à Lyon | Serrurerie Roland</title>
        <meta name="description" content="Serrurerie Roland est votre expert en portes de garage à Lyon. Installation, réparation, motorisation et sur-mesure. Sécurité, esthétique et durabilité." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-slate-950 pt-24">
        {/* HERO SECTION */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Image de fond avec calque sombre à 85% */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/porte-garage.webp)' }}>
            <div className="absolute inset-0 bg-slate-950/85"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <Link to="/#services" className="inline-flex items-center text-slate-400 hover:text-amber-500 transition-colors mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" /> Retour aux services
            </Link>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-6">
                Portes de Garage <span className="text-amber-500">sur Mesure</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Sécurité, Esthétique et Fonctionnalité. À Lyon, Serrurerie Roland est votre expert en portes de garage, offrant une gamme complète de services, de la conception à l’installation.
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
                <h2 className="text-3xl font-bold text-slate-100 mb-6">L'alliance du Design et de la Sécurité</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    Notre réputation repose sur la fusion parfaite entre sécurité robuste et design élégant. Chaque espace est unique, et nous l’avons bien compris.
                  </p>
                  <p>
                    Que vous cherchiez une porte sectionnelle, électrique coulissante ou avec système de motorisation spécial, notre gamme variée de portes de garage répond à <strong>tous les besoins, esthétiques et fonctionnels</strong>.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                  {[
                    { icon: CheckCircle2, text: "Portes Sectionnelles" },
                    { icon: Shield, text: "Isolation Optimale" },
                    { icon: Settings, text: "Motorisation" },
                    { icon: Zap, text: "Dépannage Rapide" }
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
                    src="/fond-homepage.webp" 
                    alt="Installation d'une porte de garage à Lyon" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-500">[Photo Porte de Garage]</div>'; }}
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
              <p className="text-slate-400">Installation, motorisation et dépannage sur-mesure</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Installation Experte</h3>
                <p className="text-slate-400 leading-relaxed">
                  Une défense robuste contre les intrusions et une isolation efficace contre le bruit, tout en maximisant l'espace intérieur de votre garage.
                </p>
              </div>

              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Settings className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Restauration & Moteurs</h3>
                <p className="text-slate-400 leading-relaxed">
                  Votre porte montre des signes d’usure ? Nos artisans peuvent la restaurer, changer les panneaux abîmés ou la motoriser pour plus de confort.
                </p>
              </div>

              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Wrench className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Assistance Dépannage</h3>
                <p className="text-slate-400 leading-relaxed">
                  Un mécanisme bloqué, une chaîne qui déraille ? Lorsque votre porte refuse de fonctionner, notre équipe est là pour un dépannage express.
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-6">Un projet de porte de garage en tête ?</h2>
              <p className="text-slate-900 text-lg mb-8 max-w-2xl mx-auto">
                En choisissant Serrurerie Roland, vous optez pour une entreprise qui allie tradition et innovation. Contactez-nous dès aujourd’hui !
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

export default GarageDoorsPage;