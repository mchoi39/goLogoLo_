import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { clamp } from '../utils/utlity';
import {Rnd} from 'react-rnd';
import AddImage from './AddImage';
import AddLogo from './AddLogo';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!,
        $height: Int!,
        $width: Int!,
        $x: Int!,
        $y: Int!,
        $images: [String!]!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderWidth: $borderWidth,
            borderRadius: $borderRadius,
            padding: $padding,
            margin: $margin,
            height: $height,
            width: $width,
            x: $x,
            y: $y,
            images: $images) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            logos: {
                
            },
            renderWidth: 200,
            renderHeight: 200,
            renderX: 10,
            renderY: 10,
            renderText: "",
            renderColor: "",
            renderBackgroundColor: "",
            renderBorderColor: "",
            renderBorderWidth: "",
            renderBorderRadius: "",
            renderFontSize: "",
            renderPadding: "",
            renderMargin: "",
            logos: [],
            images: [],
            newLogoText: "New Logo",
            newLogoColor: "",
            newLogoFont: "",
            logoToDelete: "",
            fontSizeEdit: "",
            colorChangeEdit: "",
            logoToEdit: "",
            link: ""
        }
    }
    addLink = () => {
        
        this.setState({images: [...this.state.images, this.state.link]})
    }
    addLogo = () => {
        console.log("pressed")
        this.setState({logos: [...this.state.logos, this.state.newLogoText]})
    }

    deleteLogo = () => {
        var array = [...this.state.logos]; // make a separate copy of the array
        var index = array.indexOf(this.state.logoToDelete)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({logos: array});
        }
    }
    fontChange = () => {
        this.forceUpdate()
        
    }
    
    linkHandler = (e) => this.setState({link:e.target.value});
    logoHandler = (e) => this.setState({newLogoText: e.target.value});
    deleteHandler = (e) => this.setState({logoToDelete: e.target.value});
    whichLogoChangeHandler = (e) => this.setState({logoToEdit: e.target.value});
    newFontChangeHandler = (e) => this.setState({fontSizeEdit: e.target.value});

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderWidth, borderRadius, padding, margin;
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body row">
                                <form className="col-6" onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                                            backgroundColor: backgroundColor.value, borderColor: borderColor.value,
                                                            borderWidth: parseInt(borderWidth.value), borderRadius: parseInt(borderRadius.value),
                                                            padding: parseInt(padding.value), margin: parseInt(margin.value), width: parseInt(this.state.renderWidth), height: parseInt(this.state.renderHeight), x: parseInt(this.state.renderX), y: parseInt(this.state.renderY), images: ["hello"]  } });
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";
                                    borderWidth.value = "";
                                    borderRadius.value = "";
                                    padding.value = "";
                                    margin.value = "";
                                    // this.state.width = "";
                                    // this.state.height = "";
                                    // this.state.x = "";
                                    // this.state.y = "";
                                }}>
                                    <div className="form-group col-4">
                                    <div>
                                                    <Rnd 
                                                    ref={c => { this.rnd = c; }}
                                                        style= {{
                                                            display: "inline-block",
                                                            backgroundColor: this.state.renderBackgroundColor ? this.state.renderBackgroundColor : "#FFFFFF",
                                                            borderColor: this.state.renderBorderColor ? this.state.renderBorderColor : "#000000",
                                                            borderStyle: "solid",
                                                            borderWidth: (this.state.renderBorderWidth ? this.state.renderBorderWidth : 5) + "px",
                                                            borderRadius: (this.state.renderBorderRadius ? this.state.renderBorderRadius : 5) + "px",
                                                        }}
                                                        default= {{
                                                            x: 150,
                                                            y: 0,
                                                            width: 1080,
                                                            height: 1000
                                                        }}
                                                        disableDragging={true}
                                                        enableResizing={false}       
                                                        >
                                                    
                                                    </Rnd>
                                                </div>
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" className="form-control" name="text" ref={node => {
                                            text = node;
                                        }} onChange={() => this.setState({renderText: text.value})} placeholder="Text" />
                                    </div>
                                    <div className="form-group col-4">
                                                    <input type="text" className="form-control" onChange={this.logoHandler} placeholder="Logo Name" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                                    <div className="input-group-append">
                                                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.addLogo}>Add Logo</button>
                                                    </div>
                                                </div>
                                                <div className="form-group col-4">
                                                    <input type="text" className="form-control" onChange={this.deleteHandler} placeholder="Logo Name" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                                    <div className="input-group-append">
                                                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.deleteLogo}>Delete Logo</button>
                                                    </div>
                                                </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }}onChange={() => this.setState({renderColor: color.value})} placeholder="Color" />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} onChange={() => this.setState({renderBackgroundColor: backgroundColor.value})} placeholder="Background Color" />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} onChange={() => this.setState({renderBorderColor: borderColor.value})} placeholder="Border Color" />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="text" onInput={()=>{fontSize.value = clamp(fontSize.value, 0, 144);}} className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} onChange={() => this.setState({renderFontSize: parseInt(fontSize.value)})} placeholder="Font Size" />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} onChange={() => this.setState({renderBorderWidth: parseInt(borderWidth.value)})} placeholder="Border Width" />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} onChange={() => this.setState({renderBorderRadius: parseInt(borderRadius.value)})} placeholder="Border Radius" />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" onInput={()=>{padding.value = clamp(padding.value, 0, 100);}} className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} onChange={() => this.setState({renderPadding: parseInt(padding.value)})} placeholder="Padding" />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="number" onInput={()=>{margin.value = clamp(margin.value, 0, 100);}} className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} onChange={() => this.setState({renderMargin: parseInt(margin.value)})} placeholder="Margin" />
                                    </div>
                                    <div className="form-group col-4">
                                                    <input type="text" className="form-control" onChange={this.linkHandler} placeholder="Image Link" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                                    <div className="input-group-append">
                                                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.addLink}>Add Image</button>
                                                    </div>
                                                </div>
                                                {/* <div className="form-group col-4">
                                                    <label>New Color Edit:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        color = node;
                                                    }}onChange={() => this.setState({colorChangeEdit: color.value})} placeholder={data.logo.color} defaultValue={data.logo.color} />
                                                </div> */}
                                                <div className="form-group col-4">
                                                    <input type="text" className="form-control" onChange={this.whichLogoChangeHandler} placeholder="Logo Name" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                                    <input type="text" className="form-control" onChange={this.newFontChangeHandler} placeholder="New Font Size" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                                    <div className="input-group-append">
                                                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.fontChange}>New Font</button>
                                                    </div>
                                                </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                <div className="col-6">
                                <Rnd
                                                style= {{
                                                    //display: "inline-block",
                                                    color: this.state.renderColor ? this.state.renderColor : "#000000",
                                                    fontSize: (this.state.renderFontSize ? this.state.renderFontSize : 12) + "pt",
                                                }}
                                                size={{ width: this.state.renderWidth,  height: this.state.renderHeight }}
                                                position={{ x: this.state.renderX, y: this.state.renderY }}
                                                onDragStop={(e, d) => { this.setState({ renderX: d.x, renderY: d.y }) }}
                                                onResizeStop={(e, direction, ref, delta, position) => {
                                                    this.setState({
                                                    renderWidth: ref.style.width,
                                                    renderHeight: ref.style.height,
                                                    ...position,
                                                    });
                                                }}
                                                >
                                                {this.state.renderText ? this.state.renderText :  "New Logo"}
                                                </Rnd>
                                    
                                </div>
                                <div className="col-6">
                                                <AddImage images={this.state.images}/>
                                            </div>


                                            <div className="col-6">
                                                <AddLogo logoName={this.state.logos} textSizeProp={this.state.fontSizeEdit} colorChangeProp={this.state.colorChangeEdit} textProp={this.state.logoToEdit}/>
                                            </div>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;