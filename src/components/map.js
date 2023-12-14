import React from "react";
import LocationTable from "./locationTable.js";
import CommentList from "./comment.js";
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

class Map extends React.Component {
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
      <>
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-lg-6 col-md-12">
            <div className="card">
              <div className="card-body">
                <div style={lgcardstyle} className="card d-inline-block m-2">
                  <LocationTable handleLocationSelect={this.handleLocationSelect} loc={this.state.centeMap} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div>
              <div className="row">
                <Mapp center={this.state.centeMap} />
              </div>
              <div className="row" style={smcardstyleGp}>
                <div className="col-md-6" style={smcardstyle}>
                  <EventCard selectedLoc={this.state.selected_location} />
                </div>
                <div className="col-md-6" style={smcardstyle}>
                  <LocationCard selectedLoc={this.state.selected_location} />
                </div>
              </div>
              <div className="row">
                <div className="card">
                  <div className="card-body">Add Comment</div>
                </div>
              </div>
              <div className="row">
                <div className="card">
                  <div className="card-body">
                    Comments
                    <CommentList />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// render() {
//   return (
//       <>

//               <div className="row">
//                   <div className="col-md-6">
//                       <div className="card">
//                           <div className="card-body">
//                             <div style={mapstyle} className="card d-inline-block m-2">
//                               <Mapp center={this.state.centeMap} />
//                           </div>
//                       </div>
//                   </div>
//                   <div className="col-md-6">
//                       <div className="card">
//                           <div className="card-body">
//                             <div style={mapstyle} className="card d-inline-block m-2">
//                               <LocationTable handleLocationSelect={this.handleLocationSelect} loc={this.state.centeMap} />
//                             </div>
//                           </div>
//                       </div>
//                   </div>
//               </div>
//           </div>
//       </>
//   );
// }

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

export default Map;
