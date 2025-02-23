
import { ParkingSpot } from '@/types/map';
import { Star } from 'lucide-react';

interface SpotListProps {
  spots: ParkingSpot[];
  selectedSpot: ParkingSpot | null;
  onSpotSelect: (spot: ParkingSpot) => void;
}

export function SpotList({ spots, selectedSpot, onSpotSelect }: SpotListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h3 className="font-semibold">Lista de Vagas por Região</h3>
        <p className="text-sm text-gray-600">
          {spots.filter(s => s.available).length} vagas disponíveis de {spots.length} total
        </p>
      </div>
      <div className="divide-y max-h-[400px] overflow-y-auto">
        {spots.map((spot, index) => (
          <div
            key={index}
            onClick={() => onSpotSelect(spot)}
            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              selectedSpot?.title === spot.title ? 'bg-blue-50 border-l-4 border-blue-500' : ''
            } ${!spot.available ? 'opacity-60' : ''}`}
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
  );
}
