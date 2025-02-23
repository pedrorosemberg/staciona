import { ParkingSpot } from "../types/map";
import { ADDITIONAL_PARKING_SPOTS } from "../utils/generateParkingSpots";

const INITIAL_PARKING_SPOTS: ParkingSpot[] = [
  // Centro
  {
    position: { lat: -19.917299, lng: -43.934559 },
    title: "Estacionamento Centro",
    price: 15,
    address: "Rua Rio de Janeiro, 471 - Centro, Belo Horizonte - MG",
    available: true
  },
  {
    position: { lat: -19.916123, lng: -43.936789 },
    title: "Parking Savassi",
    price: 20,
    address: "Rua Pernambuco, 1234 - Savassi, Belo Horizonte - MG",
    available: false
  },
  {
    position: { lat: -19.918456, lng: -43.933234 },
    title: "AutoPark Barro Preto",
    price: 12,
    address: "Rua Ouro Preto, 1376 - Barro Preto, Belo Horizonte - MG",
    available: true
  },
  // Região Hospitalar
  {
    position: { lat: -19.915678, lng: -43.932111 },
    title: "Hospital Life Park",
    price: 18,
    address: "Rua da Bahia, 1149 - Centro, Belo Horizonte - MG",
    available: false
  },
  {
    position: { lat: -19.914890, lng: -43.933456 },
    title: "Medical Center Parking",
    price: 22,
    address: "Av. Álvares Cabral, 229 - Centro, Belo Horizonte - MG",
    available: true
  },
  // Savassi
  {
    position: { lat: -19.935678, lng: -43.932567 },
    title: "Savassi Square Park",
    price: 25,
    address: "Praça da Savassi, Belo Horizonte - MG",
    available: true
  },
  {
    position: { lat: -19.934567, lng: -43.931789 },
    title: "Diamond Mall Park",
    price: 30,
    address: "Av. Olegário Maciel, 1600 - Lourdes, Belo Horizonte - MG",
    available: false
  },
  // Lourdes
  {
    position: { lat: -19.932345, lng: -43.935678 },
    title: "Lourdes Premium",
    price: 28,
    address: "Rua da Bahia, 2020 - Lourdes, Belo Horizonte - MG",
    available: true
  },
  {
    position: { lat: -19.931234, lng: -43.936789 },
    title: "Park Lourdes",
    price: 25,
    address: "Rua Gonçalves Dias, 2222 - Lourdes, Belo Horizonte - MG",
    available: false
  },
  // Funcionários
  {
    position: { lat: -19.933456, lng: -43.937890 },
    title: "Funcionários Park",
    price: 22,
    address: "Rua dos Inconfidentes, 801 - Funcionários, Belo Horizonte - MG",
    available: true
  },
  {
    position: { lat: -19.934567, lng: -43.938901 },
    title: "Office Park Premium",
    price: 24,
    address: "Av. Getúlio Vargas, 1492 - Funcionários, Belo Horizonte - MG",
    available: false
  },
  // Santo Agostinho
  {
    position: { lat: -19.935678, lng: -43.939012 },
    title: "Santo Agostinho Park",
    price: 20,
    address: "Rua Aimorés, 2001 - Santo Agostinho, Belo Horizonte - MG",
    available: true
  },
  {
    position: { lat: -19.936789, lng: -43.940123 },
    title: "Business Center Park",
    price: 26,
    address: "Av. Barbacena, 472 - Santo Agostinho, Belo Horizonte - MG",
    available: false
  },
  // Região da Praça da Liberdade
  {
    position: { lat: -19.937890, lng: -43.941234 },
    title: "Liberdade Park",
    price: 18,
    address: "Rua Gonçalves Dias, 3100 - Santo Agostinho, Belo Horizonte - MG",
    available: true
  },
  {
    position: { lat: -19.938901, lng: -43.942345 },
    title: "Cultural Center Park",
    price: 15,
    address: "Praça da Liberdade, Belo Horizonte - MG",
    available: false
  }
];

export const MOCK_PARKING_SPOTS: ParkingSpot[] = [
  ...INITIAL_PARKING_SPOTS,
  ...ADDITIONAL_PARKING_SPOTS
];
