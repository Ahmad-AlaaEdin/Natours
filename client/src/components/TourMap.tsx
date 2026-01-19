import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Location } from "@/types/tour";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface TourMapProps {
  locations: Location[];
  tourName: string;
}

export default function TourMap({ locations, tourName }: TourMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || locations.length === 0) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        scrollWheelZoom: false,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 25,
        },
      ).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    const bounds = L.latLngBounds([]);

    locations.forEach((location, index) => {
      const [lng, lat] = location.coordinates;
      const latLng = L.latLng(lat, lng);

      const customIcon = L.divIcon({
        html: `
          <div style="
            background: linear-gradient(135deg, #428177 0%, #054239 100%);
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            font-size: 14px;
          ">${location.day || index + 1}</div>
        `,
        className: "",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18],
      });

      const marker = L.marker(latLng, { icon: customIcon }).addTo(map);

      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 200px;">
          <div style="
            background: linear-gradient(135deg, #428177 0%, #054239 100%);
            color: white;
            padding: 8px 12px;
            margin: -12px -16px 8px;
            border-radius: 4px 4px 0 0;
            font-weight: 600;
            font-size: 14px;
          ">
            ${location.day ? `Day ${location.day}` : `Stop ${index + 1}`}
          </div>
          <div style="color: #3d3a3b; line-height: 1.5;">
            <strong style="display: block; margin-bottom: 4px; color: #002623;">
              ${location.description || "Tour Location"}
            </strong>
            ${
              location.address
                ? `<div style="font-size: 13px; color: #666; display: flex; align-items: start; gap: 4px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#428177" stroke-width="2" style="margin-top: 2px; flex-shrink: 0;">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${location.address}</span>
              </div>`
                : ""
            }
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: "tour-location-popup",
      });

      bounds.extend(latLng);
    });

    if (locations.length > 1) {
      const polylinePoints = locations.map((loc) => {
        const [lng, lat] = loc.coordinates;
        return L.latLng(lat, lng);
      });

      L.polyline(polylinePoints, {
        color: "#428177",
        weight: 3,
        opacity: 0.7,
        dashArray: "10, 10",
      }).addTo(map);
    }

    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 15,
      });
    }

    return () => {};
  }, [locations, tourName]);

  if (locations.length === 0) {
    return (
      <div
        className="w-full h-[400px] rounded-lg flex items-center justify-center border"
        style={{ backgroundColor: "#edebe0", borderColor: "#b9a779" }}
      >
        <p style={{ color: "#3d3a3b", opacity: 0.7 }}>
          No location data available for this tour
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div
        ref={mapRef}
        className="w-full h-[400px] rounded-lg border shadow-md"
        style={{ borderColor: "#b9a779", zIndex: 1 }}
      />
      <style>{`
        .tour-location-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
          padding: 0;
          overflow: hidden;
        }
        .tour-location-popup .leaflet-popup-content {
          margin: 12px 16px;
          min-width: 200px;
        }
        .tour-location-popup .leaflet-popup-tip {
          background: white;
        }
      `}</style>
    </div>
  );
}
