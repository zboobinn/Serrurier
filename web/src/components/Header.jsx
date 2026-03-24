import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';
import pb from '@/lib/pocketbaseClient';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const { businessInfo } = useBusinessInfo();

  const navLinks = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'services', label: 'Services' },
    { id: 'apropos', label: 'À Propos' },
    { id: 'zone-intervention', label: 'Zone d\'Intervention' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePhoneClick = async () => {
    try {
      await pb.collection('phone_clicks').create({ timestamp: new Date().toISOString() }, { $autoCancel: false });
    } catch (error) {
      console.error('Failed to track phone click:', error);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-amber-500">Serrurerie Roland</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-colors duration-200 relative ${
                  activeSection === link.id ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500"></span>
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${businessInfo?.phone?.replace(/\s/g, '') ?? '0668676565'}`}
              onClick={handlePhoneClick}
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-slate-950 rounded-xl font-semibold hover:bg-amber-400 transition-all duration-200 active:scale-[0.98]"
            >
              <Phone className="h-5 w-5" />
              <span>{businessInfo?.phone ?? '06 68 67 65 65'}</span>
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-amber-500 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <nav className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeSection === link.id
                    ? 'bg-amber-500/10 text-amber-500'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href={`tel:${businessInfo?.phone?.replace(/\s/g, '') ?? '0668676565'}`}
              onClick={handlePhoneClick}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-amber-500 text-slate-950 rounded-xl font-semibold hover:bg-amber-400 transition-all duration-200 active:scale-[0.98]"
            >
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