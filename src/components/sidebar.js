import React from "react";
import { Link } from "react-router-dom";
// import styles from "../css/sidebar.css";
class Sidebar extends React.Component {
  render() {
    return (
        <>
            <div className="sideBar" style={sideBar}>
                <h4 style = {{ margin: "0px 20px", padding: "5px"}}> Navigation </h4>
                <ul>
                    <li>
                        <Link to="/user">Home</Link>
                    </li>
                    <li>
                        <Link to="/commentSection">Comment Section</Link>
                    </li>
                    <li>
                        <Link to="/locationTable">Location Details & Favorite</Link>
                    </li>
                    <li>
                        <Link to="/UsereventList">Event Details</Link>   
                    </li>
                    <br></br>
                    <h5> Admin Only </h5>
                    <li>
                        <Link to="/admin">Admin CRUD (User & Event)</Link>
                    </li>
                    <li>
                        <Link to="/userListView">UserList </Link>
                    </li>
                    <li>
                        <Link to="/AdmineventList">Admin EventList Page</Link>   
                    </li>

                </ul>
            </div>
        </>
    );
  }
}

export default Sidebar;

const sideBar = {
    
    backgroundColor: "#ECECEC",
    height: "100%"
}