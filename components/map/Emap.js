import React from 'react';
import GoogleMapReact from 'google-map-react';
import { greatPlaceStyle } from './my_great_place_styles.js';

const MapMarker = ({ text }) => (
  <div>
    <div style={greatPlaceStyle}>
      {text}
    </div>
  </div>
);

const EMap = ({ inCordinate, outCordinate, zoom }) => {
  const center = [
    parseFloat(inCordinate?.[0]),
    parseFloat(inCordinate?.[1]),
  ];

  const isValidCoordinate = (coord) =>
    Array.isArray(coord) &&
    coord.length === 2 &&
    !isNaN(coord[0]) &&
    !isNaN(coord[1]);

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        center={center}
        zoom={zoom}
      >
        {isValidCoordinate(inCordinate) && (
          <MapMarker
            lat={parseFloat(inCordinate[0])}
            lng={parseFloat(inCordinate[1])}
            text={'A'}
          />
        )}

        {isValidCoordinate(outCordinate) && (
          <MapMarker
            lat={parseFloat(outCordinate[0])}
            lng={parseFloat(outCordinate[1])}
            text={'B'}
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default EMap;
