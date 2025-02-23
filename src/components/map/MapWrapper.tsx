
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ParkingSpot } from '@/types/map';
import { Star } from 'lucide-react';

interface MapWrapperProps {
  spots: ParkingSpot[];
  onSpotSelect: (spot: ParkingSpot) => void;
}

// Ícone personalizado para os marcadores
const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
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

  const defaultCenter: [number, number] = [-19.916681, -43.934493];
  const defaultBounds: [[number, number], [number, number]] = [
    [-20.1252, -44.2008], // Southwest corner
    [-19.6683, -43.8054]  // Northeast corner
  ];

  // Filtragem e ordenação das vagas
  const filteredSpots = spots.filter(spot => {
    const matchesSearch = spot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spot.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = !selectedArea || spot.area === selectedArea;
    const matchesPrice = spot.price >= minPrice && spot.price <= maxPrice;
    const matchesRating = spot.rating >= minRating;

    return matchesSearch && matchesArea && matchesPrice && matchesRating;
  });

  // Ordenação por área (áreas premium primeiro) e depois por avaliação
  const sortedSpots = [...filteredSpots].sort((a, b) => {
    const areaIndexA = PREMIUM_AREAS.indexOf(a.area);
    const areaIndexB = PREMIUM_AREAS.indexOf(b.area);
    
    if (areaIndexA === areaIndexB) {
      return b.rating - a.rating;
    }
    return areaIndexA - areaIndexB;
  });

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
          bounds={defaultBounds}
          center={defaultCenter}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {sortedSpots.map((spot, index) => (
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
                !spot.available ? 'opacity-60' : ''
              }`}
              onClick={() => onSpotSelect(spot)}
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
    </div>
  );
}
