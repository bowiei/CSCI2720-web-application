import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

class Title extends React.Component {
    render() {
        return (
            <header className="bg-warning">
            <h1 className="display-4 text-center">{this.props.name}</h1> </header>
        ); 
    }
}

class App extends React.Component{
    render(){
        return (
            <Title name={this.props.name} />
        );
    }
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App name="Project"/>);