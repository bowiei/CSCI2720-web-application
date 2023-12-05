import React from 'react';
import Header from '../components/header.js';
import Form from '../components/form.js';

class AdminPage extends React.Component {
    render() {
        return (
            <div>
                <Header name="Admin Page"/>
                <Form />
            </div>
        );
    }
}

export default AdminPage;