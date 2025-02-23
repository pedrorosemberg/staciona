
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
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

  const defaultPosition: LatLngTuple = [-19.916681, -43.934493];

  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}>
      <MapContainer
        defaultCenter={defaultPosition}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <MapController center={currentPosition} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {spots.map((spot, index) => (
          <Marker
            key={index}
            position={[spot.position.lat, spot.position.lng] as LatLngTuple}
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
    </div>
  );
}
