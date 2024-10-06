// Map.js
import React from 'react';
import GoogleMapReact from 'google-map-react';


const MapMarker = ({ text }) => <div style={{
  color: 'white',
  background: 'red',
  padding: '10px 15px',
  display: 'inline-flex',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '100%',
  transform: 'translate(-50%, -50%)'
}}>
  {text}
</div>;

const GoogleMap = ({ center, zoom }) => {

  const CustomMarker = () => (
    <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg">
      {/* You can place any content inside the marker */}
    </div>
  );

  // const cor = {
  //   lat: 23.780496,
  //   lng: 90.4182562
  // }

  const defaultProps = {
    center: {
        lat: 0,
        lng: 0
    },
    zoom: 15
};

  return (
    <div className="w-full h-96" style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={zoom}
      >

        <MapMarker
          lat={40.7128}
          lng={-74.0060}
          text="New York City"
        />
        <MapMarker
          lat={34.0522}
          lng={-118.2437}
          text="Los Angeles"
        />

        {/* <CustomMarker
            lat={cor.lat}
            lng={cor.lng}
          /> */}
      </GoogleMapReact>
    </div>
  );
};

// Map.defaultProps = {
//   center: {
//     lat: 0,
//     lng: 0,
//   },
//   zoom: 15,
// };

export default GoogleMap;
