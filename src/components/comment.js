import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// dotenv.config();
class CommentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      location: "",
    };
  }

  componentDidMount() {
    // Fetch comments from database based on location
    // console.log(process.env.PORT);
    this.fetchComments();
  }

  fetchComments = () => {
    // Send a GET request to the backend endpoint
    axios
      .get(`http://localhost:5500/comment`, {
        params: {},
      })
      .then((response) => {
        // Update the comments state with the fetched comments
        // console.log(response.data);
        this.setState({ comments: response.data }, () => {
          // console.log(this.state.comments);
        });
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  };

  handleLocationClick = () => {
    // Implement method to handle location click and search in database
  };
  //avatar ref: https://usersinsights.com/user-avatar-icons/
  getRandomAvatar = () => {
    const avatarContext = require.context("../assets/avatar", false, /\.(png|jpe?g|svg)$/);
    const avatarFiles = avatarContext.keys();
    const randomIndex = Math.floor(Math.random() * avatarFiles.length);
    const randomAvatarPath = avatarContext(avatarFiles[randomIndex]);
    // console.log("path : " , randomAvatarPath);
    return randomAvatarPath;
  };

  render() {
    const { comments, location } = this.state;

    return (
      <div>
        <div className="map" onClick={this.handleLocationClick}></div>
        <div className="comment-list">
          {comments.map((comment) => (
            <div className="comment card mb-3" key={comment.commentID}>
              <div className="card-body">
                {/* <h5 className="card-title">Comment ID: {comment.commentID}</h5> */}
                <h5 className="card-title">
                  <img src={this.getRandomAvatar()} alt="User Avatar" style={{ height: 50, width: 50 }} className="avatar" />
                  {comment.username.substring(0, 3)+ "***"}
                </h5>
                <p className="card-title">
                  {comment.comment} (Date: {comment.datetime.split("T")[0]})
                </p>
                {/* <p className="card-text">Date: {comment.datetime.split("T")[0]}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}


export default CommentSection;
