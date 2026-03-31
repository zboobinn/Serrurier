import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ServicesSection = ({ services }) => {
  return (
    <section id="services" className="py-12 md:py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16" data-aos="fade-up">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-3 md:mb-4">Nos Services</h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
            Une gamme complète de services de serrurerie et vitrerie
          </p>
        </div>

        {/* Réduction de l'espace entre les cartes sur mobile (gap-4 au lieu de gap-8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
          {services.slice(0, 2).map((service, index) => {
            const IconComp = LucideIcons[service.icon] || LucideIcons.Wrench;
            let linkUrl = `/service/${service.id}`;
            if (service.title.includes('Garage')) linkUrl = '/services/portes-de-garage';
            else if (service.title.includes('Blindée') || service.title.includes('Blindee')) linkUrl = '/services/portes-blindees';
            else if (service.title.includes('Dépannage') || service.title.includes('Depannage') || service.title.includes('Urgent')) linkUrl = '/services/depannage-urgent';
            else if (service.title.includes('Rideau') || service.title.includes('Métallique')) linkUrl = '/services/rideaux-metalliques';
            else if (service.title.includes('Vitrerie') || service.title.includes('Vitre')) linkUrl = '/services/vitrerie'; 

            return (
              <Link to={linkUrl} key={service.id} className="block h-full group">
                <Card 
                  className="bg-slate-900/50 border-slate-800 group-hover:shadow-xl group-hover:border-amber-500/50 group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                  data-aos="fade-up" 
                  data-aos-delay={index * 150}
                >
                  {/* Padding réduit à p-5 sur mobile, p-8 sur PC */}
                  <CardContent className="p-5 md:p-8 flex-1">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="p-2 md:p-3 bg-amber-500/10 rounded-xl flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                        <IconComp className="h-6 w-6 md:h-8 md:w-8 text-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-semibold text-slate-100 mb-1.5 md:mb-3 break-words group-hover:text-amber-500 transition-colors">{service.title}</h3>
                        <p className="text-sm md:text-base text-slate-400 leading-snug md:leading-relaxed break-words">{service.description}</p>
                        <span className="inline-block mt-3 md:mt-4 text-xs md:text-sm text-amber-500 font-medium opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">En savoir plus ➔</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {services.slice(2).map((service, index) => {
            const IconComp = LucideIcons[service.icon] || LucideIcons.Wrench;
            let linkUrl = `/service/${service.id}`;
            if (service.title.includes('Garage')) linkUrl = '/services/portes-de-garage';
            else if (service.title.includes('Blindée') || service.title.includes('Blindee')) linkUrl = '/services/portes-blindees';
            else if (service.title.includes('Dépannage') || service.title.includes('Depannage') || service.title.includes('Urgent')) linkUrl = '/services/depannage-urgent';
            else if (service.title.includes('Rideau') || service.title.includes('Métallique')) linkUrl = '/services/rideaux-metalliques';
            else if (service.title.includes('Vitrerie') || service.title.includes('Vitre')) linkUrl = '/services/vitrerie';

            return (
              <Link to={linkUrl} key={service.id} className="block h-full group">
                <Card 
                  className="bg-slate-900/50 border-slate-800 group-hover:shadow-xl group-hover:border-amber-500/50 group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                  data-aos="fade-up" 
                  data-aos-delay={(index + 2) * 150}
                >
                  <CardContent className="p-5 md:p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 md:block mb-3 md:mb-4">
                      <div className="p-2 md:p-3 bg-amber-500/10 rounded-xl w-fit group-hover:bg-amber-500/20 transition-colors">
                        <IconComp className="h-6 w-6 md:h-8 md:w-8 text-amber-500" />
                      </div>
                      {/* Sur mobile, le titre est à côté de l'icône. Sur PC, il est en dessous. */}
                      <h3 className="text-lg md:text-xl font-semibold text-slate-100 md:mt-3 break-words group-hover:text-amber-500 transition-colors">{service.title}</h3>
                    </div>
                    
                    <p className="text-sm md:text-base text-slate-400 leading-snug md:leading-relaxed break-words flex-1">{service.description}</p>
                    <span className="inline-block mt-3 md:mt-4 text-xs md:text-sm text-amber-500 font-medium opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">En savoir plus ➔</span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;