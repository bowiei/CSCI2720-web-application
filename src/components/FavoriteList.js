import React, { Component } from 'react';

class FavoriteList extends Component {
  render() {
    return (
      <div>
            <h2>Favorite Locations</h2>
            <ul>
            {this.props.favoritevenues?.map((venue) => (
                <li>{venue}</li>
            ))}
            </ul>
      </div>
    );
  }
}

export default FavoriteList;
