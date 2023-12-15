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
          //window.location.href = "/user";
          this.props.onLogin(response.data.user.username, response.data.user.role);
        } else if (userRole === "admin") {
          //window.location.href = "/admin";
          this.props.onLogin(response.data.user.username, response.data.user.role);
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
          <body style={styles.body}>
            <div style={styles.loginPage}>
                <div style={styles.loginContainer}>
                    <div style={styles.formHeader}>Login here</div>
                    <form style={styles.form} onSubmit={this.handleSubmit}>
                        <label htmlFor="text">username:</label>
                        <div style={styles.inputContainer}>
                            <input maxLength="15" minLength="3" placeholder="Username" type="text" id="username"
                            value={username} onChange={this.handleusernameChange} required  style={styles.input} />
                        </div>
                        <label htmlFor="password">Password:</label>
                        <div style={styles.inputContainer}>
                            <input maxLength="15" minLength="3" placeholder="Password" type="password" id="password" 
                            value={password} onChange={this.handlePasswordChange} required style={styles.input} />
                        </div>
                        <div style={styles.submitButtonContainer}>
                            <input type="submit" value="Login" style={styles.submitButton} />
                        </div>
                    </form>
                </div>
            </div>
          </body>
      </div>
    );
  }
}

export default LoginPage;

const styles = {

  body:{
      height:'780px',
      background: '#f2f2f2',
  },

  loginPage: {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: 'Poppins, sans-serif',
      display: 'grid',
      height: '100%',
      width: '100%',
      placeItems: 'center',
      background: '#f2f2f2',
  },
  loginContainer: {
      width: '380px',
      background: '#fff',
      borderRadius: '15px',
      boxShadow: '0px 15px 20px rgba(0,0,0,0.1)',
  },
  formHeader: {
      fontSize: '35px',
      fontWeight: '600',
      textAlign: 'center',
      lineHeight: '100px',
      color: '#fff',
      userSelect: 'none',
      borderRadius: '15px 15px 0 0',
      background: 'linear-gradient(-135deg, #c850c0, #4158d0)',
  },
  form: {
      padding: '10px 30px 50px 30px',
  },
  inputContainer: {
      height: '50px',
      width: '100%',
      marginTop: '20px',
      position: 'relative',
      value:'',
  },
  input: {
      height: '100%',
      width: '100%',
      outline: 'none',
      fontSize: '17px',
      paddingLeft: '20px',
      border: '1px solid lightgrey',
      borderRadius: '25px',
      transition: 'all 0.3s ease',
  },
  label: {
      position: 'absolute',
      top: '50%',
      left: '20px',
      color: '#999999',
      fontWeight: '400',
      fontSize: '17px',
      pointerEvents: 'none',
      transform: 'translateY(-50%)',
      transition: 'all 0.3s ease',
  },
  rememberMeContainer: {
      display: 'flex',
      width: '100%',
      height: '50px',
      fontSize: '16px',
      alignItems: 'center',
      justifyContent: 'space-around',
  },
  rememberMeLabel: {
      color: '#262626',
      userSelect: 'none',
      paddingLeft: '5px',
  },
  forgotPassword: {
      color: '#262626',
      marginTop: '20px',
      textAlign: 'center',
  },
  submitButtonContainer: {
      height: '50px',
      width: '100%',
      marginTop: '20px',
      position: 'relative',
  },
  submitButton: {
      color: '#fff',
      border: 'none',
      // paddingLeft: '0',
      marginTop: '-10px',
      fontSize: '20px',
      fontWeight: '500',
      cursor: 'pointer',
      position:'absolute',
      top:'10px',
      borderRadius: '10px 10px 10px 10px',
      background: 'linear-gradient(-135deg, #c850c0, #4158d0)',
      transition: 'all 0.3s ease',
  }
};