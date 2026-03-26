import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Shield, Database, Server, ChevronDown, ChevronUp, Cookie, AlertCircle, Gavel } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';

const LegalNoticePage = () => {
  const { businessInfo } = useBusinessInfo();

  // Remonter en haut de la page au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Gestion de l'ouverture/fermeture des sections (l'éditeur est ouvert par défaut)
  const [openSections, setOpenSections] = useState({
    editeur: true,
    hebergement: false,
    propriete: false,
    donnees: false,
    cookies: false,
    responsabilite: false,
    mediation: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Petit composant réutilisable pour créer les accordéons
  const AccordionSection = ({ id, icon: Icon, title, children }) => {
    const isOpen = openSections[id];
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all duration-200">
        <button 
          onClick={() => toggleSection(id)} 
          className="w-full flex items-center justify-between p-6 bg-slate-900 hover:bg-slate-800/50 transition-colors text-left"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Icon className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">{title}</h2>
          </div>
          {isOpen ? <ChevronUp className="h-6 w-6 text-slate-500 flex-shrink-0" /> : <ChevronDown className="h-6 w-6 text-slate-500 flex-shrink-0" />}
        </button>
        
        {isOpen && (
          <div className="p-6 pt-2 border-t border-slate-800/50 text-slate-300 space-y-4 leading-relaxed animate-in slide-in-from-top-2 duration-200">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Mentions Légales & Politique de Confidentialité | Serrurerie Roland</title>
        <meta name="description" content="Mentions légales, politique de confidentialité et conditions d'utilisation du site Serrurerie Roland." />
      </Helmet>
      
      <Header />

      <main className="min-h-screen bg-slate-950 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-amber-500 transition-colors mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" /> Retour à l'accueil
          </Link>

          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-100 mb-6">Mentions Légales & Confidentialité</h1>
            <p className="text-lg text-slate-400">
              Conformément aux dispositions de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, nous portons à la connaissance des utilisateurs du site les informations suivantes. Cliquez sur une section pour la dérouler.
            </p>
          </div>

          <div className="space-y-3">
            
            {/* 1. Éditeur */}
            <AccordionSection id="editeur" icon={Scale} title="1. Éditeur du Site">
              <p><strong className="text-slate-100">Raison sociale :</strong> Serrurerie Roland</p>
              <p><strong className="text-slate-100">Statut juridique :</strong> [À demander au client, ex: SASU / Auto-entreprise...]</p>
              <p><strong className="text-slate-100">Capital social :</strong> [Ex: 1 000 € ou "Néant" si auto-entreprise]</p>
              <p><strong className="text-slate-100">Adresse du siège social :</strong> {businessInfo?.address || '62 rue Racine 69100 Villeurbanne'}</p>
              <p><strong className="text-slate-100">Téléphone :</strong> {businessInfo?.phone || '06 68 67 65 65'}</p>
              <p><strong className="text-slate-100">Email :</strong> {businessInfo?.email || 'serrurerieroland@orange.fr'}</p>
              <p><strong className="text-slate-100">SIRET :</strong> [Numéro de SIRET]</p>
              <p><strong className="text-slate-100">Immatriculation (RCS / RM) :</strong> [Ex: RCS Lyon 123 456 789]</p>
              <p><strong className="text-slate-100">TVA Intracommunautaire :</strong> [Numéro de TVA ou "Non applicable, art. 293 B du CGI"]</p>
              <p><strong className="text-slate-100">Directeur de la publication :</strong> [Prénom et Nom du dirigeant]</p>
              <p className="pt-4 border-t border-slate-800/50 mt-4 text-sm text-slate-400">
                Création et développement web : Léo Noailles
              </p>
            </AccordionSection>

            {/* 2. Hébergement */}
            <AccordionSection id="hebergement" icon={Server} title="2. Hébergement">
              <p>Ce site internet est hébergé par :</p>
              <p><strong className="text-slate-100">Nom de l'hébergeur :</strong> [Ex: Vercel Inc. / OVH / Hostinger]</p>
              <p><strong className="text-slate-100">Adresse :</strong> [Adresse de l'hébergeur]</p>
              <p><strong className="text-slate-100">Site Web :</strong> [Lien web de l'hébergeur]</p>
            </AccordionSection>

            {/* 3. Propriété Intellectuelle */}
            <AccordionSection id="propriete" icon={Shield} title="3. Propriété Intellectuelle">
              <p>
                La structure générale du site, ainsi que les textes, graphiques, images, sons et vidéos la composant, sont la propriété de l'éditeur ou de ses partenaires. Toute représentation et/ou reproduction et/ou exploitation partielle ou totale de ce site, par quelque procédé que ce soit, sans l'autorisation préalable et par écrit de l'éditeur est strictement interdite et serait susceptible de constituer une contrefaçon au sens des articles L 335-2 et suivants du Code de la propriété intellectuelle.
              </p>
            </AccordionSection>

            {/* 4. Données Personnelles (RGPD) */}
            <AccordionSection id="donnees" icon={Database} title="4. Données Personnelles (RGPD)">
              <p>
                Les informations recueillies via le formulaire de contact (nom, email, message) sont enregistrées dans un fichier informatisé sécurisé. Elles sont nécessaires pour traiter votre demande, vous établir un devis ou vous recontacter.
              </p>
              <p>
                <strong>Durée de conservation :</strong> Ces données sont conservées pendant la durée nécessaire au traitement de votre demande et à la relation commerciale, et au maximum 3 ans après notre dernier contact.
              </p>
              <p>
                Conformément à la loi « Informatique et Libertés » modifiée et au Règlement Européen sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données. Vous pouvez exercer ce droit en nous contactant par email à l'adresse : <strong className="text-slate-100">{businessInfo?.email || 'serrurerieroland@orange.fr'}</strong>.
              </p>
            </AccordionSection>

            {/* 5. Cookies */}
            <AccordionSection id="cookies" icon={Cookie} title="5. Gestion des Cookies">
              <p>
                Le site peut collecter automatiquement des informations standards appelées "cookies" (ex: statistiques de visites anonymes via notre outil interne). Ces cookies ne sont utilisés qu'à des fins d'analyse du trafic et d'amélioration de l'expérience utilisateur.
              </p>
              <p>
                Aucune donnée publicitaire ou de ciblage commercial n'est collectée. Vous pouvez configurer votre navigateur pour refuser l'installation de ces cookies, ce qui pourrait toutefois altérer certaines fonctionnalités du site.
              </p>
            </AccordionSection>

            {/* 6. Litiges & Médiation */}
            <AccordionSection id="mediation" icon={Gavel} title="6. Litiges et Médiation">
              <p>
                Conformément aux articles L.616-1 et R.616-1 du code de la consommation, nous proposons un dispositif de médiation de la consommation. En cas de litige non résolu à l'amiable avec notre entreprise, le consommateur peut faire appel au médiateur de la consommation suivant :
              </p>
              <p className="bg-slate-800/50 p-4 rounded-lg mt-2">
                <strong>Nom du médiateur :</strong> [À remplir par ton client - Il DOIT être inscrit à un service de médiation, c'est obligatoire]<br/>
                <strong>Site internet :</strong> [Lien du médiateur]<br/>
                <strong>Adresse postale :</strong> [Adresse du médiateur]
              </p>
              <p>
                En outre, la Commission Européenne met à disposition une plateforme de règlement en ligne des litiges (RLL) accessible à l'adresse suivante : http://ec.europa.eu/consumers/odr/
              </p>
            </AccordionSection>

            {/* 7. Responsabilité */}
            <AccordionSection id="responsabilite" icon={AlertCircle} title="7. Responsabilités">
              <p>
                L'éditeur du site met tout en œuvre pour offrir aux utilisateurs des informations disponibles et vérifiées, mais ne saurait être tenu pour responsable des erreurs, d'une absence de disponibilité des informations et/ou de la présence de virus sur son site.
              </p>
              <p>
                Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de l'entreprise Serrurerie Roland.
              </p>
            </AccordionSection>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default LegalNoticePage;