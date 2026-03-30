import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getRelativeTime } from '@/utils/dateUtils';

const AboutSection = ({ highlights, reviews }) => {
  const { Star } = LucideIcons;
  const filteredReviews = reviews.filter(review => review.rating >= 4);
  const scrollingReviews = [...filteredReviews, ...filteredReviews];

  return (
    <section id="apropos" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-100 mb-6">25 Ans d'Expérience</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-slate-300 leading-relaxed">
            <p>Depuis plus de 25 ans, Serrurerie Roland est votre partenaire de confiance pour tous vos besoins en serrurerie à Lyon et dans ses alentours. Notre expertise couvre l'installation, la réparation et le dépannage d'urgence de tous types de serrures et systèmes de sécurité.</p>
            <p>Nous intervenons rapidement, 24h/24 et 7j/7, pour résoudre vos problèmes de serrurerie : porte claquée, clé cassée, changement de serrure, installation de porte blindée, et bien plus encore. Notre équipe de professionnels qualifiés met son savoir-faire à votre service pour garantir votre sécurité et votre tranquillité d'esprit.</p>
            <p>Que vous soyez un particulier ou un professionnel, nous vous proposons des solutions adaptées à vos besoins et à votre budget. Devis gratuit et transparent, intervention rapide, travail soigné : tels sont nos engagements.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {highlights.map((highlight, index) => {
            const IconComp = LucideIcons[highlight.icon] || LucideIcons.CheckCircle2;
            return (
              <div 
                key={index} 
                className="text-center"
                data-aos="fade-up" 
                data-aos-delay={index * 150}
              >
                <div className="inline-flex p-4 bg-amber-500/10 rounded-2xl mb-4">
                  <IconComp className="h-12 w-12 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">{highlight.title}</h3>
                <p className="text-slate-400">{highlight.description}</p>
              </div>
            );
          })}
        </div>

        <div className="border-t border-slate-800 pt-16" data-aos="fade-up">
          <div className="text-center mb-12"><h2 className="text-3xl font-semibold text-slate-100">Ce que disent nos clients</h2></div>
          <div className="relative w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="flex gap-6 animate-marquee py-4">
              {scrollingReviews.map((review, index) => (
                <Card key={`${review.id}-${index}`} className="w-[500px] shrink-0 bg-slate-900 border-slate-800">
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex gap-1 text-amber-500 mb-5">{[...Array(review.rating)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
                    <p className="text-slate-300 italic mb-5">"{review.text}"</p>
                    <div className="flex justify-between mt-auto">
                      <span className="font-semibold text-slate-100">{review.author}</span>
                      <span className="text-slate-500">{getRelativeTime(review.date)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;