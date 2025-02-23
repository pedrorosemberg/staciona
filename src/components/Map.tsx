
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { MOCK_PARKING_SPOTS } from '../constants/parkingSpots';
import { useMapInitialization } from '../hooks/useMapInitialization';
import { SearchInput } from './map/SearchInput';
import { createParkingMarker } from './map/ParkingMarker';
import { MapWrapper } from './map/MapWrapper';
import { ParkingSpot } from '../types/map';

interface MapProps {
  onSpotSelect: (spot: ParkingSpot) => void;
}

export function Map({ onSpotSelect }: MapProps) {
  const [useGoogleMaps, setUseGoogleMaps] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<Array<google.maps.marker.AdvancedMarkerElement>>([]);
  const infoWindowsRef = useRef<Array<google.maps.InfoWindow>>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const { userLocation, initializeLoader } = useMapInitialization();

  useEffect(() => {
    const initializeGoogleMaps = async () => {
      try {
        const loader = initializeLoader();
        const { Map } = await loader.importLibrary('maps');
        const { Autocomplete } = await loader.importLibrary('places');
        
        if (!mapRef.current) return;

        const mapInstance = new Map(mapRef.current, {
          center: userLocation || { lat: -19.916681, lng: -43.934493 },
          zoom: 14,
          mapId: 'staciona_map'
        });

        if (searchInputRef.current) {
          const autocomplete = new Autocomplete(searchInputRef.current, {
            fields: ['formatted_address', 'geometry'],
            bounds: {
              north: -19.8,
              south: -20.0,
              east: -43.8,
              west: -44.0,
            },
            strictBounds: true
          });

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry?.location) {
              const location = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              };
              mapInstance.setCenter(location);
              mapInstance.setZoom(17);
            }
          });
        }

        setMap(mapInstance);
        setMapLoaded(true);

      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setUseGoogleMaps(false);
        toast.error('Erro ao carregar o Google Maps. Usando mapa alternativo.');
      }
    };

    if (useGoogleMaps) {
      initializeGoogleMaps();
    }

    return () => {
      if (markersRef.current) {
        markersRef.current.forEach(marker => {
          if (marker && marker.map) {
            marker.map = null;
          }
        });
        markersRef.current = [];
      }
      if (infoWindowsRef.current) {
        infoWindowsRef.current.forEach(window => window.close());
        infoWindowsRef.current = [];
      }
    };
  }, [userLocation, initializeLoader]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <SearchInput
          ref={searchInputRef}
          className="flex-1 px-4 py-2 border rounded-lg text-gray-900"
        />
      </div>
      {useGoogleMaps ? (
        <div className="h-[400px] w-full rounded-lg overflow-hidden" ref={mapRef}>
          <div className="h-full w-full flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">Carregando mapa...</p>
          </div>
        </div>
      ) : (
        <MapWrapper spots={MOCK_PARKING_SPOTS} onSpotSelect={onSpotSelect} />
      )}
    </div>
  );
}
