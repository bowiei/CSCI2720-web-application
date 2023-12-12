import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header className="bg-warning" style={ {height: '75px', width: '100%'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6">
                            <h1 className="display-6">{this.props.name}</h1>
                        </div>
                        <div className="col-md-1  col-sm-2">
                            <h3>Login Avatar</h3>
                        </div>
                        <div className="col-md-1  col-sm-2">
                            <h3>Login Name</h3>
                        </div>
                        <div className="col-md-2  col-sm-2">
                            <h3>Logout btn</h3>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;