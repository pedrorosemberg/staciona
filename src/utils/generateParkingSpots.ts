
import { ParkingSpot } from "@/types/map";

function getRandomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const streetNames = [
  "Rua Padre Pedro Pinto", "Av. Cristiano Machado", "Av. Presidente Antônio Carlos",
  "Rua Padre Eustáquio", "Av. Pedro II", "Av. Nossa Senhora do Carmo",
  "Rua Rio de Janeiro", "Av. Amazonas", "Av. do Contorno",
  "Av. Raja Gabaglia", "Av. Silva Lobo", "Av. João César de Oliveira",
  "Av. João Pinheiro", "Rua dos Carijós", "Av. Afonso Pena",
  "Rua da Bahia", "Av. Brasil", "Rua dos Tupis"
];

const neighborhoods = [
  "Venda Nova", "Pampulha", "Cidade Nova",
  "Padre Eustáquio", "Carlos Prates", "Santo Agostinho",
  "Centro", "Savassi", "Lourdes",
  "Gutierrez", "Nova Suíssa", "Eldorado",
  "Funcionários", "Barro Preto", "Santa Efigênia",
  "Santa Tereza", "Santa Amélia", "Caiçara"
];

function generateRandomAddress(area: string): string {
  const street = streetNames[Math.floor(Math.random() * streetNames.length)];
  const number = Math.floor(Math.random() * 2000) + 1;
  const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
  return `${street}, ${number} - ${neighborhood}, ${area} - MG`;
}

function generateRandomSpots(count: number, availablePercentage: number): ParkingSpot[] {
  const spots: ParkingSpot[] = [];
  const areas = [
    { name: "Betim", center: { lat: -19.9668, lng: -44.2008 } },
    { name: "Contagem", center: { lat: -19.9316, lng: -44.0535 } },
    { name: "Nova Lima", center: { lat: -19.9858, lng: -43.8509 } },
    { name: "Sabará", center: { lat: -19.8895, lng: -43.8054 } },
    { name: "Santa Luzia", center: { lat: -19.7697, lng: -43.8515 } },
    { name: "Ribeirão das Neves", center: { lat: -19.7672, lng: -44.0869 } },
    { name: "Ibirité", center: { lat: -20.0252, lng: -44.0569 } },
    { name: "Vespasiano", center: { lat: -19.6883, lng: -43.9239 } }
  ];

  for (let i = 0; i < count; i++) {
    const area = areas[Math.floor(Math.random() * areas.length)];
    const isAvailable = Math.random() < availablePercentage;
    const price = Math.floor(getRandomInRange(10, 35));
    const rating = Number((getRandomInRange(3.5, 5.0)).toFixed(1));
    
    const spot: ParkingSpot = {
      position: {
        lat: getRandomInRange(area.center.lat - 0.05, area.center.lat + 0.05),
        lng: getRandomInRange(area.center.lng - 0.05, area.center.lng + 0.05)
      },
      title: `Estacionamento ${area.name} #${i + 1}`,
      price,
      available: isAvailable,
      address: generateRandomAddress(area.name),
      rating,
      area: area.name
    };
    spots.push(spot);
  }

  return spots;
}

export const ADDITIONAL_PARKING_SPOTS = generateRandomSpots(1500, 0.4);
