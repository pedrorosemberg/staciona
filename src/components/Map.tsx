
import { useState } from 'react';
import { MOCK_PARKING_SPOTS } from '../constants/parkingSpots';
import { MapWrapper } from './map/MapWrapper';
import { ParkingSpot } from '@/types/map';
import { toast } from 'sonner';

interface MapProps {
  onSpotSelect: (spot: ParkingSpot) => void;
}

export function Map({ onSpotSelect }: MapProps) {
  // Usando diretamente os spots mockados
  const spots = MOCK_PARKING_SPOTS;

  const handleSpotSelect = (spot: ParkingSpot) => {
    if (!spot.available) {
      toast.error('Esta vaga não está disponível no momento.');
      return;
    }
    onSpotSelect(spot);
    toast.success('Vaga selecionada com sucesso!');
  };

  return (
    <div className="w-full">
      <MapWrapper 
        spots={spots} 
        onSpotSelect={handleSpotSelect} 
      />
    </div>
  );
}
