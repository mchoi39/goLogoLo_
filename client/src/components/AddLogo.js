import React, {Component} from 'react';
import {Rnd} from 'react-rnd';


class AddLogo extends Component {
    // state = {
    //     link :""
    // }
    // linkHandler =(e) => this.setState({[e.target.name]:e.target.value});
    // submitHandler = (e) => {
    //     e.preventDefault();
    //     this.props.addLink(this.state.link);
    //     this.setState({link: ''});
    // }

    render() {
        console.log("herro")
        return this.props.logoName.map((logo)=> (
            
            <div>
                <Rnd
                    // size={{ width: this.state.renderWidth,  height: this.state.renderHeight }}
                    // position={{ x: this.state.renderX, y: this.state.renderY }}
                    style= {{
                        //display: "inline-block",
                        text: logo,
                        color: "#000000",
                        fontSize: this.props.textProp == logo ? this.props.textSizeProp + "pt" ? this.props.textSizeProp + "pt" : 44 + "pt" : 44 + "pt",
                        
                    }}
                    onDragStop={(e, d) => { this.setState({ renderX: d.x, renderY: d.y }) }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.setState({
                        renderWidth: ref.style.width,
                        renderHeight: ref.style.height,
                        ...position,
                        });
                    }}
                    >
                    {logo}
                    
                    
                    
                    </Rnd>
                {/* <img src={link} alt="https://lorempixel.com/100/190/nature/6"/> */}
            </div>
            
        ))
        

    }
}

export default AddLogo