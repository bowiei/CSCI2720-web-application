import React, { Component } from 'react';
import axios from 'axios';

const btn_style={
    marginLeft: '5px',
    backgroundColor: 'grey',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const ul_style = {
    listStyleType: 'none',
    padding: 0
  };

  const li_style = {
    backgroundColor: 'white',
    padding: '10 px',
    marginBottom: '10px'
  };


class FavoriteList extends Component {
constructor(props) {
      super(props);
      this.state = {
        favoriteLocations: [],
        venue_details: [],
        venueMap: [],
        updated: false
      };
    }
    
     componentDidMount(){
      this.fetchlist();
    }
    
    componentDidUpdate() {
      this.fetchlist();
    }
  
    fetchlist() {
        axios
          .get("http://localhost:5500/user/user1")       //need to update, replace the user1
          .then((response) => {
            const favoriteLocations = response.data.favoriteLocations;
            const venuePromises = favoriteLocations.map((locationId) =>
              axios.get(`http://localhost:5500/venue/find/${locationId}`)
            );
      
            Promise.all(venuePromises)
              .then((venueResponses) => {
                const venues = venueResponses.map((venueResponse) => venueResponse.data.address);
                this.setState({ favoriteLocations: venues }); 
                const objid = venueResponses.map((venueResponse) => venueResponse.data.venueID);
                this.setState({venueMap: objid});
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
  
      handleRemove = (index) => {
        const data = {
          venueID: this.state.venueMap[index]
        };
      
        axios.put(`http://localhost:5500/user/remove/user1`, data) //need to update, replace the user1
          .then((response) => {
            if (response.status === 404 || response.status === 400) {
              alert("Failed");
            } else {
              const updatedLocations = [...this.state.favoriteLocations];
              const updatedMap = [...this.state.venueMap];
              updatedLocations.splice(index, 1);
              updatedMap.splice(index, 1); 
              this.setState({ favoriteLocations: updatedLocations, venueMap: updatedMap });
              console.log("OK!");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

    render() {
      const { favoriteLocations } = this.state;
  
      return (
        <div>
          <h4>Favorite Locations</h4>
          <ul style = {ul_style}>
            {favoriteLocations.map((location, index) => (
              <li style={li_style} key={index}>
                {location}
                <button style = {btn_style} onClick = {()=>this.handleRemove(index)} >Remove</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
}

export default FavoriteList;
