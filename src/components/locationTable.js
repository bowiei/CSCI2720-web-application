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
      updated: false
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
    const { venues, filterKeyword, sortByEvent } = this.state;
    const filteredVenues = venues.filter((venue) => venue.address.toLowerCase().includes(filterKeyword.toLowerCase()));
    this.setState({ venues: filteredVenues });
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

  handleReset = () => {
    // Refetch the data again and reset the state
    this.fetchVenues();
    this.setState({
      filterKeyword: "",
      sortByEvent: 1,
    });
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

 handleFavorite = (venue) => {
    const data = {
      venueID: venue
    };

    axios.put(`http://localhost:5500/user/add/user1`, data) //need to update, replace the user1
    .then((response) => {
      if (response.status === 404 || response.status === 400) {
        console.log(response);
      } else {
        console.log("added");
        this.setState({updated:true});
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }


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
        <SearchBar
          filterKeyword={filterKeyword}
          handleInputChange={this.handleInputChange}
          handleFilter={this.handleFilter}
          handleReset={this.handleReset}
          handleSort={this.handleSort}
          placeholderText="Search location(s) by keywords"
        />
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
                  <button className="btn btn-transparent" onClick={() => this.handleLocationClick(venue.venueID)}>
                    📌
                  </button>
                      <button className = "btn btn-transparent" onClick={()=>this.handleFavorite(venue.venueID)}>⭐</button>
                </td>
                <td>{venue.events.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
       <FavoriteList updated={this.state.updated} />
      </div>
    );
  }
}

export default LocationTable;
