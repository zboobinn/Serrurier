import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ServicesSection = ({ services }) => {
  return (
    <section id="services" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-100 mb-4">Nos Services</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Une gamme complète de services de serrurerie et vitrerie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {services.slice(0, 2).map((service) => {
            const IconComp = LucideIcons[service.icon] || LucideIcons.Wrench;
            let linkUrl = `/service/${service.id}`;
            if (service.title.includes('Garage')) linkUrl = '/services/portes-de-garage';
            else if (service.title.includes('Blindée') || service.title.includes('Blindee')) linkUrl = '/services/portes-blindees';
            else if (service.title.includes('Dépannage') || service.title.includes('Depannage') || service.title.includes('Urgent')) linkUrl = '/services/depannage-urgent';
            else if (service.title.includes('Rideau') || service.title.includes('Métallique')) linkUrl = '/services/rideaux-metalliques';
            else if (service.title.includes('Vitrerie') || service.title.includes('Vitre')) linkUrl = '/services/vitrerie'; 

            return (
              <Link to={linkUrl} key={service.id} className="block h-full group">
                <Card className="bg-slate-900/50 border-slate-800 group-hover:shadow-xl group-hover:border-amber-500/50 group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <CardContent className="p-8 flex-1">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-amber-500/10 rounded-xl flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                        <IconComp className="h-8 w-8 text-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-slate-100 mb-3 break-words group-hover:text-amber-500 transition-colors">{service.title}</h3>
                        <p className="text-slate-400 leading-relaxed break-words">{service.description}</p>
                        <span className="inline-block mt-4 text-sm text-amber-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">En savoir plus ➔</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.slice(2).map((service) => {
            const IconComp = LucideIcons[service.icon] || LucideIcons.Wrench;
            let linkUrl = `/service/${service.id}`;
            if (service.title.includes('Garage')) linkUrl = '/services/portes-de-garage';
            else if (service.title.includes('Blindée') || service.title.includes('Blindee')) linkUrl = '/services/portes-blindees';
            else if (service.title.includes('Dépannage') || service.title.includes('Depannage') || service.title.includes('Urgent')) linkUrl = '/services/depannage-urgent';
            else if (service.title.includes('Rideau') || service.title.includes('Métallique')) linkUrl = '/services/rideaux-metalliques';
            else if (service.title.includes('Vitrerie') || service.title.includes('Vitre')) linkUrl = '/services/vitrerie';

            return (
              <Link to={linkUrl} key={service.id} className="block h-full group">
                <Card className="bg-slate-900/50 border-slate-800 group-hover:shadow-xl group-hover:border-amber-500/50 group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <div className="p-3 bg-amber-500/10 rounded-xl w-fit mb-4 group-hover:bg-amber-500/20 transition-colors">
                      <IconComp className="h-8 w-8 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-100 mb-3 break-words group-hover:text-amber-500 transition-colors">{service.title}</h3>
                    <p className="text-slate-400 leading-relaxed break-words flex-1">{service.description}</p>
                    <span className="inline-block mt-4 text-sm text-amber-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">En savoir plus ➔</span>
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