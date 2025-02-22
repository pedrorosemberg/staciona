
import { ParkingSpot } from '../../types/map';

interface ParkingMarkerProps {
  spot: ParkingSpot;
  map: google.maps.Map;
  onClick: () => void;
}

export function createParkingMarker({ spot, map, onClick }: ParkingMarkerProps) {
  const markerContent = document.createElement('div');
  markerContent.className = 'marker-content';
  markerContent.innerHTML = `
    <div class="w-6 h-6 rounded-full ${spot.available ? 'bg-green-500' : 'bg-red-500'} 
                border-2 border-white shadow-lg flex items-center justify-center">
      <span class="text-white text-xs">P</span>
    </div>
  `;

  const marker = new google.maps.marker.AdvancedMarkerElement({
    position: spot.position,
    map,
    title: spot.title,
    content: markerContent
  });

  marker.addEventListener('click', onClick);
  
  return marker;
}
