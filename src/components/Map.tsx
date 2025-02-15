
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { toast } from 'sonner';

interface ParkingSpot {
  position: google.maps.LatLngLiteral;
  title: string;
  price: number;
  available: boolean;
}

const MOCK_PARKING_SPOTS: ParkingSpot[] = [
  {
    position: { lat: -19.917299, lng: -43.934559 },
    title: "Estacionamento Centro",
    price: 15,
    available: true
  },
  {
    position: { lat: -19.916123, lng: -43.936789 },
    title: "Parking Savassi",
    price: 20,
    available: true
  },
  {
    position: { lat: -19.918456, lng: -43.933234 },
    title: "AutoPark Barro Preto",
    price: 12,
    available: false
  }
];

export function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyB1qSLw6QM6LjaafTz7bRLbArMGgts80lY',
      version: 'weekly',
      libraries: ['places']
    });

    const initializeMap = async () => {
      try {
        const { Map } = await loader.importLibrary('maps');
        const { Autocomplete } = await loader.importLibrary('places');
        
        // Default to Belo Horizonte center
        const defaultCenter = { lat: -19.916681, lng: -43.934493 };
        
        if (mapRef.current) {
          const mapInstance = new Map(mapRef.current, {
            center: userLocation || defaultCenter,
            zoom: 15,
            styles: [
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#AF290B" }]
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#000000" }]
              }
            ]
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

          // Add markers for parking spots
          MOCK_PARKING_SPOTS.forEach(spot => {
            const marker = new google.maps.Marker({
              position: spot.position,
              map: mapInstance,
              title: spot.title,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: spot.available ? '#4CAF50' : '#FF5252',
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: '#000000',
                scale: 10
              }
            });

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

            marker.addListener('click', () => {
              infoWindow.open(mapInstance, marker);
            });
          });

          setMap(mapInstance);
        }
      } catch (error) {
        console.error('Error loading map:', error);
        toast.error('Erro ao carregar o mapa. Por favor, tente novamente mais tarde.');
      }
    };

    // Get user's location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          toast.error('Não foi possível obter sua localização.');
          initializeMap();
        }
      );
    } else {
      initializeMap();
    }

    initializeMap();
  }, [userLocation]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Digite o endereço ou local"
          className="flex-1 px-4 py-2 border rounded-lg text-gray-900"
          aria-label="Endereço para busca"
        />
      </div>
      <div className="map-container" ref={mapRef}>
        <div className="h-full w-full flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">Carregando mapa...</p>
        </div>
      </div>
    </div>
  );
}
