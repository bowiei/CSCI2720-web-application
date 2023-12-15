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
      fetchList: [],
      showColumns: {
        venueID: false,
        address: true,
        latitude: false,
        longitude: false,
        numOfEvents: true,
        eventIDList: false,
      },
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

  toggleColumn(columnName) {
    this.setState((prevState) => {
      const updatedShowColumns = {
        ...prevState.showColumns,
        [columnName]: !prevState.showColumns[columnName],
      };
      return {
        showColumns: updatedShowColumns,
      };
    });
  }

  handleFavorite = (venue, name) => {
    const data = {
      venueID: venue,
    };
    // console.log(name);
    axios
      .put(`http://localhost:5500/user/add_fav/${name}`, data) //need to update, replace the user1
      .then((response) => {
        if (response.status === 404 || response.status === 400) {
          console.log(response);
        } else {
          console.log("added");
          const updatedFetchList = [...this.state.fetchList, { venue, name }];
          this.setState({ fetchList: updatedFetchList });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleLocationClick = (location) => {
    // Call the handleLocationSelect method from the App component to update the selected_location state
    console.log("Selected Location ID:(locationTable.js) " + location.toString());
    this.props.handleLocationSelect(location);
  };

  render() {
    const { venues, filterKeyword, showColumns } = this.state;
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
        <div className="column-toggle-bar">
          <label>
            <input type="checkbox" checked={showColumns.venueID} onChange={() => this.toggleColumn("venueID")} />
            VenueID
          </label>
          <label>
            <input type="checkbox" checked={showColumns.address} onChange={() => this.toggleColumn("address")} />
            Address
          </label>
          <label>
            <input type="checkbox" checked={showColumns.latitude} onChange={() => this.toggleColumn("latitude")} />
            Latitude
          </label>
          <label>
            <input type="checkbox" checked={showColumns.longitude} onChange={() => this.toggleColumn("longitude")} />
            Longitude
          </label>
          <label>
            <input type="checkbox" checked={showColumns.numOfEvents} onChange={() => this.toggleColumn("numOfEvents")} />
            No. of Events
          </label>
          <label>
            <input type="checkbox" checked={showColumns.eventIDList} onChange={() => this.toggleColumn("eventIDList")} />
            EventID List
          </label>
        </div>
        <table className="table">
          <thead>
            <tr>
              {showColumns.venueID && <th>VenueID</th>}
              {showColumns.address && <th>Address</th>}
              {showColumns.latitude && <th>Latitude</th>}
              {showColumns.longitude && <th>Longitude</th>}
              {showColumns.numOfEvents && <th>No. of Events</th>}
              {showColumns.eventIDList && <th>EventID List</th>}
            </tr>
          </thead>
          <tbody>
            {venues.map((venue) => (
              <tr key={venue.venueID}>
                {showColumns.venueID && <td>{venue.venueID}</td>}
                {showColumns.address && (
                  <td>
                    {venue.address}
                    <button className="btn btn-transparent" onClick={() => this.handleLocationClick(venue.venueID)}>
                      📌
                    </button>
                    <button className="btn btn-transparent" disabled={false} onClick={() => this.handleFavorite(venue.venueID, this.props.username)}>
                      ⭐
                    </button>
                  </td>
                )}
                {showColumns.latitude && <td>{venue.latitude}</td>}
                {showColumns.longitude && <td>{venue.longitude}</td>}
                {showColumns.numOfEvents && <td>{venue.events.length}</td>}
                {showColumns.eventIDList && <td>{venue.events.join("\n")}</td>}
              </tr>
            ))}
          </tbody>
        </table>
        <FavoriteList username={this.props.username}  fetchList={this.state.fetchList} />
      </div>
    );
  }
}

export default LocationTable;
