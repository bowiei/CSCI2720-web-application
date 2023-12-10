import React from 'react';

const formStyle={
    padding:'5px',
    width:'50%',
    border:'2px solid green',
}
const textAreaStyle={
    width:"100%",
    height:'100px'
}

class Form extends React.Component {
    render() {
        return (
            <div class="card d-inline-block m-2" style={formStyle}>
                <form action="" method="post" id="userComment" class="fo rm-example" > 
                    <div>
                    <label for='comment'>Comment something</label>
                    <br/>
                    <textarea name='comment'required style={textAreaStyle}/>
                    </div>
                    <div class="form-example">
                        <input type="submit" value="Submit!" class="btn btn-outline-success"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Form;