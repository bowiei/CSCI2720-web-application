import React from 'react';

const locstyle={
    float:'right',
    border:'2px solid black',
    margin:'0.5%',
    width: '22vw',
    height: '40vh',
}

class LocationView extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div class="card d-inline-block m-2" style={locstyle}>
                <h5>{this.props.loc.venue}</h5>
                <h5>{this.props.loc.address}</h5>
                <h5>{this.props.loc.event}</h5>
            </div>
        )
    }
};
export default LocationView;