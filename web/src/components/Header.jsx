import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

const fallbackServices = [
  { id: 'fb1', title: 'Dépannage Urgent 24/7' },
  { id: 'fb2', title: 'Portes de Garage' },
  { id: 'fb3', title: 'Portes Blindées' },
  { id: 'fb4', title: 'Rideaux Métalliques' },
  { id: 'fb5', title: 'Conseil en Sécurité' }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [servicesList, setServicesList] = useState(fallbackServices);
  const { businessInfo } = useBusinessInfo();
  
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'zone-intervention', label: 'Zone d\'Intervention' },
    { id: 'apropos', label: 'À Propos' },
    { id: 'contact', label: 'Contact' }
  ];

  // Bloquer le défilement du site quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data: records, error } = await supabase
          .from('services')
          .select('*')
          .neq('visible', false);
          
        if (records && records.length > 0) {
          setServicesList(records);
        }
      } catch (error) { console.error(error); }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let currentSection = 'accueil';

      const orderedSectionIds = ['accueil', 'services', 'zone-intervention', 'apropos', 'contact'];
      const sectionsElements = orderedSectionIds.map(id => document.getElementById(id));

      for (let i = sectionsElements.length - 1; i >= 0; i--) {
        const section = sectionsElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = orderedSectionIds[i];
          break;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const handlePhoneClick = async () => {
    try { await supabase.from('phone_clicks').insert([{}]); } catch (error) {}
  };

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      }
    }
  };

  const getServiceLink = (service) => {
    const title = service?.title || ''; 
    let linkUrl = `/service/${service.id}`;
    
    if (title.includes('Garage')) linkUrl = '/services/portes-de-garage';
    else if (title.includes('Blindée') || title.includes('Blindees') || title.includes('Blindee')) linkUrl = '/services/portes-blindees';
    else if (title.includes('Dépannage') || title.includes('Depannage') || title.includes('Urgent')) linkUrl = '/services/depannage-urgent';
    else if (title.includes('Rideau')) linkUrl = '/services/rideaux-metalliques';
    else if (title.includes('Vitrerie') || title.includes('Vitre')) linkUrl = '/services/vitrerie';
    else if (title.includes('Menuiserie') || title.includes('Fermeture')) linkUrl = '/services/menuiserie-fermetures';
    
    return linkUrl;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[5000] bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('accueil')}>
              <h1 className="text-2xl font-bold text-amber-500">Serrurerie Roland</h1>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              <button onClick={() => scrollToSection('accueil')} className={`text-sm font-medium transition-colors duration-200 relative ${activeSection === 'accueil' ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500'}`}>
                Accueil
                {activeSection === 'accueil' && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500"></span>}
              </button>

              <div className="relative group">
                <button onClick={() => scrollToSection('services')} className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 relative ${activeSection === 'services' || location.pathname.includes('/service/') || location.pathname.includes('/services/') ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500'}`}>
                  Services <ChevronDown className="h-4 w-4" />
                  {(activeSection === 'services' || location.pathname.includes('/service/') || location.pathname.includes('/services/')) && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500"></span>}
                </button>
                
                {servicesList.length > 0 && (
                  <div className="absolute left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                    <div className="py-2">
                      {servicesList.map(s => (
                        <Link key={s.id} to={getServiceLink(s)} className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-amber-500 transition-colors">
                          {s?.title || 'Service sans nom'}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {navLinks.slice(1).map((link) => (
                <button key={link.id} onClick={() => scrollToSection(link.id)} className={`text-sm font-medium transition-colors duration-200 relative ${activeSection === link.id ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500'}`}>
                  {link.label}
                  {activeSection === link.id && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500"></span>}
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a href={`tel:${businessInfo?.phone?.replace(/\s/g, '') ?? '0668676565'}`} onClick={handlePhoneClick} className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-950 rounded-xl font-semibold hover:bg-amber-400 transition-all duration-200 active:scale-[0.98]">
                <Phone className="h-4 w-4" />
                <span>{businessInfo?.phone ?? '06 68 67 65 65'}</span>
              </a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-slate-300 hover:text-amber-500 transition-colors z-[5001] relative">
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* 🟢 LE MENU MOBILE EST SORTI DU HEADER POUR UN Z-INDEX MAXIMAL */}
      <div 
        className={`fixed inset-0 pt-16 z-[4999] bg-slate-950 transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
          <button onClick={() => scrollToSection('accueil')} className="text-2xl font-bold text-left text-slate-100 hover:text-amber-500 transition-colors">
            Accueil
          </button>
          
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-amber-500 uppercase tracking-widest">Nos Services</p>
            <div className="flex flex-col gap-4 pl-4 border-l-2 border-slate-800/80">
              {servicesList.map(s => (
                <Link key={s.id} to={getServiceLink(s)} onClick={() => setIsMenuOpen(false)} className="text-lg text-slate-300 hover:text-amber-500 transition-colors">
                  {s?.title || 'Service sans nom'}
                </Link>
              ))}
            </div>
          </div>

          {navLinks.slice(1).map((link) => (
            <button key={link.id} onClick={() => scrollToSection(link.id)} className="text-2xl font-bold text-left text-slate-100 hover:text-amber-500 transition-colors">
              {link.label}
            </button>
          ))}

          {/* Bouton d'appel fixé en bas du menu */}
          <div className="mt-8 mb-4">
            <a 
              href={`tel:${businessInfo?.phone?.replace(/\s/g, '') ?? '0668676565'}`} 
              onClick={handlePhoneClick} 
              className="flex items-center justify-center gap-3 w-full py-4 bg-amber-500 text-slate-950 rounded-xl font-bold text-xl hover:bg-amber-400 transition-all active:scale-95 shadow-lg shadow-amber-500/20"
            >
              <Phone className="h-6 w-6" />
              <span>Appeler le {businessInfo?.phone ?? '06 68 67 65 65'}</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;