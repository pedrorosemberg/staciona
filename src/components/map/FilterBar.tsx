
import { Star } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  selectedArea: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  onSearchChange: (value: string) => void;
  onAreaChange: (value: string) => void;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onRatingChange: (value: number) => void;
}

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

export function FilterBar({
  searchTerm,
  selectedArea,
  minPrice,
  maxPrice,
  minRating,
  onSearchChange,
  onAreaChange,
  onMinPriceChange,
  onMaxPriceChange,
  onRatingChange
}: FilterBarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <input
        type="text"
        placeholder="Buscar por nome ou endereço..."
        className="w-full px-4 py-2 border rounded-lg"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      
      <select
        className="w-full px-4 py-2 border rounded-lg"
        value={selectedArea}
        onChange={(e) => onAreaChange(e.target.value)}
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
          onChange={(e) => onMinPriceChange(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Preço máx"
          className="w-full px-4 py-2 border rounded-lg"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
        />
      </div>

      <select
        className="w-full px-4 py-2 border rounded-lg"
        value={minRating}
        onChange={(e) => onRatingChange(Number(e.target.value))}
      >
        <option value={0}>Todas as avaliações</option>
        <option value={3}>3+ estrelas</option>
        <option value={4}>4+ estrelas</option>
        <option value={4.5}>4.5+ estrelas</option>
      </select>
    </div>
  );
}
