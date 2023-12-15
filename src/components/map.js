import React from "react";
import LocationTable from "./locationTable.js";
import CommentSection from "./comment.js";
import EventCard from "./eventCard.js";
import LocationCard from "./locationCard.js";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const libraries = ["places"];

const mapContainerStyle = {
  display: "inline-block",
  justifyContent: "center",
  alignItems: "center",
  border: "3px solid black",
  margin: "25px 0px 0px 0px",
  borderRadius: "5px",
  width: "100%",
  height: "40vh",
};

const lgcardstyle = {
  display: "inline-block",
  border: "2px solid black",
  width: "98%",
  borderRadius: "5px",
  background: "lightgray",
};

const smcardstyle = {
  background: "white",
  border: "2px solid black",
  margin: "4%",
  borderRadius: "5px",
  width: "42%",
  height: "auto",
};

const smcardstyleGp = {
  margin: "25px 0px 20px 5px",
  backgroundColor: "lightblue",
  borderRadius: "5px",
  width: "100%",
  border: "2px solid black",
};

let zoom = 16;

function chooseLocation() {}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      login_username: "",
      selected_location: "",
      selected_location_name: null,
      venue_details: {},
      centeMap: {
        lat: 22.302711, // default latitude
        lng: 114.177216, // default longitude
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
            selected_location_name: this.state.venue_details.address,
          });
          console.log("this.state.centeMap:", this.state.centeMap);
        });
      })
      .catch((error) => {
        console.error("Error fetching venues:", error);
      });
  };

  componentDidMount() {
    axios
      .get("http://localhost:5500/venue")
      .then((response) => {
        this.setState({ venues: response.data });
      })
      .catch((error) => {
        console.error("Error fetching venues:", error);
      });
  }

  render() {

    return (
      <>
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-lg-6 col-md-12">
            <div className="card">
              <div className="card-body">
                <div style={lgcardstyle} className="card d-inline-block m-2">
                  <LocationTable username={this.props.username} handleLocationSelect={this.handleLocationSelect} loc={this.state.centeMap} />
                </div>
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <CommentSection selectedLoc={this.state.selected_location_name} selectedLocID={this.state.selected_location} />
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div>
              <div className="row">
                <Mapp center={this.state.centeMap} venue={this.state.venues} handleLocationSelect={this.handleLocationSelect} />
              </div>
              <div className="row" style={smcardstyleGp}>
                <div className="col-md-6" style={smcardstyle}>
                  <EventCard selectedLoc={this.state.selected_location} />
                </div>
                <div className="col-md-6" style={smcardstyle}>
                  <LocationCard selectedLoc={this.state.selected_location} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const Mapp = ({ center, venue, handleLocationSelect }) => {
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
      {venue.map((element) => {
        let x = {
          lat: Number(element.latitude),
          lng: Number(element.longitude),
        };
        console.log("position", x);
        return (
          <Marker
            key={element.venueID}
            position={x}
            onclick={() => {
              console.log("clicked", element.venueID);
              handleLocationSelect(element.venueID.toString());
            }}
          />
        );
      })}
    </GoogleMap>
  );
};

export default Map;
