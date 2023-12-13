import React from 'react';
import axios from 'axios';

class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEventIndex: 0,
      events: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5500/event`)
      .then(res => {
        this.setState({ events: res.data });
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLoc !== this.props.selectedLoc) {
      this.setState({ 
        currentEventIndex: 0
      });
    }
  }

  handlePrevEvent = () => {
    this.setState(prevState => ({
      currentEventIndex: prevState.currentEventIndex - 1
    }));
    console.log(this.state.currentEventIndex);
  };

  handleNextEvent = () => {
    this.setState(prevState => ({
      currentEventIndex: prevState.currentEventIndex + 1
    }));
    console.log(this.state.currentEventIndex);
  };

  render() {
    if (this.props.selectedLoc === null) {
      return <div>No location selected</div>;
    } else {
      const { events, currentEventIndex } = this.state;

      var events_selected = [];
      events.forEach(event => {
        if (event.venue.venueID === this.props.selectedLoc) {
          events_selected.push(event);
        }
      });

      if (events_selected.length === 0) {
        return <div>No events found</div>;
      }

      if (currentEventIndex >= events_selected.length) {
        this.setState({ currentEventIndex: 0});
      }

      const currentEvent = events_selected[currentEventIndex];

      return (
        <>
          <div>Event Details</div>
          <br />
          <div>
            <div>Event ID: {currentEvent.eventID}</div>
            <div>Title: {currentEvent.title}</div>
            <div>Program Time: {currentEvent.progtimee}</div>
            <div>Nearest Date: {currentEvent.date[currentEvent.date.length - 1]}</div>
            <div>Price: {currentEvent.price}</div>
            <div>Description: {currentEvent.description}</div>
            <div>Presenter/Organizer: {currentEvent.presenterorge}</div>
            {/* Add more event details as needed */}
            <div>
              <button disabled={currentEventIndex === 0} onClick={this.handlePrevEvent}>
                Previous
              </button>
              <button
                disabled={currentEventIndex === events_selected.length - 1}
                onClick={this.handleNextEvent}
              >
                Next
              </button>
            </div>
            <br />
          </div>
        </>
      );
    }
  }
}

export default EventCard;