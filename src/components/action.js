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

  handleSelectionChange = (value) => {
    this.setState({ value });
    switch (value) {
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
    const { value, form } = this.state;

    return (
      <div>
        <button
          onClick={() => this.handleSelectionChange("CRUD Event")}
          disabled={value === "CRUD Event"}
        >
          CRUD Event
        </button>
        <button
          onClick={() => this.handleSelectionChange("CRUD User")}
          disabled={value === "CRUD User"}
        >
          CRUD User
        </button>
        <br />
        {form}
      </div>
    );
  }
}

export default Action;
