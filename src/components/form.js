import React from 'react';

class Form extends React.Component {
    render() {
        return (
            <div class="card d-inline-block m-2">
                <form action="" method="post" id="userComment" class="fo rm-example"> 
                    <div>
                    <label for='comment'>Comment something</label>
                    <br/>
                    <textarea name='comment'required/>
                    </div>
                    <div class="form-example">
                        <input type="submit" value="Submit!"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Form;