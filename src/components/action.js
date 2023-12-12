import React from "react";
import UserList from "./userList";
import EventList from "./eventList";

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
      case "CRUD Event":
        this.setState({ form: <EventList /> });
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
          <option value="CRUD Event">CRUD Event</option>
          <option value="CRUD User">CRUD User</option>
        </select>
        <br></br>
        {this.state.form}
      </div>
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
