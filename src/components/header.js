import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header className="bg-warning" style={ {height: '75px', width: '100%'}}>
                <div className="row">
                    <div className="col-md-9 col-sm-6">
                        <h1 className="display-6" style={projectName}>{this.props.name}</h1>
                    </div>
                    <div className="col-md-2  col-sm-4" style= { {marginTop: '15px'} }>
                        <h3>Avatar + Name</h3>
                    </div>
                    <div className="col-md-1  col-sm-2">
                        <button style={logout} className="btn btn-danger btn-sm">{this.props.user} Logout</button>
                    </div>
                </div>
            </header>
        );
    }
}

const projectName={
    textAlign:'left',
    margin:'12px 0px 0px 20px',
}

const logout={
    margin: '18px 60px 0px 0px',
    float:'right',
}

export default Header;