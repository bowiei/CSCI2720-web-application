import React, { Component } from 'react';
import Map from '../components/map';

class MiddleBox extends React.Component {
    render() {
        return (
            <>
                <div className="row">
                    <Map/>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                Add Comment 4c
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                Loc details 4b
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                Show Comment 4c
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                test4 
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default MiddleBox;
