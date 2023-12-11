import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UserPage from './pages/user.js';
import AdminPage from './pages/admin.js';
import UserList from './components/userList.js';
import CommentSection from "./components/comment.js";
import VenueList from "./components/venueList.js";
import LocationTable from "./components/locationTable.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_username: "",
      selected_location: "",
      venue_details: [],
    };
  }

  handleLogin = (username) => {
    this.setState({ login_username: username });
  };

  handleLocationSelect = (location) => {
    this.setState({ selected_location: location });
  };

  componentDidMount() {
    // Perform database retrieval and update venue_details state
    // Example:
    // fetchVenueDetailsFromDatabase().then((details) => {
    //   this.setState({ venue_details: details });
    // });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to="/"> Home </Link>
            </li>
            <li>
              <Link to="/form"> Admin Page </Link>
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
          <Route path="/form" element={<AdminPage />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/CommentSection" element={<CommentSection />} />
          <Route path="/locationTable" element={<LocationTable handleLocationSelect={this.handleLocationSelect} />} />
        </Routes>
      </BrowserRouter>
    );
  }
}  

export default App;