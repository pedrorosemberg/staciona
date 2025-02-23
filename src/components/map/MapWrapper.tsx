
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLng, LatLngBounds } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ParkingSpot } from '@/types/map';

interface MapWrapperProps {
  spots: ParkingSpot[];
  onSpotSelect: (spot: ParkingSpot) => void;
}

// Corrigindo o problema do ícone padrão do Leaflet
const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

function MapController({ center }: { center: LatLng }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
}

export function MapWrapper({ spots, onSpotSelect }: MapWrapperProps) {
  const [mapError, setMapError] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(new L.LatLng(-19.916681, -43.934493));
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition(new L.LatLng(position.coords.latitude, position.coords.longitude));
        },
        () => {
          console.warn('Erro ao obter localização');
        }
      );
    }
  }, []);

  // Define os limites da região metropolitana de BH
  const defaultBounds = new LatLngBounds(
    new L.LatLng(-20.1252, -44.2008),
    new L.LatLng(-19.6683, -43.8054)
  );

  // Filtra as vagas baseado na busca
  const filteredSpots = spots.filter(spot => 
    spot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spot.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ordena as vagas por disponibilidade e preço
  const sortedSpots = [...filteredSpots].sort((a, b) => {
    if (a.available === b.available) {
      return a.price - b.price;
    }
    return a.available ? -1 : 1;
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar por endereço ou nome do estacionamento..."
          className="w-full px-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="h-[400px] w-full rounded-lg overflow-hidden border">
        <MapContainer
          center={currentPosition}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {sortedSpots.map((spot, index) => (
            <Marker
              key={index}
              position={new L.LatLng(spot.position.lat, spot.position.lng)}
              icon={customIcon}
              eventHandlers={{
                click: () => onSpotSelect(spot)
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{spot.title}</h3>
                  <p>Preço: R$ {spot.price},00/h</p>
                  <p className={`text-sm ${spot.available ? 'text-green-600' : 'text-red-600'}`}>
                    {spot.available ? 'Disponível' : 'Ocupado'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{spot.address}</p>
                </div>
              </Popup>
            </Marker>
          ))}
          <MapController center={currentPosition} />
        </MapContainer>
      </div>

      {/* Lista de vagas como backup e alternativa ao mapa */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="font-semibold">Lista de Vagas Disponíveis</h3>
          <p className="text-sm text-gray-600">
            {sortedSpots.filter(s => s.available).length} vagas disponíveis de {spots.length} total
          </p>
        </div>
        <div className="divide-y max-h-[400px] overflow-y-auto">
          {sortedSpots.map((spot, index) => (
            <div
              key={index}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                !spot.available ? 'opacity-60' : ''
              }`}
              onClick={() => onSpotSelect(spot)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{spot.title}</h4>
                  <p className="text-sm text-gray-600">{spot.address}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">R$ {spot.price},00/h</p>
                  <p className={`text-sm ${spot.available ? 'text-green-600' : 'text-red-600'}`}>
                    {spot.available ? 'Disponível' : 'Ocupado'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
