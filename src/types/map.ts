
export interface ParkingSpot {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  price: number;
  available: boolean;
  address: string;
  rating: number; // 0 a 5
  area: string; // Região da cidade
}

export interface ReservationInfo {
  spot: ParkingSpot | null;
  date: Date | null;
  time: string | null;
  endDate: Date | null;
  endTime: string | null;
  includeInsurance: boolean;
}
