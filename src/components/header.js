import React from 'react';

class Title extends React.Component {
    render() {
        return (
            <header className="bg-warning">
            <h1 className="display-4 text-center">{this.props.name}</h1>
            <button>Log out</button>
            </header>
        ); 
    }
}

class Header extends React.Component{
    render(){
        return (
            <Title name={this.props.name} />
        );
    }
}

export default Header;