import React, { Component } from "react";
import axios from "axios";
import UserList from "./userList";
import EventList from "./eventList";
import { FormtypeDate, FormtypeText, FormtypeVenue, FormtypeRadioBtn } from "./formtype";

class Form extends React.Component {
  render() {
    return (
      <div>
        Choose your CRUD events operation:
        <EventDropdown />
      </div>
    );
  }
}

class EventDropdown extends React.Component {
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
      case "Create User":
        this.setState({ form: <CreateUserForm /> });
        break;
      case "Read User":
        this.setState({ form: <UserList /> });
        break;
      case "Update User":
        this.setState({ form: <UpdateUserForm /> });
        break;
      case "Delete User":
        this.setState({ form: <DeleteUserForm /> });
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
          <option value="Create User">Create User</option>
          <option value="Read User">Read User</option>
          <option value="Update User">Update User</option>
          <option value="Delete User">Delete User</option>
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
        <FormtypeVenue label="price" labelText="Price" placeholder="Enter price here: " />
        <FormtypeVenue label="description" labelText="Description" placeholder="Enter description here: " />
        <FormtypeVenue label="presenterorge" labelText="Presenter/Organizer" placeholder="Enter presenter/organizer here: " />
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
        <FormtypeVenue label="price" labelText="Price" placeholder="Enter price here: " />
        <FormtypeVenue label="description" labelText="Description" placeholder="Enter description here: " />
        <FormtypeVenue label="presenterorge" labelText="Presenter/Organizer" placeholder="Enter presenter/organizer here: " />
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

class CreateUserForm extends React.Component {
  render() {
    return (
      <form action="/add" method="post">
        <FormtypeText label="username" labelText="New Username" placeholder="Enter new username here: " />
        <FormtypeText label="password" labelText="Password" placeholder="Enter password here: " />
        <div> Role: </div>
        <FormtypeRadioBtn id="adminRole" groupName="role" boxname="Admin" />
        <FormtypeRadioBtn id="userRole" groupName="role" boxname="User" />
        <br></br>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

class UpdateUserForm extends React.Component {
  render() {
    return (
      <form action="/add" method="post">
        <FormtypeText label="username" labelText="Old Username *" placeholder="Enter the old username: " />
        <FormtypeText label="password" labelText="Old Password *" placeholder="Enter the old password: " />
        <FormtypeText label="username" labelText="New Username" placeholder="Enter the new username: " />
        <Remindertext reminder="Leave the field blank if you do not want to change the username." />
        <FormtypeText label="password" labelText="New Password" placeholder="Enter the new password: " />
        <Remindertext reminder="Leave the field blank if you do not want to change the password." />
        <br></br>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

class DeleteUserForm extends React.Component {
  render() {
    return (
      <form action="/add" method="post">
        <FormtypeText label="username" labelText="Username" placeholder="Enter the username that need to be deleted: " />
        <FormtypeText label="password" labelText="Password" placeholder="Enter password for comfirmation: " />
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

export default Form;
