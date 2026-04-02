import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ShieldCheck, Key, Lock, Home, Shield, DoorOpen, DoorClosed, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Le dictionnaire d'icônes
const iconMap = {
  Wrench,
  ShieldCheck,
  Key,
  Lock,
  Home,
  Shield,
  DoorOpen,
  DoorClosed,
  AlertTriangle
};

const ServicesSection = ({ services }) => {
  return (
    <section id="services" className="py-12 md:py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8 md:mb-16" data-aos="fade-up">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-3 md:mb-4">Nos Services</h2>
          <p className="text-sm md:text-lg text-slate-400 max-w-2xl mx-auto">
            Une gamme complète de services de serrurerie et vitrerie
          </p>
        </div>

        {/* 🟢 ESPACEMENT RÉDUIT : gap-3 sur mobile, gap-8 sur PC */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          
          {services.map((service, index) => {
            const IconComp = iconMap[service.icon] || Wrench;
            
            // Gestion dynamique des redirections
            let linkUrl = `/service/${service.id}`;
            if (service.title.includes('Garage')) linkUrl = '/services/portes-de-garage';
            else if (service.title.includes('Blindée') || service.title.includes('Blindee')) linkUrl = '/services/portes-blindees';
            else if (service.title.includes('Dépannage') || service.title.includes('Depannage') || service.title.includes('Urgent')) linkUrl = '/services/depannage-urgent';
            else if (service.title.includes('Rideau') || service.title.includes('Métallique')) linkUrl = '/services/rideaux-metalliques';
            else if (service.title.includes('Vitrerie') || service.title.includes('Vitre')) linkUrl = '/services/vitrerie';
            else if (service.title.includes('Menuiserie') || service.title.includes('Fermeture')) linkUrl = '/services/menuiserie-fermetures';

            return (
              <Link to={linkUrl} key={service.id} className="block h-full group">
                <Card 
                  className="bg-slate-900/50 border-slate-800 group-hover:shadow-xl group-hover:border-amber-500/50 group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                  data-aos="fade-up" 
                  data-aos-delay={(index % 3) * 150} 
                >
                  {/* 🟢 PADDINGS RÉDUITS : p-4 sur mobile, p-8 sur PC */}
                  <CardContent className="p-4 md:p-8 flex-1 flex flex-col">
                    
                    {/* 🟢 MARGES ET TAILLES RÉDUITES POUR L'ENTÊTE */}
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-6">
                      <div className="p-2 md:p-4 bg-amber-500/10 rounded-xl flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                        <IconComp className="h-5 w-5 md:h-8 md:w-8 text-amber-500" />
                      </div>
                      <h3 className="text-base md:text-xl font-bold text-slate-100 break-words group-hover:text-amber-500 transition-colors line-clamp-2">
                        {service.title}
                      </h3>
                    </div>
                    
                    {/* 🟢 TEXTE PLUS PETIT ET LIMITÉ À 3 LIGNES SUR MOBILE */}
                    <p className="text-sm md:text-base text-slate-400 leading-snug md:leading-relaxed break-words flex-1 line-clamp-3 md:line-clamp-none">
                      {service.description}
                    </p>
                    
                    {/* 🟢 ESPACE AU DESSUS DU LIEN RÉDUIT */}
                    <div className="mt-3 md:mt-6 flex items-center text-xs md:text-sm text-amber-500 font-semibold opacity-85 group-hover:opacity-100 transition-opacity">
                      En savoir plus 
                      <span className="ml-1.5 transform group-hover:translate-x-1 transition-transform">➔</span>
                    </div>

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