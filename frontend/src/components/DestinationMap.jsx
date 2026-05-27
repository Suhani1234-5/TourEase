import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Calculate distance between two coordinates in km
function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
}

// Custom pin creator
const createIcon = (color) =>
  L.divIcon({
    html: `<div style="
      width:14px;height:14px;
      background:${color};
      border:2px solid white;
      border-radius:50%;
      box-shadow:0 0 8px ${color}99;
    "></div>`,
    className: '',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

const bluePin = createIcon('#3b82f6');
const orangePin = createIcon('#f97316');

// Recenter map when destination changes
const RecenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const DestinationMap = ({ center, destinationName, attractions }) => {
  const defaultCenter = center || [20, 0];

  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>

      {/* Distance chips bar */}
      {center && attractions?.length > 0 && (
        <div style={{ background: '#fff', padding: '10px 14px', borderBottom: '1px solid #f3f4f6' }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
            Distances from city center
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {attractions.map((pin, i) => (
              <span key={i} style={{
                fontSize: 11,
                background: '#fff7ed',
                color: '#c2410c',
                border: '1px solid #fed7aa',
                borderRadius: 999,
                padding: '3px 10px',
              }}>
                {pin.name} — <strong>{getDistanceKm(center[0], center[1], pin.coordinates[0], pin.coordinates[1])} km</strong>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Map */}
      <div style={{ height: 350 }}>
        <MapContainer
          center={defaultCenter}
          zoom={12}
          style={{ width: '100%', height: '100%' }}
          scrollWheelZoom={false}
        >
          {/* Light mode tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <RecenterMap center={defaultCenter} />

          {/* Dashed lines from center to each attraction */}
          {center && attractions?.map((pin, i) => (
            <Polyline
              key={i}
              positions={[center, pin.coordinates]}
              pathOptions={{ color: '#f97316', weight: 1.5, dashArray: '5,5', opacity: 0.7 }}
            />
          ))}

          {/* Blue center pin */}
          {center && (
            <Marker position={center} icon={bluePin}>
              <Popup>
                <div style={{ minWidth: 140 }}>
                  <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>
                    {destinationName}
                  </p>
                  <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 6 }}>
                    City Center
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(destinationName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 11, color: '#3b82f6', display: 'block' }}
                  >
                    View on Google Maps
                  </a>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Orange attraction pins */}
          {attractions?.map((pin, i) => (
            <Marker key={i} position={pin.coordinates} icon={orangePin}>
              <Popup>
                <div style={{ minWidth: 160 }}>
                  <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>
                    {pin.name}
                  </p>
                  {center && (
                    <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 8 }}>
                      {getDistanceKm(center[0], center[1], pin.coordinates[0], pin.coordinates[1])} km from city center
                    </p>
                  )}
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(pin.name + ' ' + destinationName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 11,
                      color: '#fff',
                      background: '#f97316',
                      padding: '4px 10px',
                      borderRadius: 6,
                      display: 'inline-block',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Open in Google Maps
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}

        </MapContainer>
      </div>

      {/* Legend */}
      <div style={{
        background: '#fff',
        padding: '8px 14px',
        borderTop: '1px solid #f3f4f6',
        display: 'flex',
        gap: 16,
        fontSize: 11,
        color: '#6b7280',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{
            width: 10, height: 10, borderRadius: '50%',
            background: '#3b82f6', border: '2px solid white',
            boxShadow: '0 0 4px #3b82f688', display: 'inline-block'
          }} />
          City Center
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{
            width: 10, height: 10, borderRadius: '50%',
            background: '#f97316', border: '2px solid white',
            boxShadow: '0 0 4px #f9731688', display: 'inline-block'
          }} />
          Attractions
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 16, borderTop: '2px dashed #f97316', display: 'inline-block' }} />
          Distance line
        </div>
      </div>

    </div>
  );
};

export default DestinationMap;