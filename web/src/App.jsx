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
import { AuthProvider } from './contexts/AuthContext';
import { BusinessInfoProvider } from './contexts/BusinessInfoContext';
import ProtectedRoute from './components/ProtectedRoute';

// 🟢 On importe notre nouveau composant
import InitialLoader from './components/InitialLoader'; 

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <BusinessInfoProvider>
        
        {/* 🟢 Le code est maintenant beaucoup plus propre ici */}
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
                <Route path="/mentions-legales" element={<LegalNoticePage />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
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