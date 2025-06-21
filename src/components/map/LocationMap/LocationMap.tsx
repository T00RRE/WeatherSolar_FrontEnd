import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix dla ikon markerów Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface LocationMapProps {
    onLocationSelect: (lat: number, lng: number) => void;
    initialPosition?: [number, number];
    className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
    onLocationSelect, 
    initialPosition = [52.237049, 21.017532],
    className = "h-[400px] w-full rounded-lg overflow-hidden shadow-md mb-6" 
}) => {
    const [position, setPosition] = useState<[number, number]>(initialPosition);

    const LocationMarker = () => {
        const map = useMapEvents({
            click(e) {
                const newPosition: [number, number] = [e.latlng.lat, e.latlng.lng];
                setPosition(newPosition);
                onLocationSelect(e.latlng.lat, e.latlng.lng);
            },
        });

        // Aktualizuj widok mapy gdy pozycja się zmieni
        React.useEffect(() => {
            map.setView(position, map.getZoom());
        }, [position, map]);

        return position ? <Marker position={position} /> : null;
    };

    // Aktualizuj pozycję gdy zmieni się initialPosition
    React.useEffect(() => {
        setPosition(initialPosition);
    }, [initialPosition]);

    return (
        <div className={className}>
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                key={`${position[0]}-${position[1]}`}
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