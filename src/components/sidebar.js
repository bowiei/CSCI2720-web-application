import React from "react";
import { Link } from "react-router-dom";
// import styles from "../css/sidebar.css";
class Sidebar extends React.Component {
  render() {
    return (
        <>
            <div className="sideBar" style={sideBar}>
                <h4 style = {{ margin: "0px 20px"}}> Navigation </h4>
                <ul>
                    <li>
                        <Link to="/user">Home</Link>
                    </li>
                    <li>
                        <Link to="/admin">Admin Page</Link>
                    </li>
                    <li>
                        <Link to="/userList">UserList Page</Link>
                    </li>
                    <li>
                        <Link to="/commentSection">Comment Section</Link>
                    </li>
                    <li>
                        <Link to="/locationTable">Location Table</Link>
                    </li>
                </ul>
            </div>
        </>
    );
  }
}

export default Sidebar;

const sideBar = {
    backgroundColor: "lightgrey",
    height: "100%"
}