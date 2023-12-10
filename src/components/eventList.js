import React, { Component } from "react";
import axios from "axios";

const Event = (props) => (
  <tr>
    <td>{props.event.eventID}</td>
    <td>{props.event.title}</td>
    <td>{props.event.progtimee}</td>
    <td>
      {props.event.date.slice(-5).map((date) => (
        <tr key={date}>
          <td>{date}</td>
        </tr>
      ))}
    </td>
    <td>{props.event.venue.venueID}</td>
    <td>{props.event.venue.address}</td>
    <td>
      {props.event.venue.latitude}
      <br></br>
      {props.event.venue.longitude}
    </td>
    <td>{props.event.price}</td>
    <td>{props.event.price}</td>
    <td>{props.event.description}</td>
    <td>{props.event.presenterorge}</td>
  </tr>
);

export default class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      td: ["eventID", "title", "prog time", "date", "venueID", "address", "latitude & longitude", "price", "description", "presenterorge"],
    };
  }

  componentDidMount() {
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
    return this.state.events.map((currentEvent) => {
      return <Event event={currentEvent} key={currentEvent._id} />;
    });
  }

  render() {
    return (
      <div style={{ overflowX: "auto" }}>
        <h3>Event List</h3>
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
