import React, { Component } from "react";
import axios from "axios";

class VenueList extends Component {
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
  handleInputChange = (e) => {
    this.setState({ filterKeyword: e.target.value });
  };

  handleFilter = () => {
    // Filter the table based on the filterKeyword
    const { venues, filterKeyword } = this.state;
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

  render() {
    const { venues, filterKeyword, sortByEvent } = this.state;

    return (
      <div>
        <div>
          <input type="text" value={filterKeyword} onChange={this.handleInputChange} placeholder="Search address by keywords" className="w-50" />
          <button onClick={this.handleFilter}>Filter</button>
          <button onClick={this.handleSort}>Sort</button>
          <button onClick={this.handleReset}>Reset</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>VenueID</th>
              <th>Address(English)</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>No. of Events</th>
            </tr>
          </thead>
          <tbody>
            {venues.map((venue) => (
              <tr key={venue.venueID}>
                <td>{venue.venueID}</td>
                <td>{venue.address}</td>
                <td>{venue.latitude}</td>
                <td>{venue.longitude}</td>
                <td>{venue.events.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default VenueList;
