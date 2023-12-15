import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./searchbar";

class UserEvent extends Component {

  render() {
    const { event } = this.props;
    
    return (
      <tr>
          <>
            <td>{event.eventID}</td>
            <td>{event.title}</td>
            <td>{event.progtimee}</td>
            <td>
              {event.date.slice(-5).map((date) => (
                <tr key={date}>
                  <td>{date}</td>
                </tr>
              ))}
            </td>
            <td>{event.venue.venueID}</td>
            <td>{event.venue.address}</td>
            <td>
              {event.venue.latitude}
              <br></br>
              {event.venue.longitude}
            </td>
            <td>{event.price}</td>
            <td>{event.description}</td>
            <td>{event.presenterorge}</td>
          </>
      </tr>
    );
  }
}

export default class UserEventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      filterPrice: "",
      filterKeyword: "",
      td: ["eventID", "title", "prog time", "date", "venueID", "address", "latitude & longitude", "price", "description", "presenterorge"],
    };
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    axios
      .get("http://localhost:5500/event/")
      .then((response) => {
        this.setState({ events: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  eventListHead() {
    return this.state.td.map((currentTd) => {
      return <th>{currentTd}</th>;
    });
  }

  handleInputChange = (e) => {
    this.setState({ filterKeyword: e.target.value });
  };

  handleFilter = () => {
    // Filter the table based on the filterKeyword
    const { events, filterKeyword } = this.state;
    const filteredEvents = events.filter((event) => event.title.toLowerCase().includes(filterKeyword.toLowerCase()));
    this.setState({ events: filteredEvents });
  };

  handlePriceSearch = () => {
    const priceInput = document.getElementById("price");
    const price = parseInt(priceInput.value);
  
    if (!isNaN(price)) {
      const { events } = this.state;
      const filteredEvents = events.filter((event) => event.price < price);
      this.setState({ events: filteredEvents });
    }
  };

  handlePriceReset = () => {
    this.fetchEvents();
    const priceInput = document.getElementById("price");
    priceInput.value = "";
  };

  handleReset = () => {
    // Refetch the data again and reset the state
    this.fetchEvents();
    this.setState({
      filterKeyword: "",
    });
  };

  render() {
    const { events, filterKeyword } = this.state;

    return (
      <div style={{ overflowX: "auto", overflowY : "auto"}}>
        <h3>Event List</h3>
          <div>
            <SearchBar filterKeyword={filterKeyword} handleInputChange={this.handleInputChange} 
              handleFilter={this.handleFilter} handleReset={this.handleReset} sort="false"
              placeholderText="Search event(s) by tilte"/>
            <div>
              <button style={{margin: "1%"}} onClick={this.handlePriceSearch}>
                Show Event under $ 
              </button>
              <input type="number" placeholder="price" id="price" min="0" max="10000"/>
              <button style={{margin: "1%"}} onClick={this.handlePriceReset}>
                Reset Price Only 
              </button>
            </div>
            <table className="table">
              <thead className="thead-light">
                <tr>{this.eventListHead()}</tr>
              </thead>
              <tbody className="thead-light">
                {events.map((currentEvent) => (
                  <UserEvent event={currentEvent} key={currentEvent._id}/>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    );
  }
}


