
import { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { toast } from 'sonner';

export function useMapInitialization() {
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
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
        }
      );
    }
  }, []);

  const initializeLoader = () => {
    return new Loader({
      apiKey: 'AIzaSyB1qSLw6QM6LjaafTz7bRLbArMGgts80lY',
      version: 'beta',
      libraries: ['places', 'marker']
    });
  };

  return {
    userLocation,
    initializeLoader
  };
}
