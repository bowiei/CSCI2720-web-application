import React from "react";
import Header from "../components/header.js";
import Form from "../components/form.js";
import LocationView from "../components/venueList.js";
import CommentList from "../components/comment.js";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapstyle = {
  display: "inline-block",
  margin: "1%",
  border: "2px solid black",
  width: "75vw",
  background: "gray",
};
const mapContainerStyle = {
  display: "inline-block",
  margin: "1%",
  border: "2px solid black",
  width: "49vw",
  height: "40vh",
};

let center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

let zoom = 20;

function chooseLocation() {}

let loc = {
  venue: "123",
  address: "111",
  event: "111",
};

class UserPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header name="User Page" user={this.props.user} />
        <div style={mapstyle} class="card d-inline-block m-2">
          <Mapp />
          <LocationView loc={loc} />
        </div>
        <Form name="user Comment" />
      </div>
    );
  }
}

const Mapp = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDHzobelxj6hZ2p8gwxk3jpAkTRcXJfVYU",
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
      <Marker position={center} onclick="chooseLocation()" />
    </GoogleMap>
  );
};

export default UserPage;
