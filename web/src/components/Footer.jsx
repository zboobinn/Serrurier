import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';

const Footer = () => {
  const [businessInfo, setBusinessInfo] = useState({
    phone: '06 68 67 65 65',
    email: 'serrurerieroland@orange.fr',
    address: '62 rue Racine\n69100 Villeurbanne',
    opening_hours: '24h/24 - 7j/7'
  });

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const records = await pb.collection('business_info').getFullList({ $autoCancel: false });
        if (records.length > 0) {
          setBusinessInfo(records[0]);
        }
      } catch (error) {
        console.error('Failed to fetch business info:', error);
        // Garde les valeurs par défaut en cas d'erreur
      }
    };

    fetchBusinessInfo();
  }, []);
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-amber-500 mb-4">Serrurerie Roland</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Votre serrurier de confiance à Lyon depuis 25 ans. Service disponible 24h/24 et 7j/7.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4 tracking-wide uppercase">Contact</h4>
            <div className="space-y-3">
              <a
                href={`tel:${businessInfo.phone?.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors duration-200"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm">{businessInfo.phone}</span>
              </a>
              <a
                href={`mailto:${businessInfo.email}`}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors duration-200"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">{businessInfo.email}</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4 tracking-wide uppercase">Adresse</h4>
            <div className="flex items-start gap-2 text-slate-400">
              <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
              <span className="text-sm" dangerouslySetInnerHTML={{ __html: businessInfo.address?.replace('\n', '<br />') }} />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4 tracking-wide uppercase">Horaires</h4>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{businessInfo.opening_hours}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Serrurerie Roland. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-slate-500 hover:text-amber-500 transition-colors duration-200">
                Mentions Légales
              </a>
              <a href="#" className="text-sm text-slate-500 hover:text-amber-500 transition-colors duration-200">
                Politique de Confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;