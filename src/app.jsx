import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import UserPage from "./pages/user";
import AdminPage from "./pages/admin";
import LoginPage from "./pages/login";
import UserEventList from "./components/userEventList";
import Header from "./components/header";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      username: "",
      role: "",
    };
  }
  handleLogin = (username, role) => {
    if(username){
      this.setState({ loggedIn: false, username });
      this.setState({ role: role });
    }
  };

  handleLogout = () => {
    this.setState({ loggedIn: true, username: "" });
  };
  render() {
    if (this.state.loggedIn) {
      return (
        <>
          <LoginPage username={this.state.username} loggedIn={this.state.loggedIn} onLogin={this.handleLogin} onLogout={this.handleLogout} />
        </>
      );
    } else {
      return (
        <>
          <Header
            name="Cultural Programmes"
            username={this.state.username}
            loggedIn={this.state.loggedIn}
            onLogin={this.handleLogin}
            onLogout={this.handleLogout}
          />
          <BrowserRouter>
            <div>
              <div className="row">
                <div className="col-lg-2 col-md-3">
                  <Sidebar role={this.state.role}/>
                </div>
                <div className="col-lg-10 col-md-9" style={{ padding: "14px" }}>
                  <Routes>
                    <Route path="/user" element={<UserPage user={this.props.user} />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/UsereventList" element={<UserEventList />} />
                  </Routes>
                </div>
              </div>
            </div>
          </BrowserRouter>
        </>
      );
    }
  }
}

export default App;

// const Backgournd = styled.div`
//     width: 100vw;
//     height: 100vh;
//     background-color = #eee;
//     // overflow: hidden;
//     display : flex;
//     // justify-content: space-around;
//     // margin-top: 50px
// `;
