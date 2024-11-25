// src/components/LocationMap.tsx
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

// Fix for marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface LocationMapProps {
    onLocationSelect: (lat: number, lng: number) => void;
    initialPosition?: [number, number];
}

const LocationMap = ({ onLocationSelect, initialPosition = [52.237049, 21.017532] }: LocationMapProps) => {
    const [position, setPosition] = useState<[number, number]>(initialPosition);

    function LocationMarker() {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                onLocationSelect(e.latlng.lat, e.latlng.lng);
            },
        });

        return position ? (
            <Marker position={position} />
        ) : null;
    }

    return (
        <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-md mb-6">
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </div>
    );
};

export default LocationMap;