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
      commentsOfLocation: [],
    };
  }

  componentDidMount() {
    // Fetch comments from database based on location
    // console.log(process.env.PORT);
    this.fetchComments();
  }

  fetchComments = () => {
    axios
      .get(`http://localhost:5500/comment`)
      .then((response) => {
        var comments = response.data;
        
        // Update the comments state with the fetched comments
        this.setState({ comments: comments });
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      })
  };

  handleCommentSubmit = () => {
    const comment = document.getElementById("comments").value;
    let commentRefID = '';
  
    let maxCommentID = 0;
  
    this.state.comments.forEach((comment) => {
      if (comment.commentID > maxCommentID) {
        maxCommentID = comment.commentID;
      }
    });
    maxCommentID += 1;
    console.log("Largest commentID:", maxCommentID);
  
    const newComment = {
      commentID: maxCommentID,
      username: "test",
      comment: comment,
      locID: this.props.selectedLocID,
      datetime: new Date(),
    };
  
    axios
      .post(`http://localhost:5500/comment/add`, newComment)
      .then((response) => {
        console.log(response.data);
        commentRefID = response.data._id;
        console.log(commentRefID);
        console.log("Comment added successfully");
      
        axios 
          .put(`http://localhost:5500/venue/add/v/${this.props.selectedLocID}/c/${commentRefID}`)
          .then((response) => {
            console.log(response.data);
            console.log("Comment Reference added successfully");
          })
          .catch((error) => {
            console.error("Error adding comment reference:", error);
          });
      })
      .then(() => { 
        this.fetchComments(); // Fetch the updated comments 
      })  
      .catch((error) => {
        // Handle error during comment submission
        console.error("Error adding comment:", error);
      });
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
    // const { comments } = this.state;
    const { selectedLoc, selectedLocID } = this.props;
  
    return (
      <div>
        <div className="comment-list">
          {!selectedLoc && (
            <div className="row">
              <div className="card">
                <div className="card-body">Please choose a location for leaving comments</div>
              </div>
            </div>
          )}
          {selectedLoc && (
            <>
              <div className="row">
                <div className="card">
                  <div className="card-body">Add Comment for {selectedLoc}</div>
                  <textarea className="form-control" placeholder="Type your comment here" 
                  id="comments" value={this.state.newComment}
                  style={{marginTop: "10px"}}>
                  </textarea>
                  <button style={{margin: "10px 0px 10px 0px"}} className="btn btn-primary" onClick={this.handleCommentSubmit}>Submit Comment</button>
                </div>
              </div>
              <div className="row" style={{ marginTop: "10px" }}>
              Comments for {selectedLoc}
                <div className="card">
                  {/* {this.state.comments.map((comment) => ( <div> {comment.locID}</div>))} */}
                  {this.state.comments
                  .filter((comment) => comment.locID === selectedLocID) // Filter comments by location ID
                  .map((comment) => (
                    <div className="card-body">
                      <h5 className="card-title">
                        <img src={this.getRandomAvatar()} alt="User Avatar" style={{ height: 50, width: 50 }} className="avatar" />
                        {comment.username.substring(0, 3) + "***"}
                      </h5>
                      <p className="card-title">
                        {comment.comment} (Date: {comment.datetime.split("T")[0]})
                      </p>
                    </div>
                  ))}
                </div>  
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}


export default CommentSection;