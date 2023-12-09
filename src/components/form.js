import React from 'react';

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
            // case 'Read Event':
            //     return <ReadEventForm/>;
            case 'Update Event':
                this.setState({form: <UpdateEventForm/>});
                break;
            case 'Delete Event':
                this.setState({form: <DeleteEventForm/>});
                break;
            case 'Create User':
                this.setState({form: <CreateUserForm/>});
                break;
            // case 'Read User':
            //     return <ReadUserForm/>;
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

class FormtypeText extends React.Component {
    render() { 
        return (
            <div>
                <label for={this.props.label} class="col-sm-2 col-form-label">{this.props.labelText}</label>
                <div class="col-sm-10">
                    <FormtypeNumber label="eventID" describedby="eventIDtext" placeholder="Enter eventID here: " describedbyText="E"/>
                </div>            
            </div>
        );
    }
}

class FormtypeDate extends React.Component {

    addDateNumber = () => {
        document.getElementById("dates").innerHTML += "</br> <input type='date' class='form-control'/>";    
    };

    render() { 
        return (
            <div>
                <label for={this.props.label} class="col-sm-2 col-form-label">{this.props.labelText} </label>
                <div id="dates" class="col-sm-10"> 
                    <input type="date" class="form-control"/>
                </div>
                <button type="button" class="btn btn-secondary" style={{fontSize:'10px', marginleft:'15px'}} onClick={this.addDateNumber}> Add new dates </button> 
            </div>
        );
    }
}

class FormtypeVenue extends React.Component {
    render() { 
        return (
            <div>
                <label for={this.props.label} class="col-sm-2 col-form-label">{this.props.labelText}</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" placeholder={this.props.placeholder}/>
                </div>
            </div>
        );
    }
}

class FormtypeNumber extends React.Component {
    render() { 
        return (
            <div>
                <label for={this.props.label} class="col-sm-2 col-form-label">{this.props.labelText}</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" placeholder={this.props.placeholder}/>
                </div>
            </div>
        );
    }
}

export default Form;
