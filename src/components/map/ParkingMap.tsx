
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ParkingSpot } from '@/types/map';
import { Star } from 'lucide-react';

interface ParkingMapProps {
  spots: ParkingSpot[];
  selectedSpot: ParkingSpot | null;
  onSpotSelect: (spot: ParkingSpot) => void;
}

const normalIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const selectedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

export function ParkingMap({ spots, selectedSpot, onSpotSelect }: ParkingMapProps) {
  const defaultCenter: LatLngExpression = [-19.916681, -43.934493];

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {spots.map((spot, index) => {
          const position: LatLngExpression = [spot.position.lat, spot.position.lng];
          return (
            <Marker
              key={index}
              position={position}
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
