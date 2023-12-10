import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  margin:'2%',
  border:'2px solid black',
  width: '50vw',
  height: '50vh',
};
const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDHzobelxj6hZ2p8gwxk3jpAkTRcXJfVYU',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div >
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default Map;