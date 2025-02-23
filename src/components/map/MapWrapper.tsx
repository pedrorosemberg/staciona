
import { useState } from 'react';
import { ParkingSpot } from '@/types/map';
import { toast } from 'sonner';
import { FilterBar } from './FilterBar';
import { ParkingMap } from './ParkingMap';
import { SpotList } from './SpotList';

interface MapWrapperProps {
  spots: ParkingSpot[];
  onSpotSelect: (spot: ParkingSpot) => void;
}

// Áreas nobres de BH em ordem de prioridade
const PREMIUM_AREAS = [
  'Savassi',
  'Lourdes',
  'Funcionários',
  'Sion',
  'Santo Agostinho',
  'Belvedere',
  'Serra',
  'Cidade Jardim',
  'Mangabeiras',
  'Centro'
];

export function MapWrapper({ spots, onSpotSelect }: MapWrapperProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  // Filtragem e ordenação das vagas
  const filteredSpots = spots.filter(spot => {
    const matchesSearch = spot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spot.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = !selectedArea || spot.area === selectedArea;
    const matchesPrice = spot.price >= minPrice && spot.price <= maxPrice;
    const matchesRating = spot.rating >= minRating;

    return matchesSearch && matchesArea && matchesPrice && matchesRating;
  });

  // Ordenação priorizando vagas disponíveis, depois por área premium e avaliação
  const sortedSpots = [...filteredSpots].sort((a, b) => {
    if (a.available !== b.available) {
      return b.available ? 1 : -1;
    }
    const areaIndexA = PREMIUM_AREAS.indexOf(a.area);
    const areaIndexB = PREMIUM_AREAS.indexOf(b.area);
    
    if (areaIndexA === areaIndexB) {
      return b.rating - a.rating;
    }
    return areaIndexA - areaIndexB;
  });

  const handleSpotSelect = (spot: ParkingSpot) => {
    if (!spot.available) {
      toast.error('Esta vaga não está disponível no momento.');
      return;
    }
    setSelectedSpot(spot);
    onSpotSelect(spot);
  };

  const handleProceed = () => {
    if (!selectedSpot) return;
    document.getElementById('reservar-tab')?.click();
  };

  return (
    <div className="space-y-4">
      <FilterBar
        searchTerm={searchTerm}
        selectedArea={selectedArea}
        minPrice={minPrice}
        maxPrice={maxPrice}
        minRating={minRating}
        onSearchChange={setSearchTerm}
        onAreaChange={setSelectedArea}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onRatingChange={setMinRating}
      />

      <ParkingMap
        spots={sortedSpots}
        selectedSpot={selectedSpot}
        onSpotSelect={handleSpotSelect}
      />

      <SpotList
        spots={sortedSpots}
        selectedSpot={selectedSpot}
        onSpotSelect={handleSpotSelect}
      />

      <button
        onClick={handleProceed}
        disabled={!selectedSpot?.available}
        className={`w-full py-3 rounded-lg transition-colors ${
          selectedSpot?.available
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Prosseguir para Reserva
      </button>
    </div>
  );
}
