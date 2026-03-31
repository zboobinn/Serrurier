import React from 'react';
import { Helmet } from 'react-helmet';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';

const SEOSchema = () => {
  const { businessInfo } = useBusinessInfo();

  // On prépare les données proprement dans une variable
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    "name": "Serrurerie Roland",
    // 🟢 AJOUT 1 : Une description claire contenant tes mots-clés principaux
    "description": "Artisan serrurier de confiance à Lyon et alentours. Intervention d'urgence 24h/24 et 7j/7, ouverture de porte sans casse, installation de portes blindées et vitrerie.",
    "image": "https://serrurerie-roland.com/FondAccueil.webp", // (Pense à mettre ton vrai nom de domaine plus tard)
    // 🟢 AJOUT 2 : Le logo officiel
    "logo": "https://serrurerie-roland.com/icon.png", 
    "@id": "https://serrurerie-roland.com/",
    "url": "https://serrurerie-roland.com/",
    "telephone": businessInfo?.phone ?? "06 68 67 65 65",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "62 rue Racine",
      "addressLocality": "Villeurbanne",
      "postalCode": "69100",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.7640,
      "longitude": 4.8357
    },
    // 🟢 AJOUT 3 : Liens vers tes autres profils (à décommenter et remplir si tu en as)
    "sameAs": [
      // "https://www.facebook.com/SerrurerieRoland",
      // "https://www.pagesjaunes.fr/pros/ton-id-pages-jaunes"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": [
      { "@type": "City", "name": "Lyon" },
      { "@type": "City", "name": "Lyon 1" },
      { "@type": "City", "name": "Lyon 2" },
      { "@type": "City", "name": "Lyon 3" },
      { "@type": "City", "name": "Lyon 4" },
      { "@type": "City", "name": "Lyon 5" },
      { "@type": "City", "name": "Lyon 6" },
      { "@type": "City", "name": "Lyon 7" },
      { "@type": "City", "name": "Lyon 8" },
      { "@type": "City", "name": "Lyon 9" },
      { "@type": "City", "name": "Villeurbanne" },
      { "@type": "City", "name": "Vénissieux" },
      { "@type": "City", "name": "Bron" },
      { "@type": "City", "name": "Vaulx-en-Velin" },
      { "@type": "City", "name": "Saint-Priest" },
      { "@type": "City", "name": "Caluire-et-Cuire" },
      { "@type": "City", "name": "Oullins" },
      { "@type": "City", "name": "Sainte-Foy-lès-Lyon" },
      { "@type": "City", "name": "Tassin-la-Demi-Lune" },
      { "@type": "City", "name": "Ecully" },
      { "@type": "City", "name": "Décines-Charpieu" },
      { "@type": "City", "name": "Meyzieu" }
    ]
  };

  return (
    <Helmet>
      {/* On injecte le script JSON-LD dans le head de la page */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default SEOSchema;