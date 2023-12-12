import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./searchbar";

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };
  }

  handleEditClick = () => {
    this.setState({ isEditing: true });
  };

  handleEventUpdated = () => {
    this.setState({ isEditing: false });
  };

  handleDeleteEvent = () => {
    const confirmed = window.confirm('Are you sure you want to delete this event?');
    if (!confirmed) {
      return;
    }
    axios
      .delete(`http://localhost:5500/event/delete/${this.props.event.eventID}`)
      .then((response) => {
        console.log(response.data);
        this.props.onEventDeleted();
        // Perform any additional actions after successful deletion
      })
      .catch((error) => {
        console.log(error);
        // Handle error cases
      });
  };

  render() {
    const { event } = this.props;
    const { isEditing } = this.state;
    

    return (
      <tr>
        {isEditing ? (
          <td colSpan="4">
            <h4> Edit event {event.eventID} </h4>
            {/* <UpdateUserForm event={event} onEventUpdated={this.handleEventUpdated} onCancel={() => this.setState({ isEditing: false })} /> */}
          </td>
        ) : (
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
            <td>
              <button onClick={this.handleEditClick}>Edit</button>
            </td>
            <td>
              <button onClick={this.handleDeleteEvent}>Delete</button>
            </td>
          </>
        )}
      </tr>
    );
  }
}

export default class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      filterKeyword: "",
      td: ["eventID", "title", "prog time", "date", "venueID", "address", "latitude & longitude", "price", "description", "presenterorge", "Actions"],
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

  eventListBody() {
    const { events, filterKeyword } = this.state;
    const filteredEvents = events.filter((event) =>
      event.title.toLowerCase().includes(filterKeyword.toLowerCase())
    );

    return filteredEvents.map((currentEvent) => {
      return (
        <Event event={currentEvent} key={currentEvent._id} onEventDeleted={this.fetchEvents.bind(this)}/>
      );
    });
  }

  handleInputChange = (e) => {
    this.setState({ filterKeyword: e.target.value });
  };

  handleFilter = () => {
    // Filter the table based on the filterKeyword
    const { Events, filterKeyword } = this.state;
    const filteredEvents = Events.filter((event) => event.title.toLowerCase().includes(filterKeyword.toLowerCase()));
    this.setState({ Events: filteredEvents });
  };

  handleReset = () => {
    // Refetch the data again and reset the state
    this.fetchEvents();
    this.setState({
      filterKeyword: "",
    });
  };

  render() {
    const { filterKeyword } = this.state;
    return (
      <div style={{ overflowX: "auto", overflowY : "auto"}}>
        <h3>Event List</h3>
        <SearchBar filterKeyword={filterKeyword} handleInputChange={this.handleInputChange} 
          handleFilter={this.handleFilter} handleReset={this.handleReset} 
          placeholderText="Search event(s) by tilte"/>
        <button onClick={this.handleAddClick}> Add events </button>
        <table className="table">
          <thead className="thead-light">
            <tr>{this.eventListHead()}</tr>
          </thead>
          <tbody>{this.eventListBody()}</tbody>
        </table>
      </div>
    );
  }
}
