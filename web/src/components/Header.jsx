import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [servicesList, setServicesList] = useState([]);
  const { businessInfo } = useBusinessInfo();
  
  const location = useLocation();
  const navigate = useNavigate();

  // Les liens classiques de la page d'accueil
  const navLinks = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'apropos', label: 'À Propos' },
    { id: 'zone-intervention', label: 'Zone d\'Intervention' },
    { id: 'contact', label: 'Contact' }
  ];

  // Récupérer les services pour le menu déroulant
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const records = await pb.collection('services').getFullList({ filter: 'visible != false', sort: 'created' });
        setServicesList(records);
      } catch (error) { console.error(error); }
    };
    fetchServices();
  }, []);

  // Gérer la surbrillance au défilement (uniquement sur la page d'accueil)
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let currentSection = 'accueil';

      // ✅ L'ordre physique exact de tes sections sur la page (de haut en bas)
      const orderedSectionIds = ['accueil', 'services', 'apropos', 'zone-intervention', 'contact'];
      const sectionsElements = orderedSectionIds.map(id => document.getElementById(id));

      // Le code vérifie de bas en haut
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
    try { await pb.collection('phone_clicks').create({ timestamp: new Date().toISOString() }, { $autoCancel: false }); } catch (error) {}
  };

  // La fonction magique pour naviguer même si on n'est pas sur la page d'accueil
  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      // Si on est sur une autre page, on retourne à l'accueil avec un #hash
      navigate(`/#${id}`);
    } else {
      // Si on est déjà sur l'accueil, on glisse en douceur
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('accueil')}>
            <h1 className="text-2xl font-bold text-amber-500">Serrurerie Roland</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('accueil')} className={`text-sm font-medium transition-colors duration-200 relative ${activeSection === 'accueil' ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500'}`}>
              Accueil
              {activeSection === 'accueil' && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500"></span>}
            </button>

            {/* 🟢 LE MENU DÉROULANT DES SERVICES */}
            <div className="relative group">
              <button onClick={() => scrollToSection('services')} className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 relative ${activeSection === 'services' || location.pathname.includes('/service/') ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500'}`}>
                Services <ChevronDown className="h-4 w-4" />
                {(activeSection === 'services' || location.pathname.includes('/service/')) && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500"></span>}
              </button>
              
              {/* Le sous-menu */}
              <div className="absolute left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                <div className="py-2">
                  {servicesList.map(s => {
                    // 🟢 L'astuce pour le menu
                    let linkUrl = `/service/${s.id}`;
                    if (s.title.includes('Garage')) linkUrl = '/services/portes-de-garage';

                    return (
                      <Link key={s.id} to={linkUrl} className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-amber-500 transition-colors">
                        {s.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <button key={link.id} onClick={() => scrollToSection(link.id)} className={`text-sm font-medium transition-colors duration-200 relative ${activeSection === link.id ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500'}`}>
                {link.label}
                {activeSection === link.id && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500"></span>}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href={`tel:${businessInfo?.phone?.replace(/\s/g, '') ?? '0668676565'}`} onClick={handlePhoneClick} className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-950 rounded-xl font-semibold hover:bg-amber-400 transition-all duration-200 active:scale-[0.98]">
              <Phone className="h-4 w-4" />
              <span>{businessInfo?.phone ?? '06 68 67 65 65'}</span>
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-300 hover:text-amber-500">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 max-h-[80vh] overflow-y-auto">
          <nav className="px-4 py-6 space-y-4">
            <button onClick={() => scrollToSection('accueil')} className="block w-full text-left px-4 py-2 text-slate-300 hover:text-amber-500">Accueil</button>
            
            <div className="px-4 py-2 border-l-2 border-amber-500/30 ml-2">
              <p className="text-slate-500 text-xs uppercase font-semibold mb-3 tracking-wider">Nos Services</p>
              <div className="space-y-3">
                {servicesList.map(s => {
                  // 🟢 L'astuce pour le mobile
                  let linkUrl = `/service/${s.id}`;
                  if (s.title.includes('Garage')) linkUrl = '/services/portes-de-garage';

                  return (
                    <Link key={s.id} to={linkUrl} onClick={() => setIsMenuOpen(false)} className="block text-sm text-slate-300 hover:text-amber-500">
                      {s.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <button key={link.id} onClick={() => scrollToSection(link.id)} className="block w-full text-left px-4 py-2 text-slate-300 hover:text-amber-500">
                {link.label}
              </button>
            ))}
            <a href={`tel:${businessInfo?.phone?.replace(/\s/g, '') ?? '0668676565'}`} onClick={handlePhoneClick} className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-amber-500 text-slate-950 rounded-xl font-semibold">
              <Phone className="h-5 w-5" />
              <span>{businessInfo?.phone ?? '06 68 67 65 65'}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;