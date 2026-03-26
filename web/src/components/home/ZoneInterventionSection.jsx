import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import { useBusinessInfo } from '@/contexts/BusinessInfoContext.jsx';

// Correction de l'icône Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const InterventionZoneSection = () => {
  const { businessInfo } = useBusinessInfo();
  const position = [45.7640, 4.8357];
  const interventionRadius = (businessInfo?.intervention_radius || 20) * 1000;

  return (
    <section id="zone-intervention" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-100 mb-4">Zone d'Intervention</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">Intervention rapide sur Lyon et sa périphérie</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 h-[400px] md:h-[500px] shadow-xl">
            <MapContainer center={position} zoom={11} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Circle center={position} radius={interventionRadius} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.2 }} />
              <Marker position={position}><Popup>Serrurerie Roland</Popup></Marker>
            </MapContainer>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-100">Disponibilité immédiate dans le Grand Lyon</h3>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>Serrurerie Roland intervient rapidement pour toutes vos urgences et projets d'installation dans un rayon d'environ <strong>{businessInfo?.intervention_radius || 20} km</strong> autour de Lyon.</p>
              <p>Notre emplacement central et notre disponibilité 24h/24 et 7j/7 nous permettent de vous garantir un temps d'attente réduit, particulièrement lors de situations d'urgence (porte claquée, perte de clés, tentative d'effraction).</p>
            </div>
            
            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 mt-6">
              <h4 className="font-semibold text-amber-500 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" /> Communes principales desservies :
              </h4>
              <ul className="grid grid-cols-2 gap-3 text-sm text-slate-400">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></div> Lyon (tous arrondissements)</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></div> Villeurbanne</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></div> Vénissieux</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></div> Bron</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></div> Vaulx-en-Velin</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></div> Tassin-la-Demi-Lune</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterventionZoneSection;