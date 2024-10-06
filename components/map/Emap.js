import React from 'react';
import GoogleMapReact from 'google-map-react';
// import MyGreatPlace from './my_great_place.jsx';
import {greatPlaceStyle} from './my_great_place_styles.js';
const MapMarker = ({ text }) => <div>
<div style={greatPlaceStyle}>
          {text}
       </div>
</div>;

const EMap = ({ inCordinate, outCordinate, zoom }) => {

    const defaultProps = {
        center: [parseFloat(inCordinate[0]), parseFloat(inCordinate[1])],
        zoom: zoom,
        greatPlaceCoords: {lat: parseFloat(outCordinate[0]), lng: parseFloat(outCordinate[1])}
      };


    return (
        <div style={{ height: '600px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY  }}
                center={defaultProps.center}
                zoom={defaultProps.zoom}
            >

        <MapMarker lat={parseFloat(inCordinate[0])} lng={parseFloat(inCordinate[1])} text={'A'}/>
        <MapMarker lat={parseFloat(outCordinate[0])} lng={parseFloat(outCordinate[1])} text={'B'} />

            </GoogleMapReact>
        </div>
    );
};

export default EMap;
