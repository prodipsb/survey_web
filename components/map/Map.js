// Map.js
import React from 'react';
import GoogleMapReact from 'google-map-react';

const Map = ({ center, zoom }) => {

  const CustomMarker = () => (
    <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg">
      {/* You can place any content inside the marker */}
    </div>
  );
    
  return (
    <div  className="w-full h-96">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
         <CustomMarker
            lat={center.lat}
            lng={center.lng}
          />
      </GoogleMapReact>
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 0,
    lng: 0,
  },
  zoom: 11,
};

export default Map;
