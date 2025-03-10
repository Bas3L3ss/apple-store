import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import ReactDOM from "react-dom/client";

const LeafletMap = ({
  coordinates,
  onPositionChange,
}: {
  coordinates: { lat: number; lng: number };
  onPositionChange: (coords: { lat: number; lng: number }) => void;
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const customMarkerRef = useRef<L.DivIcon | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!leafletMapRef.current && mapRef.current) {
      // Create custom marker
      const customMarkerElement = document.createElement("div");

      // Create React root and render MapPin into it
      const root = ReactDOM.createRoot(customMarkerElement);
      root.render(
        <div className="relative flex items-center justify-center">
          <MapPin size={36} color="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
          <div className="absolute bottom-0 w-0.5 h-5 bg-blue-500 transform translate-y-3"></div>
        </div>
      );

      // Create Leaflet divIcon with the React-rendered element
      customMarkerRef.current = L.divIcon({
        html: customMarkerElement,
        className: "custom-map-marker",
        iconSize: [36, 42],
        iconAnchor: [18, 42],
      });

      // Initialize the map
      leafletMapRef.current = L.map(mapRef.current).setView(
        [coordinates.lat, coordinates.lng],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMapRef.current);

      // Add custom marker
      markerRef.current = L.marker([coordinates.lat, coordinates.lng], {
        icon: customMarkerRef.current,
        draggable: true,
      }).addTo(leafletMapRef.current);

      // Handle marker drag events
      markerRef.current.on("dragend", function (event) {
        const marker = event.target;
        const position = marker.getLatLng();

        // Update coordinates in the form
        onPositionChange({
          lat: position.lat,
          lng: position.lng,
        });
      });

      // Handle map click to reposition marker
      leafletMapRef.current.on("click", function (e) {
        const { lat, lng } = e.latlng;

        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        }

        // Update coordinates in the form
        onPositionChange({
          lat: lat,
          lng: lng,
        });
      });
    }

    // Cleanup function
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Update marker position if coordinates change from parent
  useEffect(() => {
    if (leafletMapRef.current && markerRef.current) {
      // Only update if the map exists and coordinates have changed
      markerRef.current.setLatLng([coordinates.lat, coordinates.lng]);
      leafletMapRef.current.setView([coordinates.lat, coordinates.lng], 15);
    }
  }, [coordinates]);

  return <div ref={mapRef} className="h-full w-full z-10" />;
};

export default LeafletMap;
