import React, { Component } from "react";
import axios from "axios";

class AddUserForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            username: "",
            password: "",
            role: "",
        };
    }

    handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    };

    handleUserAdd = (event) => {
    event.preventDefault();

    const { username, password, role } = this.state;
    const newUser = {
        username: username,
        password: password,
        role: role,
    };

    axios
        .put(`http://localhost:5500/user/register`, newUser)
        .then((response) => {
        console.log(response.data);
        this.props.onUserAdded();
        })
        .catch((error) => {
        console.log(error);
        });
    };

    render() {
    const { username, password, role } = this.state;
    const { onCancel } = this.props;

    return (
        <form onSubmit={this.handleUserAdd}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={this.handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                className="form-control"
                id="role"
                name="role"
                value={role}
                onChange={this.handleInputChange}
                >
                <option value="">Select a role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">
                Add User
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
            </button>
        </form>
      );
    }
  }

export default AddUserForm;
