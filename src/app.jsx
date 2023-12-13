import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import UserPage from "./pages/user";
import AdminPage from "./pages/admin";
import UserList from "./components/userList";
import CommentSection from "./components/comment";
import LocationTable from "./components/locationTable";
import Header from "./components/header";

class App extends React.Component {
  render() {
    return (
      <>
        <Header name="Project"/>
        <BrowserRouter>
          <div>
            <div className="row">
              <div className="col-lg-2 col-md-3">
                <Sidebar/>
              </div>
              <div className="col-lg-10 col-md-9">
                <Routes>
                  <Route path="/user" element={<UserPage user={this.props.user} />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/userList" element={<UserList />} />
                  <Route path="/commentSection" element={<CommentSection />} />
                  <Route path="/locationTable" element={<LocationTable handleLocationSelect={this.handleLocationSelect} />} />
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </>
    );
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
