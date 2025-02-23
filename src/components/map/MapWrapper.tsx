
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
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

function MapController({ center }: { center: LatLngTuple }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
}

export function MapWrapper({ spots, onSpotSelect }: MapWrapperProps) {
  const [currentPosition, setCurrentPosition] = useState<LatLngTuple>([-19.916681, -43.934493]);

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

  // Define os limites da região metropolitana de BH
  const bhBounds = L.latLngBounds(
    L.latLng(-20.1252, -44.2008), // Southwest corner
    L.latLng(-19.6683, -43.8054)  // Northeast corner
  );

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      <MapContainer
        bounds={bhBounds}
        style={{ height: '100%', width: '100%' }}
        maxBounds={bhBounds}
        maxBoundsViscosity={1.0}
      >
        <MapController center={currentPosition} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          minZoom={11}
        />
        {spots.map((spot, index) => (
          <Marker
            key={index}
            position={L.latLng(spot.position.lat, spot.position.lng)}
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
      </MapContainer>
    </div>
  );
}
