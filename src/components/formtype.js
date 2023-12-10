import React from "react";

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

export {FormtypeText, FormtypeDate, FormtypeVenue, FormtypeNumber};