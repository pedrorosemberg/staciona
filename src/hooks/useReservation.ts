
import { create } from 'zustand';
import { ReservationInfo } from '../types/map';

interface ReservationStore {
  reservationInfo: ReservationInfo;
  setSpot: (spot: ParkingSpot) => void;
  setDate: (date: Date) => void;
  setTime: (time: string) => void;
  setInsurance: (include: boolean) => void;
  reset: () => void;
}

export const useReservation = create<ReservationStore>((set) => ({
  reservationInfo: {
    spot: null,
    date: null,
    time: null,
    includeInsurance: false
  },
  setSpot: (spot) => set((state) => ({ 
    reservationInfo: { ...state.reservationInfo, spot } 
  })),
  setDate: (date) => set((state) => ({ 
    reservationInfo: { ...state.reservationInfo, date } 
  })),
  setTime: (time) => set((state) => ({ 
    reservationInfo: { ...state.reservationInfo, time } 
  })),
  setInsurance: (includeInsurance) => set((state) => ({ 
    reservationInfo: { ...state.reservationInfo, includeInsurance } 
  })),
  reset: () => set({
    reservationInfo: {
      spot: null,
      date: null,
      time: null,
      includeInsurance: false
    }
  })
}));
