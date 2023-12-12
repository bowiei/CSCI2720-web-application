import React,{useState,useRef,useEffect} from 'react';
import Header from '../components/header.js';
import Form from '../components/form.js';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapstyle={
  display:'inline-block',
  margin:'1%',
  border:'2px solid black',
  width: '75vw',
  background:'gray',
}

const mapContainerStyle = {
  display:'inline-block',
  margin:'1%',
  border:'2px solid black',
  width: '49vw',
  height: '40vh',
};

let center = {
  lat: 7.2905715,
  lng: 80.6337262,
};

let zoom=20;

function chooseLocation(pos){

}

let loc={
  venue:'123',
  address:'111',
  event:'111',
};

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      zoom:20,
      center:{
        lat: 22.35665,
        lng: 114.12623,
      },
      venuelist:[
        {lat: 22.35665,lng: 114.12623,},
        {lat: 22.36665,lng: 114.12623,},
        {lat: 22.37665,lng: 114.12623,},
        {lat: 22.38665,lng: 114.12623,},
        {lat: 22.39665,lng: 114.12623,},
        {lat: 22.40665,lng: 114.12623,},
        {lat: 22.41665,lng: 114.12623,},
        {lat: 22.42665,lng: 114.12623,},
        {lat: 22.43665,lng: 114.12623,},
        {lat: 22.44665,lng: 114.12623,},
      ],
    }
  }

  centerUpdate(){
    this.setState({center:{lat:0,lng:0}})
  }
  render() {
    return (
      <div>
        <Header name="User Page" user='{this.props.user}'/>
          <div style={mapstyle} class="card d-inline-block m-2">
            <Mapp center={this.state.center} venuelist={this.state.venuelist}/>
            <venueList></venueList>
            <button onClick={()=>{this.centerUpdate()}}>press mes</button>
          </div>
      </div>
    );
  }
}

function Mapp(props){
  const[pos,position]=useState(props.center);
  const[venue,venuePos]=useState(props.venuelist);

  useEffect(()=>position(props.center))
  useEffect(()=>venuePos(props.venuelist))
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDHzobelxj6hZ2p8gwxk3jpAkTRcXJfVYU',
    libraries,
  });

  function setCenter(i,e){
    if(props.key=this.i)
    props.center=e;
    console.log(e)
  }
  
  if (loadError) {
    return <div>Error loading maps</div>;
  }
  
  if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  let i=-1;
  return (
    <GoogleMap id='map' mapContainerStyle={mapContainerStyle} zoom={20} center={pos}>
      {
       venue.map((element) => {
        i++;
        return(<Marker position={element} key={i} onclick={(element)=>setCenter(i,element) }/>)
      })
      }
    </GoogleMap>
  );
};

export default UserPage;