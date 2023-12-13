import React,{useState,useRef,useEffect} from "react";
import axios from "axios";

const viewstyle = {
    display: "inline-block",
    margin: "1%",
    border: "2px solid black",
    width: "75vw",
    background: "gray",
};

const venuestyle={
    weight:"30vw",
    overflow: "y",
}

const venuetitlestyle={
    padding:"1%",
    border: "2px solid black",
    margin: "1%",
}

const eventstyle={
    margin:"1%",
    padding:"1%",
    display: "inline-block",
    border: "2px solid black",
    overflow: "x",
    overflow: "y",
    weight:"75vw",
}

class Eventblock extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            progtimee:'', 
            date:'',
            price:'',
            description:'',
            presenterorge:''
        }
    }

    render(){
        axios.get(`http://localhost:5500/event/${this.props.eventid}`)
                .then((res)=>{
                    this.setState({title:res.data.title});
                    this.setState({progtimee:res.data.progtimee});
                    this.setState({date:res.data.date});
                    this.setState({price:res.data.price});
                    this.setState({description:res.data.description});
                    this.setState({presenterorge:res.data.presenterorge});
                    console.log('the event is',res.data);
                })
        return(
            <div style={eventstyle} className="card d-inline-block m-2">
                <p>Title: {this.state.title}</p>
                <p>ProgTimee: {this.state.progtimee}</p>
                <p>Date: {this.state.date}</p>
                <p>Price: ${this.state.price}</p>
                <p>Description: {this.state.description}</p>
                <p>Presenterorge: {this.state.presenterorge}</p>
            </div>
        )
    }
}

class SeperateView extends React.Component{
    constructor(props){
        super(props);
    }

    updateEventlist(a){
        return(
            a?.map((u)=>{
                console.log("u=",u);
                return (
                    <Eventblock eventid={u}/>
                )
            })
        )
    }

    render(){
        return(
            <div style={viewstyle} className="card d-inline-block m-2">
                <div style={venuetitlestyle} className="card d-inline-block m-2">
                    Location: {this.props.venuedetails.address}</div>
                <div >
                    {this.updateEventlist(this.props.venuedetails.events)}
                </div>
            </div>
        )
    }
}



export default SeperateView;