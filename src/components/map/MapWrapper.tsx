
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ParkingSpot } from '@/types/map';
import { Star, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useReservation } from '@/hooks/useReservation';
import { toast } from 'sonner';

interface MapWrapperProps {
  spots: ParkingSpot[];
  onSpotSelect: (spot: ParkingSpot) => void;
}

// Ícones personalizados para os marcadores
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { reservationInfo, setSpot, setDate, setTime, setEndDate, setEndTime, setInsurance } = useReservation();

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
      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Buscar por nome ou endereço..."
          className="w-full px-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="w-full px-4 py-2 border rounded-lg"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <option value="">Todas as áreas</option>
          {PREMIUM_AREAS.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>

        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Preço mín"
            className="w-full px-4 py-2 border rounded-lg"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Preço máx"
            className="w-full px-4 py-2 border rounded-lg"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <select
          className="w-full px-4 py-2 border rounded-lg"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
        >
          <option value={0}>Todas as avaliações</option>
          <option value={3}>3+ estrelas</option>
          <option value={4}>4+ estrelas</option>
          <option value={4.5}>4.5+ estrelas</option>
        </select>
      </div>

      {/* Mapa */}
      <div className="h-[400px] w-full rounded-lg overflow-hidden border">
        <MapContainer
          center={[-19.916681, -43.934493]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {sortedSpots.map((spot, index) => (
            <Marker
              key={index}
              position={[spot.position.lat, spot.position.lng]}
              icon={selectedSpot?.title === spot.title ? selectedIcon : normalIcon}
              eventHandlers={{
                click: () => handleSpotSelect(spot)
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
          ))}
        </MapContainer>
      </div>

      {/* Lista de vagas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="font-semibold">Lista de Vagas por Região</h3>
          <p className="text-sm text-gray-600">
            {sortedSpots.filter(s => s.available).length} vagas disponíveis de {sortedSpots.length} total
          </p>
        </div>
        <div className="divide-y max-h-[400px] overflow-y-auto">
          {sortedSpots.map((spot, index) => (
            <div
              key={index}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedSpot?.title === spot.title ? 'bg-blue-50' : ''
              } ${!spot.available ? 'opacity-60' : ''}`}
              onClick={() => handleSpotSelect(spot)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{spot.title}</h4>
                  <p className="text-sm text-gray-600">{spot.address}</p>
                  <p className="text-xs text-gray-500">Região: {spot.area}</p>
                  <div className="flex items-center space-x-1 mt-1">
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
                </div>
                <div className="text-right">
                  <p className="font-semibold">R$ {spot.price},00/h</p>
                  <p className={`text-sm ${spot.available ? 'text-green-600' : 'text-red-600'}`}>
                    {spot.available ? 'Disponível' : 'Ocupado'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botão de prosseguir */}
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
