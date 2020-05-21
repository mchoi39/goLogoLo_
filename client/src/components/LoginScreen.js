import React, {Component} from 'react';


class LoginScreen extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            width: 200,
            height: 200,
            x: 10,
            y: 10
          };
    }

    render(){
        return(
            <div className='container col'>
                <div className='col s4'>
                    <label id='username'> Register </label>
                    
                </div>
                <div className='col s4'>
                    
                    <label id='username'> Username </label>
                    <input type='text' id='username' name='username' required/>
                </div>
                <div className='col s6'>
                    <label id='pwd'> Password </label>
                    <input type='password' id='pwd' name='pwd' minLength='8' required/>
                    
                </div>
                <div className='col s6'>
                    <label id='pwd'> Confirm Password </label>
                    <input type='password' id='pwd' name='pwd' minLength='8' required/>
                    
                </div>
                <div>
                     <button> Submit </button>
                </div>
                {/* <Rnd
                    size={{ width: this.state.width,  height: this.state.height }}
                    position={{ x: this.state.x, y: this.state.y }}
                    onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.setState({
                        width: ref.style.width,
                        height: ref.style.height,
                        ...position,
                        });
                    }}
                    >
                    001
                    </Rnd> */}

            </div>
        )
    }
}

export default LoginScreen