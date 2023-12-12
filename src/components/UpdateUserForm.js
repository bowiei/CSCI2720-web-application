import React, { Component } from "react";
import axios from "axios";

class UpdateUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmPassword: "",
      role: props.user.role,
    };
  }

  handleUpdateUser = (event) => {
    event.preventDefault();

    const { password, confirmPassword, role } = this.state;

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      alert("Passwords do not match");
      return;
    }

    const updatedUser = {
      password: password,
      role: role,
    };

    axios
      .put(`http://localhost:5500/user/update/${this.props.user.username}`, updatedUser)
      .then((response) => {
        console.log(response.data);
        this.props.onUserUpdated();
        // Perform any additional actions after successful update
      })
      .catch((error) => {
        console.log(error);
        // Handle error cases
      });
  };

  render() {
    const { password, confirmPassword, role } = this.state;
    const { user, onCancel } = this.props;

    return (
      <form onSubmit={this.handleUpdateUser}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            className="form-control" 
            id="username" 
            value={user.username} 
            disabled 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password *</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            required
            onChange={(event) => this.setState({ password: event.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            required
            onChange={(event) => this.setState({ confirmPassword: event.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role *</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="userRole"
              value="user"
              checked={role === "user"}
              required
              onChange={() => this.setState({ role: "user" })}
            />
            <label className="form-check-label" htmlFor="userRole">
              User
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="adminRole"
              value="admin"
              checked={role === "admin"}
              onChange={() => this.setState({ role: "admin" })}
            />
            <label className="form-check-label" htmlFor="adminRole">
              Admin
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </form>
    );
  }
}

export default UpdateUserForm;
