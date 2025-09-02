// components/LeafletMap.js

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import customMarkerIcon from '../../assets/map/marker-icon.png';

import L from "leaflet";

const LeafletMap = ({ center, outCordinate, zoom }) => {
  const mapRef = useRef(null);


  // const customIcon = L.icon({
  //   iconUrl: customMarkerIcon,
  //   iconSize: [32, 32],
  // });

  var customIcon = L.icon({
    iconUrl: customMarkerIcon.src,
    
});
  


  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      map.leafletElement.invalidateSize(); // Ensure map is resized after component mount
    }
  }, []);

  // L.marker(center, { icon: customIcon }).addTo(map);

  return (
    <div style={{ height: '100%'}}>
    <MapContainer center={center} zoom={13} scrollWheelZoom={false}  style={{ height: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center} icon={customIcon}>
        <Popup>
          A
        </Popup>
      </Marker>

      {outCordinate && 
      <Marker position={outCordinate} icon={customIcon}>
        <Popup>
          B
        </Popup>
      </Marker>
      }
    </MapContainer>
    </div>
  );
};

export default LeafletMap;
