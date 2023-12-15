import React from "react";
import Map from '../components/map';

class SeperateView extends React.Component{

    render(){
        return(
            <>
                <div className="container">
                <div className="row">
                    <div className="col">
                    <Map/>
                    </div>
                </div>
                </div>
            </>

        )
    }
}

export default SeperateView;