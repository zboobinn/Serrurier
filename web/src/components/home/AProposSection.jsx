import React, { useState, useEffect } from 'react';
// 🟢 1. Imports ciblés (fini le "import * as LucideIcons")
import { Star, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Clock, Award, ThumbsUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getRelativeTime } from '@/utils/dateUtils';

// 🟢 2. Le dictionnaire d'icônes pour les "highlights" (points forts)
const highlightIconMap = {
  CheckCircle2,
  ShieldCheck,
  Clock,
  Award,
  ThumbsUp,
  Star
};

const AboutSection = ({ highlights, reviews }) => {
  // 🟢 3. Plus besoin d'extraire les icônes avec "const { Star } = LucideIcons;", on les a importées directement
  
  const filteredReviews = reviews.filter(review => review.rating >= 4);
  const scrollingReviews = [...filteredReviews, ...filteredReviews];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === filteredReviews.length - 1 ? 0 : prev + 1));
    }, 4000); 
    return () => clearInterval(timer);
  }, [currentIndex, filteredReviews.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === filteredReviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredReviews.length - 1 : prev - 1));
  };

  return (
    <section id="apropos" className="py-12 md:py-20 bg-slate-950 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-4 md:mb-6">25 Ans d'Expérience</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
            <p>Depuis plus de 25 ans, Serrurerie Roland est votre partenaire de confiance pour tous vos besoins en serrurerie à Lyon et dans ses alentours. Notre expertise couvre l'installation, la réparation et le dépannage d'urgence de tous types de serrures et systèmes de sécurité.</p>
            <p>Nous intervenons rapidement, 24h/24 et 7j/7, pour résoudre vos problèmes de serrurerie : porte claquée, clé cassée, changement de serrure, installation de porte blindée, et bien plus encore. Notre équipe de professionnels qualifiés met son savoir-faire à votre service pour garantir votre sécurité et votre tranquillité d'esprit.</p>
            <p>Que vous soyez un particulier ou un professionnel, nous vous proposons des solutions adaptées à vos besoins et à votre budget. Devis gratuit et transparent, intervention rapide, travail soigné : tels sont nos engagements.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {highlights.map((highlight, index) => {
            // 🟢 4. On utilise notre dictionnaire ici
            const IconComp = highlightIconMap[highlight.icon] || CheckCircle2;
            
            return (
              <div 
                key={index} 
                className="text-center"
                data-aos="fade-up" 
                data-aos-delay={index * 150}
              >
                <div className="inline-flex p-3 md:p-4 bg-amber-500/10 rounded-2xl mb-3 md:mb-4">
                  <IconComp className="h-10 w-10 md:h-12 md:w-12 text-amber-500" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-100 mb-2">{highlight.title}</h3>
                <p className="text-sm md:text-base text-slate-400">{highlight.description}</p>
              </div>
            );
          })}
        </div>

        <div className="border-t border-slate-800 pt-12 md:pt-16" data-aos="fade-up">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-100">Ce que disent nos clients</h2>
          </div>
          
          {/* VERSION PC */}
          <div className="hidden md:block relative w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
            
            <div className="flex items-center gap-6 animate-marquee py-4 hover:[animation-play-state:paused]">
              {scrollingReviews.map((review, index) => (
                <Card key={`${review.id}-${index}`} className="w-[500px] shrink-0 bg-slate-900 border-slate-800 flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 text-amber-500 mb-5">
                        {/* La balise <Star /> est désormais utilisée directement */}
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                      </div>
                      <p className="text-base text-slate-300 italic mb-5">"{review.text}"</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-semibold text-slate-100 text-base">{review.author}</span>
                      <span className="text-sm text-slate-500">{getRelativeTime(review.date)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* VERSION MOBILE */}
          <div className="block md:hidden relative w-full px-10">
            <button 
              onClick={prevSlide} 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-white hover:opacity-80 transition-opacity active:scale-95 p-2"
              aria-label="Avis précédent"
            >
              <ChevronLeft size={30} strokeWidth={1.5} />
            </button>

            <div className="w-full grid">
              {filteredReviews.map((review, idx) => (
                <div 
                  key={`${review.id}-mobile`} 
                  className={`col-start-1 row-start-1 w-full transition-all duration-500 ease-in-out ${
                    idx === currentIndex 
                      ? 'opacity-100 scale-100 z-10' 
                      : 'opacity-0 scale-95 z-0 pointer-events-none'
                  }`}
                >
                  <Card className="bg-slate-900 border-slate-800 flex flex-col h-full mx-1">
                    <CardContent className="p-5 flex-1 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex gap-1 text-amber-500 mb-3">
                          {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                        </div>
                        <p className="text-sm text-slate-300 italic mb-4">"{review.text}"</p>
                      </div>
                      <div className="flex flex-col border-t border-slate-800/50 pt-3 mt-auto">
                        <span className="font-semibold text-slate-100 text-sm">{review.author}</span>
                        <span className="text-xs text-slate-500 mt-1">{getRelativeTime(review.date)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <button 
              onClick={nextSlide} 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 text-white hover:opacity-80 transition-opacity active:scale-95 p-2"
              aria-label="Avis suivant"
            >
              <ChevronRight size={30} strokeWidth={1.5} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;