import React, { Component } from "react";
import axios from "axios";

const User = (props) => (
  <tr>
    <td>{props.user.username}</td>
    <td>{props.user.role}</td>
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
      .get("http://localhost:5000/user/")
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
