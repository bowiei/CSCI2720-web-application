import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  margin:'1%',
  border:'2px solid black',
  width: '50vw',
  height: '50vh',
};

let center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

let zoom=20;

function Mapp(zoom,center){
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
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={zoom} center={center}>
        <Marker position={center} />
      </GoogleMap>
  );
};

class Map extends React.Component{
  constructor(props) {
    super(props);
  }
  zoom(z){
    zoom=z;
  }
  center(loc){
    center.lat=loc[0];
    center.lng=loc[1];
  }
  render(){
    return(
      <div>
        <Mapp center={[20,20]} zoom='20'/>
      </div>
    )
  }
}

export default Map;