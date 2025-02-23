
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ParkingSpot } from '@/types/map';
import { Star } from 'lucide-react';

interface ParkingMapProps {
  spots: ParkingSpot[];
  selectedSpot: ParkingSpot | null;
  onSpotSelect: (spot: ParkingSpot) => void;
}

// Componente para definir a posição e zoom do mapa
function ChangeView({ center, zoom }: { center: LatLngExpression; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

// Definindo os ícones dos marcadores corretamente usando L.icon()
const normalIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: new L.Point(25, 41),
  iconAnchor: new L.Point(12, 41),
  popupAnchor: new L.Point(1, -34),
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: new L.Point(41, 41)
});

const selectedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: new L.Point(25, 41),
  iconAnchor: new L.Point(12, 41),
  popupAnchor: new L.Point(1, -34),
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: new L.Point(41, 41)
});

export function ParkingMap({ spots, selectedSpot, onSpotSelect }: ParkingMapProps) {
  const defaultPosition: LatLngExpression = [-19.916681, -43.934493];

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border">
      <MapContainer 
        style={{ height: '100%', width: '100%' }}
      >
        <ChangeView center={defaultPosition} zoom={13} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {spots.map((spot, index) => {
          const position: LatLngExpression = [spot.position.lat, spot.position.lng];
          const markerIcon = selectedSpot?.title === spot.title ? selectedIcon : normalIcon;

          return (
            <Marker
              key={index}
              position={position}
              icon={markerIcon}
              eventHandlers={{
                click: () => onSpotSelect(spot)
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{spot.title}</h3>
                  <p>Preço: R$ {spot.price},00/h</p>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(spot.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm">({spot.rating})</span>
                  </div>
                  <p className={`text-sm ${spot.available ? 'text-green-600' : 'text-red-600'}`}>
                    {spot.available ? 'Disponível' : 'Ocupado'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{spot.address}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
