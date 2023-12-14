import React from 'react';

class Header extends React.Component {
    getRandomAvatar = () => {
        const avatarContext = require.context("../assets/avatar", false, /\.(png|jpe?g|svg)$/);
        const avatarFiles = avatarContext.keys();
        const randomIndex = Math.floor(Math.random() * avatarFiles.length);
        const randomAvatarPath = avatarContext(avatarFiles[randomIndex]);
        // console.log("path : " , randomAvatarPath);
        return randomAvatarPath;
      };

    render() {
        return (
            <>
                <header className="bg-warning" style={{ height: '75px', width: '100%' }}>
                <div className="row">
                    <div className="col-md-8 col-sm-9">
                    <h1 className="display-6" style={projectName}>{this.props.name}</h1>
                    </div>
                    <div className="col-md-4 col-sm-3 d-flex align-items-center justify-content-end">
                        <div style={container}>
                            <div className="avatar" style={avatar}>
                                <img src={this.getRandomAvatar()} alt="User Avatar" style={avatarImg}/>
                            </div>
                            <div style={userName}>{this.props.user} test </div>
                        </div>
                        
                        <button style={logout} className="btn btn-danger btn-sm">Logout</button>
                    </div>
                </div>
                </header>
            </>
        );
    }
}

const container = {
    display: "flex",
    alignItems: "left",
    backgroundColor: "#f1f1f1",
    padding: "6px 10px 10px 10px",
    margin: "12px 10px 0px 0px",
    borderRadius: "25px",
    width: "auto",
}
  
const avatar = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "5px 0px 0px 0px",
    border: "2px solid #888"
}
  
const avatarImg = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }
  
const userName = {
    padding: "8px",
    fontSize: "14px",
}

const projectName={
    textAlign:'left',
    margin:'14px 0px 0px 20px',
}

const logout={
    margin: '19px 60px 0px 0px',
    float:'right',
}

export default Header;