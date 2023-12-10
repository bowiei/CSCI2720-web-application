import React, { Component } from "react";
import axios from "axios";

// eventID: 
// title: 
// progtimee: 
// date:
// venue: {
//   venueID: 
//   address: 
//   latitude: 
//   longitude: 
// },
// price: 
// description: 
// presenterorge: 

// hover for more details for venue and date
const Event = (props) => (
  <tr>
    <td>{props.Event.eventID}</td>
    <td>{props.Event.title}</td>
    <td>{props.Event.progtimee}</td>
    <td>{props.Event.date}</td> 
    <td>{props.Event.venue}</td>
    <td>{props.Event.title}</td>
    <td>{props.Event.eventID}</td>
    <td>{props.Event.title}</td>
  </tr>
);

export default class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:6000/user/")
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  userList() {
    return this.state.users.map((currentUser) => {
      return <User user={currentUser} key={currentUser._id} />;
    });
  }

  render() {
    return (
      <div>
        <h3>User List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>{this.userList()}</tbody>
        </table>
      </div>
    );
  }
}
