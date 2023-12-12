import React, { Component } from "react";
import axios from "axios";

class UpdateEventForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            title: "", 
            progtimee: "",
            date: "",
            venue: "",
            price: "",
            description: "",
            presenterorge: "",
        };
    }

    handleUpdateUser = (event) => {
        event.preventDefault();

        const { title, progtimee, date, venue, price, description, presenterorge } = this.state;

        // verify by ticking the checkbox

        const updatedEvent = {
            title: title, 
            progtimee: progtimee,
            date: date,
            venue: venue,
            price: price,
            description: description,
            presenterorge: presenterorge,
        };

        axios
        .put(`http://localhost:5500/event/update/${this.props.event.eventID}`, updatedEvent)
        .then((response) => {
            console.log(response.data);
            this.props.onUserUpdated();
            // Perform any additional actions after successful update
        })
        .catch((error) => {
            console.log(error);
            // Handle error cases
        });
    };
    render() {
        const { title, progtimee, date, venue, price, description, presenterorge } = this.state;
        const { event, onCancel } = this.props;
      
        return (
            <form onSubmit={this.handleUpdateUser}>
                <div className="form-group">
                    <label htmlFor="eventID">Event ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="eventID"
                        value={event.eventID}
                        disabled
                        onChange={(event) => this.setState({ title: event.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title *</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        disabled
                        onChange={(event) => this.setState({ title: event.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="progtimee">Program Time *</label>
                    <input
                        type="text"
                        className="form-control"
                        id="progtimee"
                        value={progtimee}
                        required
                        onChange={(event) => this.setState({ progtimee: event.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date *</label>
                    <input
                        type="text"
                        className="form-control"
                        id="date"
                        value={date}
                        required
                        onChange={(event) => this.setState({ date: event.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="venue">Venue *</label>
                    <input
                        type="text"
                        className="form-control"
                        id="venue"
                        value={venue}
                        required
                        onChange={(event) => this.setState({ venue: event.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price *</label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        value={price}
                        required
                        onChange={(event) => this.setState({ price: event.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description *</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        required
                        onChange={(event) => this.setState({ description: event.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="presenterorge">Presenter/Organization *</label>
                    <input
                        type="text"
                        className="form-control"
                        id="presenterorge"
                        value={presenterorge}
                        required
                        onChange={(event) => this.setState({ presenterorge: event.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary"> Update </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}> Cancel </button>
            </form>
        );
    }
}
export default UpdateEventForm;