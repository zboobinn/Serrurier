import React, { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import SuccessMessage from '@/components/SuccessMessage.jsx';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';
//import pb from '@/lib/pocketbaseClient';
import { supabase } from '@/lib/supabaseClient';

const ContactSection = () => {
  const { businessInfo } = useBusinessInfo();
  const [formData, setFormData] = useState({ name: '', email: '', need: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess(false);
    
    try {
      const { error: supabaseError } = await supabase
        .from('contact_messages')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            message: `[Besoin : ${formData.need}] ${formData.message}` 
          }
        ]);

      if (supabaseError) throw supabaseError;

      setSuccess(true);
      setFormData({ name: '', email: '', need: '', message: '' });
    } catch (err) {
      setError("Erreur lors de l'envoi du message.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="text-3xl font-semibold text-slate-100">Contactez-nous</h2>
        </div>
        
        <div data-aos="zoom-in-up">
          <Card className="bg-slate-950 border-slate-800">
            <CardContent className="p-8">
              {success ? <SuccessMessage message="Message envoyé avec succès." /> : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input placeholder="Nom" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="bg-slate-800 border-slate-700 text-slate-100" />
                  <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="bg-slate-800 border-slate-700 text-slate-100" />
                  
                  <select
                    value={formData.need}
                    onChange={(e) => setFormData({...formData, need: e.target.value})}
                    required
                    className="flex h-10 w-full rounded-md bg-slate-800 border border-slate-700 text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="" disabled>Quel est votre besoin ?</option>
                    <option value="Urgence (Porte bloquée / Effraction)">Urgence (Porte bloquée / Effraction)</option>
                    <option value="Projet d'installation">Projet d'installation</option>
                    <option value="Réparation / Dépannage">Réparation / Dépannage</option>
                    <option value="Demande de devis">Demande de devis</option>
                    <option value="Conseils en sécurité">Conseils en sécurité</option>
                    <option value="Autre">Autre</option>
                  </select>

                  <Textarea placeholder="Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required rows={5} className="bg-slate-800 border-slate-700 text-slate-100" />
                  {error && <p className="text-red-500">{error}</p>}
                  <Button type="submit" disabled={loading} className="w-full bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all active:scale-95">{loading ? 'Envoi...' : 'Envoyer le message'}</Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="flex items-center gap-4 p-6 bg-slate-950 rounded-xl border border-slate-800"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <Phone className="h-8 w-8 text-amber-500 flex-shrink-0" />
            <div>
              <p className="text-sm text-slate-400 mb-1">Téléphone</p>
              <a href={`tel:${(businessInfo?.phone ?? '06 68 67 65 65').replace(/\s/g, '')}`} className="text-lg font-semibold text-slate-100 hover:text-amber-500 transition-colors duration-200">
                {businessInfo?.phone ?? '06 68 67 65 65'}
              </a>
            </div>
          </div>

          <div 
            className="flex items-center gap-4 p-6 bg-slate-950 rounded-xl border border-slate-800"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <Mail className="h-8 w-8 text-amber-500 flex-shrink-0" />
            <div>
              <p className="text-sm text-slate-400 mb-1">Email</p>
              <a href={`mailto:${businessInfo?.email ?? 'serrurerieroland@orange.fr'}`} className="text-lg font-semibold text-slate-100 hover:text-amber-500 transition-colors duration-200">
                {businessInfo?.email ?? 'serrurerieroland@orange.fr'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;