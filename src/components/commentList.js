import React from 'react';
import axios from "axios";

const Comment = (props) => (
    <div>
    <tr>
      <td>{props.comment.venueID}</td>
      <td>{props.comment.userID}</td>
      <td>{props.comment.comment}</td>
      <td>{props.comment.datatime}</td>
    </tr>
    </div>
);
let venueID;
class CommentList extends React.Component{
    
    constructor(props) {
        super(props);
        venueID=props.venueID;
        this.state = {
          comment: [],
        };
    }


    componentDidMount() {
        axios
          .get("http://localhost:5000/comment/"+{venueID})
          .then((response) => {
            this.setState({ comment: response.data });
          })
          .catch((error) => {
            console.log(error);
          });
    }

    CommentList() {
        return this.state.comment.map((comment) => {
          return <Comment user={comment} key={comment.id} />;
        });
    }

    render() {
        return (
            <div>
                {CommentList()}
            </div>
        );
    }
}

export default CommentList;