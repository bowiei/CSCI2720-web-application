import React from 'react';

class Form extends React.Component {
    render() {
        return (
            <form id="text"> 
                <label> Testing </label>
                <input type="text" id="text"/>
                <input type="sumbit" value="sumbit"/>
            </form>
        );
    }
}

export default Form;