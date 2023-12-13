import React,{useState,useRef,useEffect} from "react";
import axios from "axios";
import Eventblock from "./eventCard";
import Locationblock from "./locationCard";
import Map from '../components/map';
const viewstyle = {
    display: "inline-block",
    margin: "1%",
    border: "2px solid black",
    width: "75vw",
    background: "gray",
};

// const venuestyle={
//     weight:"30vw",
//     overflow: "y",
// }

// const venuetitlestyle={
//     padding:"1%",
//     border: "2px solid black",
//     margin: "1%",
// }

const commentstyleblock={
    display: "inline-block",
    margin: "1%",
    border: "2px solid black",
    width: "20vw",
    background: "gray",
}


// Eventblock -> EventCard
// Add more Locationblock -> save in LocationCard

class SeperateView extends React.Component{

    // updateEventlist(a){
    //     return(
    //         a?.map((u)=>{
    //             console.log("u=",u);
    //             return (
    //                 <Eventblock eventid={u}/>
    //             )
    //         })
    //     )
    // }

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
                {/* <div className="row">
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
                                Show Comment 4c
                            </div>
                        </div>
                    </div>
                </div>
                <div style={viewstyle} className="card d-inline-block m-2">
                    <Eventblock/>
                    <Locationblock/>
                </div> */}
            </>

        )
    }
}



export default SeperateView;