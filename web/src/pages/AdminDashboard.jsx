import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { LogOut, Edit2, Save, X, MessageSquare, Phone, Eye, EyeOff, Plus, Trash2, ChevronDown, ChevronUp, Palette, Undo } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import LoadingSpinner from '@/components/LoadingSpinner.jsx';
import { toast } from 'sonner';

// Convertisseur pour l'aperçu en direct
const hexToRgb = (hex) => {
  if (!hex) return null;
  hex = hex.replace('#', '');
  let r = 0, g = 0, b = 0;
  if (hex.length === 3) { r = parseInt(hex[0]+hex[0], 16); g = parseInt(hex[1]+hex[1], 16); b = parseInt(hex[2]+hex[2], 16); }
  else if (hex.length === 6) { r = parseInt(hex.substring(0,2), 16); g = parseInt(hex.substring(2,4), 16); b = parseInt(hex.substring(4,6), 16); }
  return `${r} ${g} ${b}`;
};

const AdminDashboard = () => {
  const { logout, currentAdmin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // States pour les accordéons
  const [expandedSections, setExpandedSections] = useState({
    info: true,
    theme: false,
    services: false,
    highlights: false,
    reviews: false
  });

  // States Infos & Thème
  const [businessInfo, setBusinessInfo] = useState(null);
  const [themeSettings, setThemeSettings] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [editValues, setEditValues] = useState({});

  // States Statistiques & Collections
  const [stats, setStats] = useState({ messages: 0, phoneClicks: 0, siteVisits: 0, siteVisitsToday: 0 });
  const [services, setServices] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [reviews, setReviews] = useState([]);

  const fetchData = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startOfDay = today.toISOString().replace('T', ' '); 

      const [infoRes, themeRes, servicesRes, highlightsRes, reviewsRes, messagesRes, phoneRes, visitsRes, todayVisitsRes] = await Promise.all([
        pb.collection('business_info').getFullList({ $autoCancel: false }),
        pb.collection('theme_settings').getFullList({ $autoCancel: false }),
        pb.collection('services').getFullList({ sort: 'created', $autoCancel: false }),
        pb.collection('highlights').getFullList({ sort: 'created', $autoCancel: false }),
        pb.collection('reviews').getFullList({ sort: '-date', $autoCancel: false }),
        pb.collection('contact_messages').getList(1, 1, { $autoCancel: false }),
        pb.collection('phone_clicks').getList(1, 1, { $autoCancel: false }),
        pb.collection('site_visits').getList(1, 1, { $autoCancel: false }),
        pb.collection('site_visits').getList(1, 1, { filter: `created >= "${startOfDay}"`, $autoCancel: false })
      ]);

      if (infoRes.length > 0) {
        setBusinessInfo(infoRes[0]);
        setEditValues(prev => ({ ...prev, ...infoRes[0] }));
      }

      if (themeRes.length > 0) {
        setThemeSettings(themeRes[0]);
        setEditValues(prev => ({ ...prev, ...themeRes[0] }));
      } else {
        const defaultTheme = await pb.collection('theme_settings').create({
          color_primary: '#f59e0b', color_primary_hover: '#fbbf24',
          color_bg_main: '#020617', color_bg_card: '#0f172a'
        }, { $autoCancel: false });
        setThemeSettings(defaultTheme);
        setEditValues(prev => ({ ...prev, ...defaultTheme }));
      }

      setServices(servicesRes);
      setHighlights(highlightsRes);
      setReviews(reviewsRes);

      setStats({
        messages: messagesRes.totalItems, phoneClicks: phoneRes.totalItems,
        siteVisits: visitsRes.totalItems, siteVisitsToday: todayVisitsRes.totalItems
      });
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };
  const toggleSection = (section) => setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  const toggleEdit = (field) => setEditMode(prev => ({ ...prev, [field]: !prev[field] }));
  
  const handleCancelInfo = (field) => { setEditValues(prev => ({ ...prev, [field]: businessInfo[field] })); setEditMode(prev => ({ ...prev, [field]: false })); };
  const handleCancelTheme = (field) => { setEditValues(prev => ({ ...prev, [field]: themeSettings[field] })); setEditMode(prev => ({ ...prev, [field]: false })); };

  // Sauvegarde des Infos Business
  const handleSaveInfo = async (field) => {
    try {
      await pb.collection('business_info').update(businessInfo.id, { [field]: editValues[field] }, { $autoCancel: false });
      setBusinessInfo(prev => ({ ...prev, [field]: editValues[field] }));
      setEditMode(prev => ({ ...prev, [field]: false }));
      toast.success('Modifications enregistrées');
    } catch (error) { toast.error('Erreur lors de la sauvegarde'); }
  };

  // 🟢 Sauvegarde du Thème (avec mémorisation de l'ancienne couleur)
  const handleSaveTheme = async (field) => {
    try {
      const oldColor = themeSettings[field];
      const newColor = editValues[field];
      const prevField = `prev_${field}`;

      // On met à jour la couleur ET on stocke l'ancienne dans le champ "prev_"
      await pb.collection('theme_settings').update(themeSettings.id, { 
        [field]: newColor,
        [prevField]: oldColor
      }, { $autoCancel: false });

      setThemeSettings(prev => ({ ...prev, [field]: newColor, [prevField]: oldColor }));
      setEditMode(prev => ({ ...prev, [field]: false }));
      toast.success('Couleur mise à jour');
      
      document.documentElement.style.setProperty(`--${field.replace(/_/g, '-')}`, hexToRgb(newColor));
    } catch (error) { toast.error('Erreur lors de la sauvegarde'); }
  };

  // 🟢 Restauration de l'ancienne couleur
  const handleRestoreTheme = async (field) => {
    const prevField = `prev_${field}`;
    const previousColor = themeSettings[prevField];
    if (!previousColor) return;

    try {
      // On remet l'ancienne couleur
      await pb.collection('theme_settings').update(themeSettings.id, { 
        [field]: previousColor 
      }, { $autoCancel: false });

      setThemeSettings(prev => ({ ...prev, [field]: previousColor }));
      setEditValues(prev => ({ ...prev, [field]: previousColor }));
      toast.success('Couleur précédente restaurée');
      
      document.documentElement.style.setProperty(`--${field.replace(/_/g, '-')}`, hexToRgb(previousColor));
    } catch (error) { toast.error('Erreur lors de la restauration'); }
  };

  // --- Gestion CRUD (Services, Highlights, Reviews) ---
  const handleAddItem = async (e, collection) => {
    e.stopPropagation();
    setExpandedSections(prev => ({...prev, [collection]: true}));

    try {
      let newItemData = { visible: true };
      if (collection === 'reviews') {
        const today = new Date().toISOString().split('T')[0];
        newItemData = { ...newItemData, author: 'Nouveau client', text: 'Excellent travail...', rating: 5, date: today };
      } else {
        newItemData = { ...newItemData, title: 'Nouveau titre', description: 'Description...', icon: 'Wrench' };
      }

      const newItem = await pb.collection(collection).create(newItemData, { $autoCancel: false });

      if (collection === 'services') setServices([...services, newItem]);
      else if (collection === 'highlights') setHighlights([...highlights, newItem]);
      else if (collection === 'reviews') setReviews([newItem, ...reviews]);

      toast.success('Élément ajouté');
    } catch (error) { toast.error('Erreur lors de l\'ajout'); }
  };

  const handleLocalChange = (collection, id, field, value) => {
    const updateState = (state, setState) => {
      setState(state.map(item => item.id === id ? { ...item, [field]: value } : item));
    };
    if (collection === 'services') updateState(services, setServices);
    else if (collection === 'highlights') updateState(highlights, setHighlights);
    else if (collection === 'reviews') updateState(reviews, setReviews);
  };

  const handleSaveItemDB = async (collection, id, field, value) => {
    try {
      await pb.collection(collection).update(id, { [field]: value }, { $autoCancel: false });
      toast.success('Sauvegardé');
    } catch (error) { toast.error('Erreur de synchronisation'); }
  };

  const handleToggleVisibility = async (collectionName, item) => {
    const newValue = item.visible === false ? true : false; 
    handleLocalChange(collectionName, item.id, 'visible', newValue);
    try {
      await pb.collection(collectionName).update(item.id, { visible: newValue }, { $autoCancel: false });
      toast.success(newValue ? 'Élément visible' : 'Élément masqué');
    } catch (error) { toast.error('Erreur lors de la mise à jour'); }
  };

  const handleDeleteItem = async (collection, id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet élément ?')) return;
    try {
      await pb.collection(collection).delete(id, { $autoCancel: false });
      if (collection === 'services') setServices(services.filter(s => s.id !== id));
      else if (collection === 'highlights') setHighlights(highlights.filter(h => h.id !== id));
      else if (collection === 'reviews') setReviews(reviews.filter(r => r.id !== id));
      toast.success('Élément supprimé');
    } catch (error) { toast.error('Erreur lors de la suppression'); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950"><LoadingSpinner size="lg" /></div>;

  const infoFields = [
    { key: 'address', label: 'Adresse', type: 'text' },
    { key: 'phone', label: 'Téléphone', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'opening_hours', label: 'Horaires', type: 'text' },
    { key: 'closure_message', label: 'Message de fermeture', type: 'textarea' },
    { key: 'intervention_radius', label: 'Rayon d\'intervention (en km)', type: 'number' }
  ];

  const themeFields = [
    { key: 'color_primary', label: 'Couleur Principale' },
    { key: 'color_primary_hover', label: 'Couleur Principale (Clair)' },
    { key: 'color_bg_main', label: 'Couleur Fond Principal' },
    { key: 'color_bg_card', label: 'Couleur Cartes et Footer' }
  ];

  // Fonction pour afficher les listes standard
  const renderStandardList = (title, description, collectionName, items, sectionKey) => (
    <Card className="bg-slate-900 border-slate-800 mb-6 overflow-hidden">
      <div 
        className="flex flex-row items-center justify-between p-6 cursor-pointer hover:bg-slate-800/50 transition-colors"
        onClick={() => toggleSection(sectionKey)}
      >
        <div>
          <CardTitle className="text-slate-100">{title}</CardTitle>
          <CardDescription className="text-slate-400 mt-1">{description}</CardDescription>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={(e) => handleAddItem(e, collectionName)} size="sm" className="bg-amber-500 text-slate-950 hover:bg-amber-400 z-10 relative">
            <Plus className="h-4 w-4 mr-1" /> Ajouter
          </Button>
          <div className="text-slate-500">
            {expandedSections[sectionKey] ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
          </div>
        </div>
      </div>
      
      {expandedSections[sectionKey] && (
        <CardContent className="space-y-4 pt-0">
          <div className="border-t border-slate-800 pt-6">
            {items.map((item) => (
              <div key={item.id} className={`p-4 bg-slate-800/50 rounded-lg border relative group mb-4 transition-all ${item.visible === false ? 'border-slate-800 opacity-60' : 'border-slate-700'}`}>
                
                <div className="absolute top-2 right-2 flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all">
                  <Button onClick={() => handleToggleVisibility(collectionName, item)} variant="ghost" size="icon" className={`${item.visible === false ? 'text-slate-500 hover:text-slate-300' : 'text-amber-500 hover:text-amber-400'} hover:bg-slate-700/50`} title={item.visible === false ? "Afficher" : "Masquer"}>
                    {item.visible === false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button onClick={() => handleDeleteItem(collectionName, item.id)} variant="ghost" size="icon" className="text-red-400 hover:bg-red-400/20" title="Supprimer">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 pr-20">
                  <div>
                    <Label className="text-slate-400 text-xs mb-1 block">Titre</Label>
                    <Input value={item.title} onChange={(e) => handleLocalChange(collectionName, item.id, 'title', e.target.value)} onBlur={(e) => handleSaveItemDB(collectionName, item.id, 'title', e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100 h-9" />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-xs mb-1 block">Icône</Label>
                    <Input value={item.icon} onChange={(e) => handleLocalChange(collectionName, item.id, 'icon', e.target.value)} onBlur={(e) => handleSaveItemDB(collectionName, item.id, 'icon', e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100 h-9" />
                  </div>
                </div>
                <div>
                  <Label className="text-slate-400 text-xs mb-1 block">Description</Label>
                  <Textarea value={item.description} onChange={(e) => handleLocalChange(collectionName, item.id, 'description', e.target.value)} onBlur={(e) => handleSaveItemDB(collectionName, item.id, 'description', e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100" rows={2} />
                </div>
              </div>
            ))}
            {items.length === 0 && <p className="text-slate-500 italic text-center py-4">Aucun élément.</p>}
          </div>
        </CardContent>
      )}
    </Card>
  );

  return (
    <>
      <Helmet><title>Tableau de Bord Admin - Serrurerie Roland</title></Helmet>

      <div className="min-h-screen bg-slate-950 pb-20">
        <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-amber-500">Tableau de Bord</h1>
                <p className="text-sm text-slate-400 mt-1">Serrurerie Roland</p>
              </div>
              <Button onClick={handleLogout} variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <LogOut className="h-4 w-4 mr-2" /> Déconnexion
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* STATISTIQUES */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader><div className="flex justify-between"><CardTitle className="text-slate-100">Messages</CardTitle><MessageSquare className="h-5 w-5 text-amber-500" /></div></CardHeader>
              <CardContent><p className="text-4xl font-bold text-amber-500">{stats.messages}</p></CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader><div className="flex justify-between"><CardTitle className="text-slate-100">Clics Téléphone</CardTitle><Phone className="h-5 w-5 text-amber-500" /></div></CardHeader>
              <CardContent><p className="text-4xl font-bold text-amber-500">{stats.phoneClicks}</p></CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader><div className="flex justify-between"><CardTitle className="text-slate-100">Visites du Site</CardTitle><Eye className="h-5 w-5 text-amber-500" /></div></CardHeader>
              <CardContent><div className="flex items-baseline gap-2"><p className="text-4xl font-bold text-amber-500">{stats.siteVisitsToday}</p><p className="text-sm text-amber-500/80">aujourd'hui</p></div><p className="text-sm text-slate-400 mt-2">Total : {stats.siteVisits}</p></CardContent>
            </Card>
          </div>

          {/* ACCORDÉON : INFORMATIONS DE BASE */}
          <Card className="bg-slate-900 border-slate-800 mb-6 overflow-hidden">
            <div 
              className="flex flex-row items-center justify-between p-6 cursor-pointer hover:bg-slate-800/50 transition-colors"
              onClick={() => toggleSection('info')}
            >
              <div>
                <CardTitle className="text-slate-100">Informations de l'Entreprise</CardTitle>
                <CardDescription className="text-slate-400 mt-1">Coordonnées et message d'urgence</CardDescription>
              </div>
              <div className="text-slate-500">
                {expandedSections.info ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
              </div>
            </div>
            
            {expandedSections.info && (
              <CardContent className="space-y-6 pt-0 border-t border-slate-800 pt-6 mt-2">
                {infoFields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-slate-200">{field.label}</Label>
                      {!editMode[field.key] ? (
                        <Button onClick={() => toggleEdit(field.key)} variant="ghost" size="sm" className="text-amber-500 hover:text-amber-400 hover:bg-slate-800"><Edit2 className="h-4 w-4 mr-1" />Modifier</Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button onClick={() => handleSaveInfo(field.key)} size="sm" className="bg-amber-500 text-slate-950 hover:bg-amber-400"><Save className="h-4 w-4 mr-1" />Sauvegarder</Button>
                          <Button onClick={() => handleCancelInfo(field.key)} variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800"><X className="h-4 w-4 mr-1" />Annuler</Button>
                        </div>
                      )}
                    </div>
                    {editMode[field.key] ? (
                      field.type === 'textarea' ? <Textarea value={editValues[field.key] || ''} onChange={(e) => setEditValues(prev => ({ ...prev, [field.key]: e.target.value }))} className="bg-slate-800 border-slate-700 text-slate-100" rows={3} />
                      : <Input type={field.type} value={editValues[field.key] || ''} onChange={(e) => setEditValues(prev => ({ ...prev, [field.key]: e.target.value }))} className="bg-slate-800 border-slate-700 text-slate-100" />
                    ) : <div className="p-3 bg-slate-800 rounded-lg border border-slate-700"><p className="text-slate-300">{businessInfo?.[field.key] || 'Non défini'}</p></div>}
                  </div>
                ))}
              </CardContent>
            )}
          </Card>

          {/* ACCORDÉON : DESIGN ET COULEURS */}
          <Card className="bg-slate-900 border-slate-800 mb-6 overflow-hidden">
            <div 
              className="flex flex-row items-center justify-between p-6 cursor-pointer hover:bg-slate-800/50 transition-colors"
              onClick={() => toggleSection('theme')}
            >
              <div className="flex items-center gap-4">
                <Palette className="h-8 w-8 text-amber-500" />
                <div>
                  <CardTitle className="text-slate-100">Design et Couleurs</CardTitle>
                  <CardDescription className="text-slate-400 mt-1">Personnalisez l'apparence visuelle du site</CardDescription>
                </div>
              </div>
              <div className="text-slate-500">
                {expandedSections.theme ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
              </div>
            </div>
            
            {expandedSections.theme && (
              <CardContent className="space-y-6 pt-0 border-t border-slate-800 pt-6 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {themeFields.map((field) => (
                    <div key={field.key} className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-slate-200">{field.label}</Label>
                        {!editMode[field.key] ? (
                          <Button onClick={() => toggleEdit(field.key)} variant="ghost" size="sm" className="text-amber-500 hover:text-amber-400 hover:bg-slate-800"><Edit2 className="h-4 w-4" /></Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button onClick={() => handleSaveTheme(field.key)} size="sm" className="bg-amber-500 text-slate-950 hover:bg-amber-400"><Save className="h-4 w-4" /></Button>
                            <Button onClick={() => handleCancelTheme(field.key)} variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800"><X className="h-4 w-4" /></Button>
                          </div>
                        )}
                      </div>
                      
                      {editMode[field.key] ? (
                        <div className="flex items-center gap-4">
                          <input type="color" value={editValues[field.key] || '#000000'} onChange={(e) => setEditValues(prev => ({ ...prev, [field.key]: e.target.value }))} className="w-16 h-12 p-1 bg-slate-800 border border-slate-700 rounded cursor-pointer" />
                          <span className="text-slate-400 font-mono uppercase">{editValues[field.key] || '#000000'}</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg border shadow-sm" style={{ backgroundColor: themeSettings?.[field.key] || 'transparent', borderColor: 'rgba(255,255,255,0.1)' }}></div>
                            <p className="text-slate-300 font-mono uppercase">{themeSettings?.[field.key] || 'Par défaut'}</p>
                          </div>
                          
                          {/* 🟢 Le bouton de restauration de couleur s'affiche ici si une ancienne couleur existe */}
                          {themeSettings?.[`prev_${field.key}`] && (
                            <Button 
                              onClick={() => handleRestoreTheme(field.key)} 
                              variant="ghost" 
                              size="sm" 
                              className="text-amber-500 hover:text-amber-400 hover:bg-slate-800 flex items-center gap-2"
                              title="Annuler le dernier changement"
                            >
                              <Undo className="h-4 w-4" />
                              <span className="hidden sm:inline font-mono text-xs">{themeSettings[`prev_${field.key}`]}</span>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* ACCORDÉONS : SERVICES & HIGHLIGHTS */}
          {renderStandardList("Gestion des Services", "Ces éléments s'affichent sous forme de grandes cartes", "services", services, "services")}
          {renderStandardList("Points Forts", "Ces éléments s'affichent au-dessus des avis", "highlights", highlights, "highlights")}

          {/* ACCORDÉON : AVIS CLIENTS */}
          <Card className="bg-slate-900 border-slate-800 mb-6 overflow-hidden">
            <div 
              className="flex flex-row items-center justify-between p-6 cursor-pointer hover:bg-slate-800/50 transition-colors"
              onClick={() => toggleSection('reviews')}
            >
              <div>
                <CardTitle className="text-slate-100">Avis Clients</CardTitle>
                <CardDescription className="text-slate-400 mt-1">Gérez les avis qui défilent sur la page d'accueil</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Button onClick={(e) => handleAddItem(e, 'reviews')} size="sm" className="bg-amber-500 text-slate-950 hover:bg-amber-400 z-10 relative">
                  <Plus className="h-4 w-4 mr-1" /> Ajouter
                </Button>
                <div className="text-slate-500">
                  {expandedSections.reviews ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                </div>
              </div>
            </div>
            
            {expandedSections.reviews && (
              <CardContent className="space-y-4 pt-0">
                <div className="border-t border-slate-800 pt-6">
                  {reviews.map((review) => (
                    <div key={review.id} className={`p-4 bg-slate-800/50 rounded-lg border relative group mb-4 transition-all ${review.visible === false ? 'border-slate-800 opacity-60' : 'border-slate-700'}`}>
                      
                      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all">
                        <Button onClick={() => handleToggleVisibility('reviews', review)} variant="ghost" size="icon" className={`${review.visible === false ? 'text-slate-500 hover:text-slate-300' : 'text-amber-500 hover:text-amber-400'} hover:bg-slate-700/50`} title={review.visible === false ? "Afficher" : "Masquer"}>
                          {review.visible === false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button onClick={() => handleDeleteItem('reviews', review.id)} variant="ghost" size="icon" className="text-red-400 hover:bg-red-400/20" title="Supprimer">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 pr-20">
                        <div>
                          <Label className="text-slate-400 text-xs mb-1 block">Auteur</Label>
                          <Input value={review.author} onChange={(e) => handleLocalChange('reviews', review.id, 'author', e.target.value)} onBlur={(e) => handleSaveItemDB('reviews', review.id, 'author', e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100 h-9" />
                        </div>
                        <div>
                          <Label className="text-slate-400 text-xs mb-1 block">Note (sur 5)</Label>
                          <Input type="number" min="1" max="5" value={review.rating} onChange={(e) => handleLocalChange('reviews', review.id, 'rating', parseInt(e.target.value) || 5)} onBlur={(e) => handleSaveItemDB('reviews', review.id, 'rating', parseInt(e.target.value) || 5)} className="bg-slate-900 border-slate-700 text-slate-100 h-9" />
                        </div>
                        <div>
                          <Label className="text-slate-400 text-xs mb-1 block">Date (AAAA-MM-JJ)</Label>
                          <Input value={review.date} onChange={(e) => handleLocalChange('reviews', review.id, 'date', e.target.value)} onBlur={(e) => handleSaveItemDB('reviews', review.id, 'date', e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100 h-9" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-slate-400 text-xs mb-1 block">Commentaire</Label>
                        <Textarea value={review.text} onChange={(e) => handleLocalChange('reviews', review.id, 'text', e.target.value)} onBlur={(e) => handleSaveItemDB('reviews', review.id, 'text', e.target.value)} className="bg-slate-900 border-slate-700 text-slate-100" rows={3} />
                      </div>
                    </div>
                  ))}
                  {reviews.length === 0 && <p className="text-slate-500 italic text-center py-4">Aucun avis enregistré.</p>}
                </div>
              </CardContent>
            )}
          </Card>

        </main>
      </div>
    </>
  );
};

export default AdminDashboard;