import React from 'react';

const logout={
    margin:'3px',
    float:'right',
    right:"0px",
}

const header={
    height:'5vh',
    font_size:'5px',
}

class Title extends React.Component {
    render() {
        return (
            <h2 className="display-7 text-center">{this.props.name}</h2>
        ); 
    }
}

class Header extends React.Component{
    render(){
        return (
            <header className="bg-warning" style={header}>
                <button style={logout} class="btn btn-danger btn-sm">{this.props.user} Log out</button>
            <Title name={this.props.name}/>
            </header>
        );
    }
}

export default Header;