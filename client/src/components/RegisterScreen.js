import React, {Component} from 'react';

class RegisterScreen extends Component {
    render(){
        return(
            <form action='/register'> 
                <div>
                <label id='email'> Email </label>
                <input type='text' id='email' name='email' required/>
                <label id='pwd'> Password </label>
                <input type='password' id='pwd' name='pwd' minLength='8' required/>
                <button type="submit">Register</button>
                </div>
            </form>
            
        )
    }
}

export default RegisterScreen