import React from "react";
import SeperateView from "../components/seperateView";
class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_username: "",
    };
  }

  handleLogin = (username) => {
    this.setState({ login_username: username });
  };

  render() {
    return (
      <>
        <div>
          <SeperateView/>
        </div>
      </>
    );
  }
}
export default UserPage;
