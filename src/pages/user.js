import React from 'react';
import Header from '../components/header.js';
import Form from '../components/form.js';
import CommentList from '../components/commentList.js';


class UserPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header name="User Page" userid={this.props.user} />
                <gmp-map center="40.12150192260742,-100.45039367675781" zoom="4" map-id="DEMO_MAP_ID">
                <gmp-advanced-marker position="40.12150192260742,-100.45039367675781" title="My location">
                </gmp-advanced-marker>
                </gmp-map>
                <Form name="user Comment"/>
                
            </div>
        );
    }
}

export default UserPage;