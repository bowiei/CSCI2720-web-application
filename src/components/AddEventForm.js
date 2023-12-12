import React, { Component } from "react";
import axios from "axios";

class AddEventForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            eventID: "", 
            title: "", 
            progtimee: "",
            date: "",
            venue: "",
            price: "",
            description: "",
            presenterorge: "",
        };
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleAdd = (event) => {
        event.preventDefault();
    

    const { eventID, title, progtimee, date, venue, price, description, presenterorge } = this.state;
    const newEvent = {
        eventID,
        title,
        progtimee,
        date,
        venue,
        price,
        description,
        presenterorge,
    };

    axios
        .put(`http://localhost:5500/event/add`, newEvent)
        .then((response) => {
        console.log(response.data);
        this.props.onUserAdded();
        })
        .catch((error) => {
        console.log(error);
        });
    };

    render() {
    const { eventID, title, progtimee, date, venue, price, description, presenterorge } = this.state;
    const { onCancel } = this.props;

    return (
        <form onSubmit={this.handleEventAdd}>
            <div className="form-group">
                <label htmlFor="eventID">Event ID *</label>
                <input type="text" className="form-control" id="eventID" name="eventID" 
                value={eventID} required onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input type="text" className="form-control" id="title" name="title" 
                value={title} required onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="progtimee">Program Time *</label>
                <input type="text" className="form-control" id="progtimee" name="progtimee" 
                value={progtimee} required onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input type="text" className="form-control" id="date" name="date" 
                value={date} required onChange={this.handleInputChange}/>
            </div>
                <div className="form-group">
                <label htmlFor="venue">Venue *</label>
                <input type="text" className="form-control" id="venue" name="venue" 
                value={venue} required onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="price">Price *</label>
                <input type="text" className="form-control" id="price" name="price" value={price} 
                required onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description *</label>
                <input type="text" className="form-control" id="description" name="description" 
                value={description} required onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="presenterorge">Presenter/Organization *</label>
                <input type="text" className="form-control" id="presenterorge" name="presenterorge" value={presenterorge} required onChange={this.handleInputChange}
                />
            </div>
            <button type="submit" className="btn btn-primary"> Add Event </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}> Cancel </button>
        </form>
        );
    }
}


export default AddEventForm;
