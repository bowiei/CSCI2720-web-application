import React from 'react';
import Header from '../components/header.js';
import Action from '../components/action.js';

class AdminPage extends React.Component {
    render() {
        return (
            <div>
                <Header name="Admin Page"/>
                <Action/>
            </div>
        );
    }
}

export default AdminPage;