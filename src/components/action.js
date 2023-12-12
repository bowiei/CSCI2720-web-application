import React, { Component } from "react";
import axios from "axios";
import UserList from "./userList";
import EventList from "./eventList";
import { FormtypeDate, FormtypeText, FormtypeVenue, FormtypeRadioBtn } from "./formtype";

class Action extends React.Component {
  render() {
    return (
      <div>
        Choose your CRUD events operation:
        <ActionDropdown />
      </div>
    );
  }
}

class ActionDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", form: "" };
  }

  handleSelectionChange = (event) => {
    this.setState({ value: event.target.value });
    switch (event.target.value) {
      case "Create Event":
        this.setState({ form: <CreateEventForm /> });
        break;
      case "Read Event":
        this.setState({ form: <EventList /> });
        break;
      case "Update Event":
        this.setState({ form: <UpdateEventForm /> });
        break;
      case "Delete Event":
        this.setState({ form: <DeleteEventForm /> });
        break;
      case "CRUD User":
        this.setState({ form: <UserList /> });
        break;
      default:
        this.setState({ form: "" });
        break;
    }
  };

  render() {
    return (
      <div>
        <select value={this.state.value} onChange={this.handleSelectionChange}>
          <option value=""> --- </option>
          <option value="Create Event">Create Event</option>
          <option value="Read Event">Read Event</option>
          <option value="Update Event">Update Event</option>
          <option value="Delete Event">Delete Event</option>
          <option value="CRUD User">CRUD User</option>
        </select>
        <br></br>
        {this.state.form}
      </div>
    );
  }
}

class CreateEventForm extends React.Component {
  render() {
    return (
      <form action="/add" method="post">
        <FormtypeText label="eventID" labelText="Event ID (3-9 digits)" placeholder="Enter eventID here: " />
        <FormtypeText label="title" labelText="Event Name (English only)" placeholder="Enter event name here: " />
        <FormtypeText label="progtimee" labelText="Program Length" placeholder="Enter program length here: " />
        <FormtypeDate label="date" labelText="Date  " placeholder="Enter date here: " />
        <FormtypeVenue label="venue" labelText="Venue" placeholder="Enter venue here: " />
        <FormtypeText label="price" labelText="Price" placeholder="Enter price here: " />
        <FormtypeText label="description" labelText="Description" placeholder="Enter description here: " />
        <FormtypeText label="presenterorge" labelText="Presenter/Organizer" placeholder="Enter presenter/organizer here: " />
        <br></br>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

class UpdateEventForm extends React.Component {
  render() {
    return (
      <form action="/update" method="post">
        <FormtypeText label="eventID" labelText="Event ID (3-9 digits)" placeholder="Enter eventID here: " />
        <FormtypeText label="title" labelText="Event Name (English only)" placeholder="Enter event name here: " />
        <FormtypeText label="progtimee" labelText="Program Length" placeholder="Enter program length here: " />
        <FormtypeDate label="date" labelText="Date  " placeholder="Enter date here: " />
        <FormtypeVenue label="venue" labelText="Venue" placeholder="Enter venue here: " />
        <FormtypeText label="price" labelText="Price" placeholder="Enter price here: " />
        <FormtypeText label="description" labelText="Description" placeholder="Enter description here: " />
        <FormtypeText label="presenterorge" labelText="Presenter/Organizer" placeholder="Enter presenter/organizer here: " />
        <br></br>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

class DeleteEventForm extends React.Component {
  render() {
    return (
      <form action="/delete" method="post">
        <FormtypeText label="eventID" labelText="Event ID (3-9 digits)" placeholder="Enter eventID here: " />
        <FormtypeText label="username" labelText="Your Username" placeholder="Enter your username for comfirmation: " />
        <Remindertext reminder="Action can not be recovered." />
        <br></br>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

class Remindertext extends React.Component {
  render() {
    return (
      <div>
        <small>
          <p>{this.props.reminder}</p>
        </small>
      </div>
    );
  }
}

export default Action;
