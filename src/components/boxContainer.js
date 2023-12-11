import React, { Component } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import App from "../app.jsx"
class BoxContainer extends React.Component {
  render() {
    return <Backgournd>
        <App> 

        </App>
    </Backgournd>;
  }
}

export default BoxContainer;

const Backgournd = styled.div`
    width: 100vw;
    height: 100vh;
    background-color = #eee;
    overflow: hidden;
    display : flex;
    justify-content: space-around;
    margin-top: 50px
`;
