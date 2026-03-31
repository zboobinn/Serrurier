import React from 'react';
import { ShieldCheck } from 'lucide-react';

const AssurancesBanner = () => {
  // Liste des assurances principales en France
  const assurances = ['AXA', 'MACIF', 'Allianz', 'Groupama', 'MAAF', 'Matmut'];

  return (
    <div className="bg-white border-b border-slate-200 py-8 relative z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Bloc 1 : Réassurance */}
          <div className="flex items-center gap-4 text-slate-800 md:w-1/3" data-aos="fade-right">
            <ShieldCheck className="w-12 h-12 text-amber-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg leading-tight uppercase tracking-wide">Agréé Assurances</h3>
              <p className="text-sm text-slate-500 font-medium">Remboursement suite à effraction</p>
            </div>
          </div>

          {/* Bloc 2 : Les "Logos" des assurances */}
          {/* On utilise un effet gris neutre qui s'illumine au survol pour faire très "Pro" */}
          <div 
            className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 md:w-1/3 opacity-60 hover:opacity-100 transition-opacity duration-300"
            data-aos="fade-up"
          >
            {assurances.map((assur, idx) => (
              <span key={idx} className="font-bold text-xl text-slate-600 tracking-wider uppercase">
                {assur}
              </span>
            ))}
          </div>

          {/* Bloc 3 : La Certification A2P */}
          <div className="flex items-center justify-center md:justify-end gap-4 text-slate-800 md:w-1/3" data-aos="fade-left">
            <div className="text-right hidden sm:block">
              <h3 className="font-bold text-lg leading-tight uppercase tracking-wide">Matériel Certifié</h3>
              <p className="text-sm text-slate-500 font-medium">Norme de sécurité A2P</p>
            </div>
            {/* Badge A2P stylisé */}
            <div className="w-14 h-14 bg-slate-900 text-amber-500 flex items-center justify-center rounded-lg font-black text-2xl border-2 border-amber-500 flex-shrink-0 shadow-md">
              A2P
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AssurancesBanner;