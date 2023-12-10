import React from 'react';
import Header from '../components/header.js';
import Form from '../components/form.js';
import Map from '../components/map.js';
import CommentList from '../components/commentList.js';
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

let loc=[7.2905715,80.6337262]

class UserPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header name="User Page" userid={this.props.user}/>
                <Mapp/>{
                    center.lat++
                }
                <Form name="user Comment"/>
            </div>
        );
    }
}

const Mapp = () => {
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

export default UserPage;