import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { LogOut, Edit2, Save, X, MessageSquare, Phone, Eye } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import LoadingSpinner from '@/components/LoadingSpinner.jsx';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { logout, currentAdmin } = useAuth();
  const navigate = useNavigate();
  const [businessInfo, setBusinessInfo] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [editValues, setEditValues] = useState({});
  const [stats, setStats] = useState({
    messages: 0,
    phoneClicks: 0,
    siteVisits: 0,
    siteVisitsToday: 0 // 🟢 NOUVEAU : Ajout de l'état pour aujourd'hui
  });
  const [loading, setLoading] = useState(true);

  const fetchBusinessInfo = async () => {
    try {
      const records = await pb.collection('business_info').getFullList({ $autoCancel: false });
      if (records.length > 0) {
        setBusinessInfo(records[0]);
        setEditValues(records[0]);
      }
    } catch (error) {
      console.error('Failed to fetch business info:', error);
      toast.error('Erreur lors du chargement des informations');
    }
  };

  const fetchStats = async () => {
    try {
      // 🟢 NOUVEAU : Calculer la date d'aujourd'hui à 00:00:00 pour le filtre PocketBase
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      // Format attendu par PocketBase : "YYYY-MM-DD HH:MM:SS.000Z"
      const startOfDay = today.toISOString().replace('T', ' '); 

      const [messagesRes, phoneRes, visitsRes, todayVisitsRes] = await Promise.all([
        pb.collection('contact_messages').getList(1, 1, { $autoCancel: false }),
        pb.collection('phone_clicks').getList(1, 1, { $autoCancel: false }),
        pb.collection('site_visits').getList(1, 1, { $autoCancel: false }),
        // 🟢 NOUVEAU : Requête filtrée pour ne prendre que les visites >= à ce matin
        pb.collection('site_visits').getList(1, 1, { 
          filter: `created >= "${startOfDay}"`,
          $autoCancel: false 
        })
      ]);

      setStats({
        messages: messagesRes.totalItems,
        phoneClicks: phoneRes.totalItems,
        siteVisits: visitsRes.totalItems,
        siteVisitsToday: todayVisitsRes.totalItems // 🟢 NOUVEAU : Mise à jour de l'état
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchBusinessInfo(), fetchStats()]);
      setLoading(false);
    };

    loadData();

    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleEdit = (field) => {
    setEditMode(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async (field) => {
    try {
      await pb.collection('business_info').update(businessInfo.id, {
        [field]: editValues[field]
      }, { $autoCancel: false });

      setBusinessInfo(prev => ({ ...prev, [field]: editValues[field] }));
      setEditMode(prev => ({ ...prev, [field]: false }));
      toast.success('Modifications enregistrées');
    } catch (error) {
      console.error('Failed to update:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleCancel = (field) => {
    setEditValues(prev => ({ ...prev, [field]: businessInfo[field] }));
    setEditMode(prev => ({ ...prev, [field]: false }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

const fields = [
    { key: 'address', label: 'Adresse', type: 'text' },
    { key: 'phone', label: 'Téléphone', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'opening_hours', label: 'Horaires', type: 'text' },
    { key: 'closure_message', label: 'Message de fermeture', type: 'textarea' },
    { key: 'intervention_radius', label: 'Rayon d\'intervention (en km)', type: 'number' }
  ];

  return (
    <>
      <Helmet>
        <title>Tableau de Bord Admin - Serrurerie Roland</title>
        <meta name="description" content="Tableau de bord administrateur" />
      </Helmet>

      <div className="min-h-screen bg-slate-950">
        <header className="bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-amber-500">Tableau de Bord Admin</h1>
                <p className="text-sm text-slate-400 mt-1">Bienvenue, {currentAdmin?.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-amber-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-100">Messages Reçus</CardTitle>
                  <MessageSquare className="h-5 w-5 text-amber-500" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-amber-500">{stats.messages}</p>
                <p className="text-sm text-slate-400 mt-2">Total des messages de contact</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-100">Clics Téléphone</CardTitle>
                  <Phone className="h-5 w-5 text-amber-500" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-amber-500">{stats.phoneClicks}</p>
                <p className="text-sm text-slate-400 mt-2">Nombre d'appels initiés</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-100">Visites du Site</CardTitle>
                  <Eye className="h-5 w-5 text-amber-500" />
                </div>
              </CardHeader>
              {/* 🟢 NOUVEAU : Affichage des visites du jour + total */}
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-bold text-amber-500">{stats.siteVisitsToday}</p>
                  <p className="text-sm text-amber-500/80">aujourd'hui</p>
                </div>
                <p className="text-sm text-slate-400 mt-2">Total historique : {stats.siteVisits}</p>
              </CardContent>const field
            </Card>
          </div>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100">Informations de l'Entreprise</CardTitle>
              <CardDescription className="text-slate-400">
                Gérez les informations affichées sur le site web
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-200">{field.label}</Label>
                    {!editMode[field.key] ? (
                      <Button
                        onClick={() => toggleEdit(field.key)}
                        variant="ghost"
                        size="sm"
                        className="text-amber-500 hover:text-amber-400 hover:bg-slate-800"
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleSave(field.key)}
                          size="sm"
                          className="bg-amber-500 text-slate-950 hover:bg-amber-400"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Sauvegarder
                        </Button>
                        <Button
                          onClick={() => handleCancel(field.key)}
                          variant="outline"
                          size="sm"
                          className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Annuler
                        </Button>
                      </div>
                    )}
                  </div>

                  {editMode[field.key] ? (
                    field.type === 'textarea' ? (
                      <Textarea
                        value={editValues[field.key] || ''}
                        onChange={(e) => setEditValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="bg-slate-800 border-slate-700 text-slate-100"
                        rows={3}
                      />
                    ) : (
                      <Input
                        type={field.type}
                        value={editValues[field.key] || ''}
                        onChange={(e) => setEditValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="bg-slate-800 border-slate-700 text-slate-100"
                      />
                    )
                  ) : (
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                      <p className="text-slate-300">{businessInfo?.[field.key] || 'Non défini'}</p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;