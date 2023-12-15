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
                        <Link to="/UsereventList">Event Details</Link>   
                    </li>
                    <br></br>
                    {this.props.role === "admin" && (
                        <div>
                        <h5>Admin Only</h5>
                        <li>
                            <Link to="/admin">Admin CRUD (User & Event)</Link>
                        </li>
                        </div>
                    )}
                </ul>
            </div>
        </>
    );
  }
}

export default Sidebar;

const sideBar = {
    // width: "20%",
    backgroundColor: "#ECECEC",
    height: "100%"
}