import React from "react";
import LocationTable from "../components/locationTable.js";
import CommentList from "../components/comment.js";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

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
    this.state = {
      login_username: "",
      selected_location: "",
      venue_details: {},
      centeMap: {
        lat: 7.2905715, // default latitude
        lng: 80.6337262, // default longitude
      },
    };
  }

  handleLogin = (username) => {
    this.setState({ login_username: username });
  };

  handleLocationSelect = (locationID) => {
    this.setState({ selected_location: locationID });

    console.log("selected_location:(user.js) " + locationID);
    axios
      .get(`http://localhost:5500/venue/${locationID}`)
      .then((response) => {
        this.setState({ venue_details: response.data }, () => {
          console.log("this.state.venue_details:", this.state.venue_details);
          console.log(`${parseFloat(this.state.venue_details.latitude.trim())},${parseFloat(this.state.venue_details.longitude.trim())}`);
          this.setState({
            centeMap: {
              lat: parseFloat(this.state.venue_details.latitude.trim()),
              lng: parseFloat(this.state.venue_details.longitude.trim()),
            },
          });
          console.log("this.state.centeMap:", this.state.centeMap);
        });
      })
      .catch((error) => {
        console.error("Error fetching venues:", error);
      });
  };

  componentDidMount() {
    // Perform database retrieval and update venue_details state
    // Example:
    // fetchVenueDetailsFromDatabase().then((details) => {
    //   this.setState({ venue_details: details });
    // });
  }

  render() {
    return (
      <div>
        <div style={mapstyle} className="card d-inline-block m-2">
          <Mapp center={this.state.centeMap} />
          <LocationTable handleLocationSelect={this.handleLocationSelect} loc={this.state.centeMap} />
        </div>
        {/* another form for user comment */}
        {/* <Action name="user Comment" /> */}
      </div>
    );
  }
}

const Mapp = ({ center }) => {
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
