import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import UserPage from "./pages/user";
import AdminPage from "./pages/admin";
import UserListView from "./components/userListView";
import CommentSection from "./components/comment";
import LocationTable from "./components/locationTable";
import EventList from "./components/eventList";
import UserEventList from "./components/userEventList";
import Header from "./components/header";

class App extends React.Component {
  render() {
    return (
      <>
        <Header name="Cultural Programmes"/>
        <BrowserRouter>
          <div>
            <div className="row">
              <div className="col-lg-2 col-md-3">
                <Sidebar/>
              </div>
              <div className="col-lg-10 col-md-9" style={{ padding: "14px"}}>
                <Routes>
                  <Route path="/user" element={<UserPage user={this.props.user} />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/userListView" element={<UserListView />} />
                  <Route path="/commentSection" element={<CommentSection />} />
                  <Route path="/locationTable" element={<LocationTable handleLocationSelect={this.handleLocationSelect} />} />
                  <Route path="/UsereventList" element={<UserEventList />} />
                  <Route path="/AdmineventList" element={<EventList />} />
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
