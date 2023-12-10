import React, { Component } from "react";
import axios from "axios";
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
      .get(`http://localhost:5000/comment`, {
        params: {
          
        },
      })
      .then((response) => {
        // Update the comments state with the fetched comments
        // console.log(response.data);
        this.setState({ comments: response.data }, () => {
          console.log(this.state.comments);
        });
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  };

  handleLocationClick = () => {
    // Implement method to handle location click and search in database
  };

  render() {
    const { comments, location } = this.state;

    return (
      <div>
        <div className="map" onClick={this.handleLocationClick}></div>
        <div className="comment-list">
          {comments.map((comment) => (
            <div className="comment" key={comment.commentID}>
              <p>Comment ID: {comment.commentID}</p>
              <p>Comment: {comment.comment}</p>
              <p>Username: {comment.username}</p>
              <p>Datetime: {comment.datetime}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CommentSection;
