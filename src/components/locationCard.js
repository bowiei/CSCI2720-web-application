import React from "react";
import axios from "axios";

class LocationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            venues: [],
        };
    }

    componentDidMount() {
        this.fetchVenues();
    }

    fetchVenues = () => {
    axios
        .get(`http://localhost:5500/venue`)
        .then((response) => {
            this.setState({ venues: response.data });
        })
        .catch((error) => {
            console.error("Error fetching venues:", error);
        });
    };

    render() {
        const { venues } = this.state;
        const selectedVenue = venues.find((venue) => venue.venueID === this.props.selectedLoc);

        if (!selectedVenue) {
            return<div>No venue selected</div>;
        }

        return (
            <>
            <div>Venue Details</div>
            <br />
            <div>VenueID: {this.props.selectedLoc}</div>
            <div>Address: {selectedVenue.address}</div>
            <div>Longitude: {selectedVenue.longitude}</div>
            <div>Latitude: {selectedVenue.latitude}</div>
            <div>EventCount: {selectedVenue.events.length}</div>
            </>
        );
    }
}

export default LocationCard;