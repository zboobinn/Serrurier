// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FloatingCallButton from './components/FloatingCallButton';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import ServicePage from './pages/ServicePage';
import GarageDoorsPage from './pages/PorteGaragePage';
import ArmoredDoorsPage from './pages/PorteBlindeePage';
import LegalNoticePage from './pages/MentionsLegalesPage';
import EmergencyPage from './pages/DepannageUrgentPage';
import MetalShuttersPage from './pages/RideauxMetalPage';
import VitreriePage from './pages/VitreriePage';
import { AuthProvider } from './contexts/AuthContext';
import { BusinessInfoProvider } from './contexts/BusinessInfoContext';
import ProtectedRoute from './components/ProtectedRoute';
import InitialLoader from './components/InitialLoader';
import { supabase } from '@/lib/supabaseClient'; 

const hexToRgb = (hex) => {
  if (!hex) return null;
  hex = hex.replace('#', ''); 
  let r = 0, g = 0, b = 0;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }
  return `${r} ${g} ${b}`;
};

const ThemeInjector = () => {
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const { data: records, error } = await supabase.from('theme_settings').select('*');
        if (records && records.length > 0) {
          const theme = records[0];
          const root = document.documentElement;

          if (theme.color_primary) root.style.setProperty('--color-primary', hexToRgb(theme.color_primary));
          if (theme.color_primary_hover) root.style.setProperty('--color-primary-hover', hexToRgb(theme.color_primary_hover));
          if (theme.color_bg_main) root.style.setProperty('--color-bg-main', hexToRgb(theme.color_bg_main));
          if (theme.color_bg_card) root.style.setProperty('--color-bg-card', hexToRgb(theme.color_bg_card));
        }
      } catch (error) {
        console.error("Thème non chargé", error);
      }
    };
    fetchTheme();
  }, []);

  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <BusinessInfoProvider>
        <ThemeInjector />
        {isLoading ? (
          <InitialLoader /> 
        ) : (
          <div className="site-content">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/service/:id" element={<ServicePage />} />
                <Route path="/services/portes-de-garage" element={<GarageDoorsPage />} />
                <Route path="/services/portes-blindees" element={<ArmoredDoorsPage />} />
                <Route path="/services/depannage-urgent" element={<EmergencyPage />} />
                <Route path="/services/rideaux-metalliques" element={<MetalShuttersPage />} />
                <Route path="/services/vitrerie" element={<VitreriePage />} />
                <Route path="/mentions-legales" element={<LegalNoticePage />} />
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              </Routes>
            </BrowserRouter>
            <FloatingCallButton />
            <Toaster position="top-right" richColors />
          </div>
        )}
      </BusinessInfoProvider>
    </AuthProvider>
  );
}

export default App; 