import React from "react";

const viewstyle = {
    display: "inline-block",
    margin: "1%",
    border: "2px solid black",
    width: "75vw",
    background: "gray",
};

const venuestyle={
    overflow: "auto",
}

const eventlist=(list)=>{
    var arr,i=0;
    list.map((u)=>{
        axios.get(`http://localhost:5500/event/${u}`)
        .then((res)=>{arr[i++]=data;
        return (
            <div>
                <p>Title: {res.data.title}</p>
                <p>ProgTimee: {res.data.progtime}</p>
                <p>Date: {res.data.date}</p>
                <p>Price: ${res.data.price}</p>
                <p>Description: {res.data.discription}</p>
                <p>Presenterorge: {res.data.presenterorge}</p>
            </div>)
            }
        )
    })
    
}
/*"eventID": "154858",
        "title": "\n Tuen Mun Town Hall Venue Partnership Scheme \"Cats and Mouse 2024\" by Spring-Time Experimental Theatre \n",
        "progtimee": "\n 1 hr 30 mins \n",
        "date": [
            "\n 20240106 \n",
            "\n 20240107 \n"
        ],
        "venue": {
            "venueID": "76810048",
            "address": "\n Tuen Mun Town Hall (Auditorium) \n",
            "latitude": "\n 22.391810 \n",
            "longitude": "\n 113.976771 \n"
        },
        "price": 250,
        "description": "\n Please refer to Chinese version. \n",
        "presenterorge": "\n Pres*/

class seperateView extends React.Component{
    constructor(props){
        super(props);
        this.state={
            eventlist:[]
        }
    }

    render(){
        return(
            <div style={viewstyle} className="card d-inline-block m-2">
                <div>{this.props.address}</div>
                <div style={venuestyle}>
                    <eventlist list={this.props.events}/>   
                </div>
            </div>
        )
    }
}



export default seperateView;