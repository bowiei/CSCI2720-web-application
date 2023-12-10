import React from 'react';
import Header from '../components/header.js';
import Form from '../components/form.js';
import Map from '../components/map.js';
import CommentList from '../components/commentList.js';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header name="User Page" userid={this.props.user}/>
                <Form name="user Comment"/>
                <Map/>
            </div>
        );
    }
}

export default UserPage;