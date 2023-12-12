import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled from "@emotion/styled";

import UserPage from "./pages/user.js";
import AdminPage from "./pages/admin.js";
import UserList from "./components/userList.js";
import CommentSection from "./components/comment.js";
import VenueList from "./components/venueList.js";
import LocationTable from "./components/locationTable.js";
import Header from "./components/header.js";
class App extends React.Component {

  render() {
    return (
      <div>
        <Header name="Project Name"/>
        <Backgournd>
          <BrowserRouter>
            <div>
              <ul>
                <li>
                  <Link to="/"> Home </Link>
                </li>
                <li>
                  <Link to="/admin"> Admin Page </Link>
                </li>
                <li>
                  <Link to="/userList"> userList Page </Link>
                </li>
                <li>
                  <Link to="/CommentSection"> Comment Section </Link>
                </li>
                <li>
                  <Link to="/locationTable"> LocationTable </Link>
                </li>
              </ul>
            </div>
            <Routes>
              <Route path="/" element={<UserPage user={this.props.user} />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/userList" element={<UserList />} />
              <Route path="/CommentSection" element={<CommentSection />} />
              <Route path="/locationTable" element={<LocationTable handleLocationSelect={this.handleLocationSelect} />} />
            </Routes>
          </BrowserRouter>
        </Backgournd>
      </div>
    );
  }
}

export default App;


const Backgournd = styled.div`
    width: 100vw;
    height: 100vh;
    background-color = #eee;
    // overflow: hidden;
    display : flex;
    // justify-content: space-around;
    // margin-top: 50px
`;
