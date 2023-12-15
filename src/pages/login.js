import React from "react";
import Action from "../components/action.js";
import axios from "axios";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleusernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    axios
      .post("http://localhost:5500/user/login", { username, password })
      .then((response) => {
        // Handle the successful response
        console.log(response.data.message);
        console.log(response.data.user);
        console.log(response.status);
        const userRole = response.data.user.role;
        if (userRole === "user") {
          //   window.location.href = "/user";
          this.props.onLogin(response.data.user.username);
        } else if (userRole === "admin") {
          //   window.location.href = "/admin";
          this.props.onLogin(response.data.user.username);
        } else {
          console.error("Invalid user role");
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert("Failed to login: Username or password mismatch");
        } else if (error.response.status === 400) {
          alert("Failed to login: Username or password mismatch");
        } else {
          alert(error.message);
        }
      });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="text">username:</label>
            <input type="text" id="username" value={username} onChange={this.handleusernameChange} required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={this.handlePasswordChange} required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
