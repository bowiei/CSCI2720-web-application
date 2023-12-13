import React from "react";

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
          <div className="card">
            <div className="card-body">
              Here is the home page.
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default UserPage;
