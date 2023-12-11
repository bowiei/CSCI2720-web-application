import React from "react";
import axios from "axios";

class FormtypeText extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor={this.props.label}>{this.props.labelText}</label>
        <div>
          <input name={this.props.label} type="text" className="form-control" placeholder={this.props.placeholder} />
        </div>
      </div>
    );
  }
}

class FormtypeDate extends React.Component {
  addDateNumber = () => {
    document.getElementById("dates").innerHTML += "</br> <input name={this.props.label} type='date' className='form-control'/>";
  };

  render() {
    return (
      <div>
        <label htmlFor={this.props.label}>{this.props.labelText} </label>
        <div id="dates"></div>
        <br></br>
        <button type="button" className="btn btn-secondary" style={{ fontSize: "10px", marginleft: "15px" }} onClick={this.addDateNumber}>
          {" "}
          Add new dates{" "}
        </button>
      </div>
    );
  }
}

class FormtypeVenue extends React.Component {
  constructor(props) {
    super(props);
    this.state = { venues: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5500/venue/")
      .then((response) => {
        this.setState({ venues: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.label}>{this.props.labelText}</label>
        <select className="form-control" name={this.props.label} id={this.props.label}>
          {this.state.venues.map((venue) => (
            <option key={venue._id} value={JSON.stringify(venue)}>
              {venue.address}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

class FormtypeRadioBtn extends React.Component {
  render() {
    return (
      <div>
        <input type="radio" id={this.props.id} name={this.props.groupName} />
        <label htmlFor={this.props.id}> {this.props.boxname} </label>
      </div>
    );
  }
}

export { FormtypeText, FormtypeDate, FormtypeVenue, FormtypeRadioBtn };
