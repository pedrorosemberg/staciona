
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ParkingSpot } from '@/types/map';

interface MapWrapperProps {
  spots: ParkingSpot[];
  onSpotSelect: (spot: ParkingSpot) => void;
}

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
}

export function MapWrapper({ spots, onSpotSelect }: MapWrapperProps) {
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([-19.916681, -43.934493]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          console.warn('Erro ao obter localização');
        }
      );
    }
  }, []);

  return (
    <MapContainer
      center={currentPosition}
      zoom={13}
      style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}
    >
      <MapController center={currentPosition} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {spots.map((spot, index) => (
        <Marker
          key={index}
          position={[spot.position.lat, spot.position.lng]}
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
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
