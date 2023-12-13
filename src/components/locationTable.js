import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./searchbar";
import FavoriteList from "./FavoriteList";
//User Task1
class LocationTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      filterKeyword: "",
      sortByEvent: 1,
    };
  }

  componentDidMount() {
    // Fetch venues data from the database and set it in the state
    this.fetchVenues();
  }

  fetchVenues = () => {
    axios
      .get("http://localhost:5500/venue")
      .then((response) => {
        this.setState({ venues: response.data });
      })
      .catch((error) => {
        console.error("Error fetching venues:", error);
      });
  };

  handleInputChange = (e) => {
    this.setState({ filterKeyword: e.target.value });
  };

  handleFilter = () => {
    // Filter the table based on the filterKeyword
    const { venues, filterKeyword } = this.state;
    const filteredVenues = venues.filter((venue) => venue.address.toLowerCase().includes(filterKeyword.toLowerCase()));
    this.setState({ venues: filteredVenues });
  };

  handleReset = () => {
    // Refetch the data again and reset the state
    this.fetchVenues();
    this.setState({
      filterKeyword: "",
      sortByEvent: 1,
    });
  };
  
  handleLike = (venue) => {
    const { favoritevenues } = this.state;
    const isVenueAdded = favoritevenues.some((favVenue) => favVenue === venue);

    if (!isVenueAdded) {
      const updatedFavoriteVenues = [...favoritevenues, venue];
      this.setState(
        {
          favoritevenues: updatedFavoriteVenues,
        },
        () => {
          localStorage.setItem('favoritevenues', JSON.stringify(updatedFavoriteVenues));
        }
      );
    } else {
      console.log('Venue already added');
    }
  };

  handleSort = () => {
    // Sort the table based on the sortByEvent (asc or desc)
    const { venues, sortByEvent } = this.state;
    const sortedVenues = [...venues].sort((a, b) => {
      if (sortByEvent === 1) {
        return a.events.length - b.events.length;
      } else {
        return b.events.length - a.events.length;
      }
    });
    this.setState({ venues: sortedVenues });
    this.setState({ sortByEvent: this.state.sortByEvent * -1 });
  };

  handleLocationClick = (location) => {
    // Call the handleLocationSelect method from the App component to update the selected_location state
    console.log("Selected Location ID:(locationTable.js) " + location.toString());
    this.props.handleLocationSelect(location);
  };

  render() {
    const { venues, filterKeyword } = this.state;
    // const { handleLocationSelect } = this.props;
      return (
        <div>
          <SearchBar filterKeyword={filterKeyword} handleInputChange={this.handleInputChange} 
          handleFilter={this.handleFilter} handleReset={this.handleReset}
          placeholderText="Search location(s) by keywords"/>
        <table className="table">
          <thead>
            <tr>
              {/* <th>VenueID</th> */}
              <th>Address</th>
              <th>No. of Events</th>
            </tr>
          </thead>
          <tbody>
            {venues.map((venue) => (
              <tr key={venue.venueID}>
                <td>
                  {venue.address}
                  <button className="" onClick={() => this.handleLocationClick(venue.venueID)}>
                    Click to zoom
                  </button>
                </td>
                <td>{venue.events.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
             <FavoriteList favoritevenues={this.state.favoritevenues} />
      </div>
    );
  }
}

export default LocationTable;
