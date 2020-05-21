import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { clamp } from "../utils/utlity";
import {Rnd} from "react-rnd";
import AddImage from './AddImage';
import AddLogo from './AddLogo';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf'

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderWidth
            borderRadius
            padding
            margin
            height
            width
            x
            y
            images
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
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
        $y: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderWidth: $borderWidth,
                borderRadius: $borderRadius,
                padding: $padding,
                margin: $margin,
                height: $height,
                width: $width,
                x: $x,
                y: $y) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

    constructor(props){
        super(props)


        this.state = {
            link: "",
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
            logoToEdit: ""
                
            
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
    exportImage = (e) => {
        console.log("export")
        // const input = document.getElementById('allLogos');
        const input = document.body;
        console.log(input)
        
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'px', 'a4');
                var width = pdf.internal.pageSize.getWidth();
                var height = pdf.internal.pageSize.getHeight();

                pdf.addImage(imgData, 'JPEG', -100, -50, width, height);
                pdf.save("test.pdf");
            });
    }
    

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderWidth, borderRadius, padding, margin, colorChangeEdit;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body row">                                            
                                            <form className="col-6" onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                                                            backgroundColor: backgroundColor.value, borderColor: borderColor.value,
                                                                            borderWidth: parseInt(borderWidth.value), borderRadius: parseInt(borderRadius.value),
                                                                            padding: parseInt(padding.value), margin: parseInt(margin.value),width: parseInt(this.state.renderWidth), height: parseInt(this.state.renderHeight), x: parseInt(this.state.renderX), y: parseInt(this.state.renderY)  } });
                                                text.value = "";
                                                color.value = "";
                                                fontSize.value = "";
                                                backgroundColor.value = "";
                                                borderColor.value = "";
                                                borderWidth.value = "";
                                                borderRadius.value = "";
                                                padding.value = "";
                                                margin.value = "";
                                                // width.value = "";
                                                // height.value = "";
                                                // x.value = "";
                                                // y.value = "";
                                                
                                            }}>
                                                <div className="form-group col-8">
                                                <button type="button" className="btn btn-primary btn-sm" onClick={this.exportImage}>Export Image</button>

                                                    </div>
                                                <div className="form-group col-4">
                                                <div>
                                                    <Rnd 
                                                    ref={c => { this.rnd = c; }}
                                                        style= {{
                                                            display: "inline-block",
                                                            backgroundColor: this.state.renderBackgroundColor ? this.state.renderBackgroundColor : data.logo.backgroundColor,
                                                            borderColor: this.state.renderBorderColor ? this.state.renderBorderColor : data.logo.borderColor,
                                                            borderStyle: "solid",
                                                            borderWidth: (this.state.renderBorderWidth ? this.state.renderBorderWidth : data.logo.borderWidth) + "px",
                                                            borderRadius: (this.state.renderBorderRadius ? this.state.renderBorderRadius : data.logo.borderRadius) + "px",
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
                                                    }} onChange={() => this.setState({renderText: text.value})} placeholder={data.logo.text} defaultValue={data.logo.text} />
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
                                                    }}onChange={() => this.setState({renderColor: color.value})} placeholder={data.logo.color} defaultValue={data.logo.color} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} onChange={() => this.setState({renderBackgroundColor: backgroundColor.value})} placeholder={data.logo.backgroundColor} defaultValue={data.logo.backgroundColor} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} onChange={() => this.setState({renderBorderColor: borderColor.value})} placeholder={data.logo.color} defaultValue={data.logo.borderColor} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="text" onInput={()=>{fontSize.value = clamp(fontSize.value, 0, 144);}} className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} onChange={() => this.setState({renderFontSize: parseInt(fontSize.value)})} placeholder={data.logo.fontSize} defaultValue={data.logo.fontSize} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} onChange={() => this.setState({renderBorderWidth: parseInt(borderWidth.value)})} placeholder={data.logo.borderWidth} defaultValue={data.logo.borderWidth} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} onChange={() => this.setState({renderBorderRadius: parseInt(borderRadius.value)})} placeholder={data.logo.borderRadius} defaultValue={data.logo.borderRadius} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="number" onInput={()=>{padding.value = clamp(padding.value, 0, 100);}} className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} onChange={() => this.setState({renderPadding: parseInt(padding.value)})} placeholder={data.logo.padding} defaultValue={data.logo.padding} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="number" onInput={()=>{margin.value = clamp(margin.value, 0, 100);}} className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} onChange={() => this.setState({renderMargin: parseInt(margin.value)})} placeholder={data.logo.margin} defaultValue={data.logo.margin} />
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
                                                    <input type="text" className="form-control" onChange={this.whichLogoChangeHandler} placeholder="Image Link" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                                    <input type="text" className="form-control" onChange={this.newFontChangeHandler} placeholder="Image Link" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                                    <div className="input-group-append">
                                                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.fontChange}>New Font</button>
                                                    </div>
                                                </div>
                                                {/* <div className="custom-file">
                                                    <input type="file" className="custom-file-input" id="customFile"/>
                                                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                                </div> */}
                                                
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            </form>
                                            <div className="container" id="allLogos">
                                                
                                            <div>
                                                <Rnd
                                                style= {{
                                                    color: this.state.renderColor ? this.state.renderColor : data.logo.color,
                                                  
                                                    fontSize: (this.state.renderFontSize ? this.state.renderFontSize : data.logo.fontSize) + "pt",
                                                     }}
                                                default= {{
                                                    x: data.logo.x,
                                                    y: data.logo.y,
                                                    width: data.logo.width,
                                                    height: data.logo.height
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
                                                {this.state.renderText ? this.state.renderText :  data.logo.text}
                                                </Rnd>
                                                </div>
                                            <div className="col-6">
                                            
                                                {/* <span style={{
                                                    display: "inline-block",
                                                    color: this.state.renderColor ? this.state.renderColor : data.logo.color,
                                                    backgroundColor: this.state.renderBackgroundColor ? this.state.renderBackgroundColor : data.logo.backgroundColor,
                                                    borderColor: this.state.renderBorderColor ? this.state.renderBorderColor : data.logo.borderColor,
                                                    borderStyle: "solid",
                                                    fontSize: (this.state.renderFontSize ? this.state.renderFontSize : data.logo.fontSize) + "pt",
                                                    borderWidth: (this.state.renderBorderWidth ? this.state.renderBorderWidth : data.logo.borderWidth) + "px",
                                                    borderRadius: (this.state.renderBorderRadius ? this.state.renderBorderRadius : data.logo.borderRadius) + "px",
                                                    padding: (this.state.renderPadding ? this.state.renderPadding : data.logo.padding) + "px",
                                                    margin: (this.state.renderMargin ? this.state.renderMargin : data.logo.margin) + "px"
                                                }}>{this.state.renderText ? this.state.renderText :  data.logo.text}</span> */}
                                            
                                            <div className="col-6">
                                                <AddImage images={this.state.images}/>
                                            </div>


                                            <div className="col-6">
                                                <AddLogo logoName={this.state.logos} textSizeProp={this.state.fontSizeEdit} colorChangeProp={this.state.colorChangeEdit} textProp={this.state.logoToEdit}/>
                                            </div>
                                            </div>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;