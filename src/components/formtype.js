import React from "react";

class FormtypeText extends React.Component {
    render() { 
        return (
            <div>
                <label htmlFor={this.props.label}>{this.props.labelText}</label>
                <div>
                <input name={this.props.label} type="text" className="form-control" placeholder={this.props.placeholder}/>
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
                <div id="dates"> 
                </div>
                <br></br>
                <button type="button" className="btn btn-secondary" style={{fontSize:'10px', marginleft:'15px'}} onClick={this.addDateNumber}> Add new dates </button> 
            </div>
        );
    }
}

class FormtypeVenue extends React.Component {
    render() { 
        return (
            <div>
                <label htmlFor={this.props.label}>{this.props.labelText}</label>
                <div>
                    <input name={this.props.label} type="text" className="form-control" placeholder={this.props.placeholder}/>
                </div>
            </div>
        );
    }
}

class FormtypeRadioBtn extends React.Component {
    render() {
      return (
        <div>
            <input type="radio" id={this.props.id} name={this.props.groupName}/>
            <label htmlFor={this.props.id}> {this.props.boxname} </label>
        </div>
      );
    }
}

export {FormtypeText, FormtypeDate, FormtypeVenue, FormtypeRadioBtn};