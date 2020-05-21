import React, {Component} from 'react';
import {Rnd} from 'react-rnd';


class AddImage extends Component {
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
        return this.props.images.map((link)=> (
            
            <div>
                <Rnd
                    // size={{ width: this.state.renderWidth,  height: this.state.renderHeight }}
                    // position={{ x: this.state.renderX, y: this.state.renderY }}
                    onDragStop={(e, d) => { this.setState({ renderX: d.x, renderY: d.y }) }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.setState({
                        renderWidth: ref.style.width,
                        renderHeight: ref.style.height,
                        ...position,
                        });
                    }}
                    >
                    <img src={link} alt=""/>
                    </Rnd>
                {/* <img src={link} alt="https://lorempixel.com/100/190/nature/6"/> */}
            </div>
            
        ))

    }
}

export default AddImage