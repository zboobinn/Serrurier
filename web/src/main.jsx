import React, { useEffect } from 'react' // 🟢 Ajout de useEffect
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'sonner'
import AOS from 'aos'; // 🟢 Import de AOS
import 'aos/dist/aos.css'; // 🟢 Import des styles AOS

// 🟢 Création d'un composant Root pour gérer l'initialisation
const Root = () => {
  useEffect(() => {
    // Initialisation de AOS avec des paramètres par défaut
    AOS.init({
      duration: 800, // Durée de l'animation (ms)
      once: false, // L'animation se joue-t-elle à chaque fois (true = une seule fois)
      easing: 'ease-out-quad', // Type de courbe de vitesse
    });
  }, []);

  return (
    <React.StrictMode>
      <App />
      <Toaster position="top-right" richColors />
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)