import React, { Component } from "react";
import axios from "axios";

class VUser extends Component {

  render() {
    const { user } = this.props;
    return (
      <tr>
          <>
            <td>{user.username}</td>
            <td>{user.role}</td>
          </>
      </tr>
    );
  }
}

class UserListView extends Component {
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
      return <VUser user={currentUser} key={currentUser.username} onUserDeleted={this.fetchUsers.bind(this)} />;
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
            <tbody className="thead-light">
            {this.userList()}
            </tbody>
        </table>
        </div>
    );
  }
}

export default UserListView;