
export interface ParkingSpot {
  position: google.maps.LatLngLiteral;
  title: string;
  price: number;
  available: boolean;
  address: string;
}

export interface ReservationInfo {
  spot: ParkingSpot | null;
  date: Date | null;
  time: string | null;
  includeInsurance: boolean;
}
