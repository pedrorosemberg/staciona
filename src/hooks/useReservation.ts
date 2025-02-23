
import { create } from 'zustand';
import { ReservationInfo, ParkingSpot } from '../types/map';

interface ReservationStore {
  reservationInfo: ReservationInfo;
  setSpot: (spot: ParkingSpot) => void;
  setDate: (date: Date) => void;
  setTime: (time: string) => void;
  setEndDate: (date: Date) => void;
  setEndTime: (time: string) => void;
  setInsurance: (include: boolean) => void;
  reset: () => void;
}

export const useReservation = create<ReservationStore>((set) => ({
  reservationInfo: {
    spot: null,
    date: null,
    time: null,
    endDate: null,
    endTime: null,
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
  setEndDate: (endDate) => set((state) => ({ 
    reservationInfo: { ...state.reservationInfo, endDate } 
  })),
  setEndTime: (endTime) => set((state) => ({ 
    reservationInfo: { ...state.reservationInfo, endTime } 
  })),
  setInsurance: (includeInsurance) => set((state) => ({ 
    reservationInfo: { ...state.reservationInfo, includeInsurance } 
  })),
  reset: () => set({
    reservationInfo: {
      spot: null,
      date: null,
      time: null,
      endDate: null,
      endTime: null,
      includeInsurance: false
    }
  })
}));
