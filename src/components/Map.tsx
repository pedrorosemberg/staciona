
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { MOCK_PARKING_SPOTS } from '../constants/parkingSpots';
import { useMapInitialization } from '../hooks/useMapInitialization';
import { SearchInput } from './map/SearchInput';
import { createParkingMarker } from './map/ParkingMarker';

export function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<Array<google.maps.marker.AdvancedMarkerElement>>([]);
  const infoWindowsRef = useRef<Array<google.maps.InfoWindow>>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const { userLocation, initializeLoader } = useMapInitialization();

  // Cleanup effect
  useEffect(() => {
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
  }, []);

  // Map initialization effect
  useEffect(() => {
    const initializeMap = async () => {
      try {
        const loader = initializeLoader();
        const { Map } = await loader.importLibrary('maps');
        const { Autocomplete } = await loader.importLibrary('places');
        
        const defaultCenter = { lat: -19.916681, lng: -43.934493 };
        
        if (!mapRef.current) return;

        const mapInstance = new Map(mapRef.current, {
          center: userLocation || defaultCenter,
          zoom: 14, // Diminuindo o zoom para mostrar mais pontos
          mapId: 'staciona_map'
        });

        // Setup autocomplete
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

        // Add markers after map is loaded
        mapInstance.addListener('tilesloaded', () => {
          if (!mapLoaded) {
            MOCK_PARKING_SPOTS.forEach(spot => {
              const infoWindow = new google.maps.InfoWindow({
                content: `
                  <div class="p-2 text-black">
                    <h3 class="font-semibold">${spot.title}</h3>
                    <p>Preço: R$ ${spot.price},00/h</p>
                    <p class="text-sm ${spot.available ? 'text-green-600' : 'text-red-600'}">
                      ${spot.available ? 'Disponível' : 'Ocupado'}
                    </p>
                  </div>
                `
              });

              const marker = createParkingMarker({
                spot,
                map: mapInstance,
                onClick: () => {
                  infoWindowsRef.current.forEach(window => window.close());
                  infoWindow.open(mapInstance, marker);
                }
              });

              markersRef.current.push(marker);
              infoWindowsRef.current.push(infoWindow);
            });
          }
        });

      } catch (error) {
        console.error('Error loading map:', error);
        toast.error('Erro ao carregar o mapa. Por favor, tente novamente mais tarde.');
      }
    };

    initializeMap();
  }, [userLocation, mapLoaded, initializeLoader]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <SearchInput
          ref={searchInputRef}
          className="flex-1 px-4 py-2 border rounded-lg text-gray-900"
        />
      </div>
      <div className="h-[400px] w-full rounded-lg overflow-hidden" ref={mapRef}>
        <div className="h-full w-full flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">Carregando mapa...</p>
        </div>
      </div>
    </div>
  );
}
