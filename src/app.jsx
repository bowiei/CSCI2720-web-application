import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UserPage from './pages/user.js';
import AdminPage from './pages/admin.js';
import UserList from './components/userList.js';

class App extends React.Component {
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
              </ul>
            </div>
            <Routes>
              <Route path="/" element={<UserPage />} />
              <Route path="/form" element={<AdminPage />} />
              <Route path="/userList" element={<UserList />} />
            </Routes>
          </BrowserRouter>
        );
    }
}  

export default App;