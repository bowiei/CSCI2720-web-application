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
    margin: "1%"
}

const eventstyle={
    display: "inline-block",
    border: "2px solid black",
    overflow: "x",
    overflow: "y",
    weight:"100%",
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
    }

    render(){
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
                <div style={venuetitlestyle}>{this.props.venuedetails.address}</div>
                <div style={venuestyle}>
                        {this.updateEventlist(this.props.venuedetails.events)}
                </div>
            </div>
        )
    }
}



export default SeperateView;