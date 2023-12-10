import React from 'react';
import UserList from './userList';
import EventList from './eventList';
import { FormtypeDate, FormtypeText, FormtypeNumber, FormtypeVenue } from './formtype';
class Form extends React.Component {
    render() {
        return (
            <div>
                Choose your CRUD events operation: 
                <EventDropdown/>
            </div>
        );
    }
}

class EventDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "", form: ""};
    }
  
    handleSelectionChange = (event) => {
        this.setState({ value: event.target.value });
        switch(event.target.value) {
            case 'Create Event':
                this.setState({form: <CreateEventForm/>});
                break;
            case 'Read Event':
                this.setState({form: <EventList/>}); 
                break;
            case 'Update Event':
                this.setState({form: <UpdateEventForm/>});
                break;
            case 'Delete Event':
                this.setState({form: <DeleteEventForm/>});
                break;
            case 'Create User':
                this.setState({form: <CreateUserForm/>});
                break;
            case 'Read User':
                this.setState({form: <UserList/>}); 
                break;
            case 'Update User':
                this.setState({form: <UpdateUserForm/>});
                break;
            case 'Delete User':
                this.setState({form: <DeleteUserForm/>});
                break;
            default:
                this.setState({form: ''});
                break;
        }
    };
  
    render() {
        return (
            <div>
                <select value={this.state.value} onChange={this.handleSelectionChange}>
                    <option value=""> --- </option>
                    <option value="Create Event">Create Event</option>
                    <option value="Read Event">Read Event</option>
                    <option value="Update Event">Update Event</option>
                    <option value="Delete Event">Delete Event</option>
                    <option value="Create User">Create User</option>
                    <option value="Read User">Read User</option>
                    <option value="Update User">Update User</option>
                    <option value="Delete User">Delete User</option>
                </select>
                <br></br>
                {this.state.form}
            </div>
        );
    }
}

class CreateEventForm extends React.Component {
    render() { 
        return (
            <form action="/add" method="post">
                <FormtypeText label="eventID" labelText="Event ID (3-8 digits)" placeholder="Enter eventID here: "/>
                <FormtypeText label="title" labelText="Event Name (English only)" placeholder="Enter event name here: "/>
                <FormtypeText label="progtimee" labelText="Program Length" placeholder="Enter program length here: "/>
                <FormtypeDate label="date" labelText="Date  " placeholder="Enter date here: "/>
                <FormtypeVenue label="venue" labelText="Venue" placeholder="Enter venue here: "/>
                <FormtypeVenue label="price" labelText="Price" placeholder="Enter price here: "/>
                <FormtypeVenue label="description" labelText="Description" placeholder="Enter description here: "/>
                <FormtypeVenue label="presenterorge" labelText="Presenter/Organizer" placeholder="Enter presenter/organizer here: "/>
                <br></br>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        );
    }
}

class UpdateEventForm extends React.Component {
    render() { 
        return (
            <form action="/update" method="post">
                <FormtypeText label="eventID" labelText="Event ID (3-8 digits)" placeholder="Enter eventID here: "/>
                <FormtypeText label="title" labelText="Event Name (English only)" placeholder="Enter event name here: "/>
                <FormtypeText label="progtimee" labelText="Program Length" placeholder="Enter program length here: "/>
                <FormtypeDate label="date" labelText="Date  " placeholder="Enter date here: "/>
                <FormtypeVenue label="venue" labelText="Venue" placeholder="Enter venue here: "/>
                <FormtypeVenue label="price" labelText="Price" placeholder="Enter price here: "/>
                <FormtypeVenue label="description" labelText="Description" placeholder="Enter description here: "/>
                <FormtypeVenue label="presenterorge" labelText="Presenter/Organizer" placeholder="Enter presenter/organizer here: "/>
                <br></br>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        );
    }
}

class DeleteEventForm extends React.Component {
    render() { 
        return (
            <form action="/delete" method="post">
                <FormtypeText label="eventID" describedby="eventIDtext" placeholder="Enter eventID here: "/>
                <br></br>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        );
    }
}


class CreateUserForm extends React.Component {
    render() { 
        return (
            <form action="/add" method="post">
                <FormtypeText label="username" labelText="username" placeholder="Enter username here: "/>
                <FormtypeText label="password" labelText="password" placeholder="Enter password here: "/>
                <br></br>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        );
    }
}

class UpdateUserForm extends React.Component {
    render() { 
        return (
            <form action="/add" method="post">
                <FormtypeText label="username" labelText="username" placeholder="Enter username here: "/>
                <FormtypeText label="password" labelText="password" placeholder="Enter password here: "/>
                <br></br>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        );
    }
}

class DeleteUserForm extends React.Component {
    render() { 
        return (
            <form action="/add" method="post">
                <FormtypeText label="username" labelText="username" placeholder="Enter username here: "/>
                <FormtypeText label="password" labelText="password" placeholder="Enter password here: "/>
                <br></br>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        );
    }
}



export default Form;
