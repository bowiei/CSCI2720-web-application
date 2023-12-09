import React from 'react';
import Header from '../components/header.js';
import EventForm from '../components/form.js';

class AdminPage extends React.Component {
    render() {
        return (
            <div>
                <Header name="Admin Page"/>
                <EventForm/>
            </div>
        );
    }
}

export default AdminPage;