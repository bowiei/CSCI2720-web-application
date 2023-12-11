import React, { Component } from "react";
import axios from "axios";
import UpdateUserForm from "./UpdateUserForm";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };
  }

  handleEditClick = () => {
    this.setState({ isEditing: true });
  };

  handleUserUpdated = () => {
    this.setState({ isEditing: false });
  };

  handleDeleteUser = () => {
    axios
      .delete(`http://localhost:5500/user/delete/${this.props.user.username}`)
      .then((response) => {
        console.log(response.data);
        this.props.onUserDeleted();
        // Perform any additional actions after successful deletion
      })
      .catch((error) => {
        console.log(error);
        // Handle error cases
      });
  };

  render() {
    const { user } = this.props;
    const { isEditing } = this.state;

    return (
      <tr>
        {isEditing ? (
          <td colSpan="4">
            <UpdateUserForm user={user} onUserUpdated={this.handleUserUpdated} onCancel={() => this.setState({ isEditing: false })} />
          </td>
        ) : (
          <>
            <td>{user.username}</td>
            <td>{user.role}</td>
            <td>
              <button onClick={this.handleEditClick}>Edit</button>
            </td>
            <td>
              <button onClick={this.handleDeleteUser}>Delete</button>
            </td>
          </>
        )}
      </tr>
    );
  }
}

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    axios
      .get("http://localhost:5500/user/")
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  userList() {
    return this.state.users.map((currentUser) => {
      return <User user={currentUser} key={currentUser.username} onUserDeleted={this.fetchUsers.bind(this)} />;
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
          <tbody className="thead-light">{this.userList()}</tbody>
        </table>
      </div>
    );
  }
}

export default UserList;