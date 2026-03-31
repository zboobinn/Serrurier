import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Camera, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import SuccessMessage from '@/components/SuccessMessage.jsx';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';
import { supabase } from '@/lib/supabaseClient';

const ContactSection = () => {
  const { businessInfo } = useBusinessInfo();
  // 🟢 AJOUT : Le champ téléphone dans le state
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', need: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Nettoyage du numéro de téléphone pour le lien WhatsApp
  const rawPhone = businessInfo?.phone ?? '06 68 67 65 65';
  const cleanPhone = rawPhone.replace(/\s/g, '');
  const whatsappPhone = cleanPhone.startsWith('0') ? `33${cleanPhone.slice(1)}` : cleanPhone;
  const whatsappMsg = encodeURIComponent("Bonjour, j'aimerais avoir un avis/devis pour ma serrure. Voici une photo :");
  const whatsappLink = `https://wa.me/${whatsappPhone}?text=${whatsappMsg}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess(false);
    
    try {
      // 🟢 AJOUT : On inclut le téléphone dans le corps du message pour Supabase
      const finalData = {
        name: formData.name,
        email: formData.email,
        message: `[Besoin : ${formData.need}]\n[Téléphone : ${formData.phone}]\n\n${formData.message}`
      };

      const { error: supabaseError } = await supabase.from('contact_messages').insert([finalData]);
      if (supabaseError) throw supabaseError;

      setSuccess(true);
      setFormData({ name: '', phone: '', email: '', need: '', message: '' });
    } catch (err) { 
      setError('Erreur lors de l\'envoi du message. Veuillez nous appeler directement.'); 
    } 
    finally { setLoading(false); }
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Besoin d'une intervention ?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Remplissez ce formulaire ou appelez-nous directement. Pour un devis plus précis, n'hésitez pas à nous envoyer une photo sur WhatsApp.
          </p>
        </div>

        {/* 🟢 Mise en page sur 2 colonnes pour les écrans larges */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* COLONNE GAUCHE : Le formulaire (prend 3 colonnes sur 5) */}
          <div className="lg:col-span-3" data-aos="fade-right">
            <Card className="bg-slate-950 border-slate-800 shadow-xl">
              <CardContent className="p-6 md:p-8">
                {success ? <SuccessMessage message="Message envoyé avec succès. Nous vous rappelons très vite." /> : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Votre Nom *</label>
                        <Input placeholder="Jean Dupont" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="bg-slate-900 border-slate-700 text-slate-100 focus-visible:ring-amber-500" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Votre Téléphone *</label>
                        {/* 🟢 Nouveau champ téléphone indispensable ! */}
                        <Input type="tel" placeholder="06 12 34 56 78" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required className="bg-slate-900 border-slate-700 text-slate-100 focus-visible:ring-amber-500" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Votre Email</label>
                      <Input type="email" placeholder="jean@exemple.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-slate-900 border-slate-700 text-slate-100 focus-visible:ring-amber-500" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Type de demande *</label>
                      <select
                        value={formData.need}
                        onChange={(e) => setFormData({...formData, need: e.target.value})}
                        required
                        className="flex h-10 w-full rounded-md bg-slate-900 border border-slate-700 text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="" disabled>Sélectionnez une option...</option>
                        <option value="Urgence (Porte bloquée / Effraction)">🚨 Urgence (Porte bloquée / Effraction)</option>
                        <option value="Projet d'installation">🚪 Projet d'installation (Porte/Serrure)</option>
                        <option value="Réparation / Dépannage">🔧 Réparation / Dépannage</option>
                        <option value="Demande de devis">📝 Demande de devis</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Détails de votre demande *</label>
                      <Textarea placeholder="Expliquez-nous votre problème..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required rows={5} className="bg-slate-900 border-slate-700 text-slate-100 focus-visible:ring-amber-500 resize-none" />
                    </div>

                    {error && <p className="text-red-400 text-sm bg-red-900/20 p-3 rounded-md border border-red-900/50">{error}</p>}
                    
                    <Button type="submit" disabled={loading} className="w-full bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold text-lg h-12 transition-all active:scale-[0.98]">
                      {loading ? 'Envoi en cours...' : 'Envoyer ma demande'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* COLONNE DROITE : Les cartes de contact direct (prend 2 colonnes sur 5) */}
          <div className="lg:col-span-2 space-y-6" data-aos="fade-left">
            
            {/* 🟢 Le nouveau bouton d'action WhatsApp avec un style unique */}
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#25D366]/20 to-[#128C7E]/20 border border-[#25D366]/30 rounded-2xl hover:bg-[#25D366]/30 transition-all duration-300 group text-center"
            >
              <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#25D366]/20">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Devis Rapide par Photo</h3>
              <p className="text-slate-300 text-sm flex items-center justify-center gap-2">
                <Camera className="w-4 h-4" /> Envoyez nous une photo sur WhatsApp
              </p>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <a href={`tel:${cleanPhone}`} className="flex items-center gap-5 p-6 bg-slate-950 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-colors group">
                <div className="p-3 bg-slate-900 rounded-lg group-hover:bg-amber-500/10 transition-colors">
                  <Phone className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400 mb-1">Assistance 24/7</p>
                  <p className="text-lg font-bold text-slate-100">{rawPhone}</p>
                </div>
              </a>

              <a href={`mailto:${businessInfo?.email ?? 'serrurerieroland@orange.fr'}`} className="flex items-center gap-5 p-6 bg-slate-950 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-colors group">
                <div className="p-3 bg-slate-900 rounded-lg group-hover:bg-amber-500/10 transition-colors">
                  <Mail className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400 mb-1">Email</p>
                  <p className="text-base font-bold text-slate-100 break-all">{businessInfo?.email ?? 'serrurerieroland@orange.fr'}</p>
                </div>
              </a>
            </div>

            {/* Petit bloc de réassurance */}
            <div className="flex items-center justify-center gap-3 p-4 bg-slate-900 border border-slate-800 rounded-xl mt-6">
              <Clock className="w-5 h-5 text-amber-500" />
              <span className="text-slate-300 text-sm font-medium">Intervention en moins de 30 minutes sur le Grand Lyon</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;