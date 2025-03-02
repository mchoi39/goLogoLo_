import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import {Rnd} from "react-rnd";


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
            lastUpdate
            width
            height
            x
            y
            images
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {
    
    updatePosition = (x1,y1) => {
        this.rnd.updatePosition({ x: x1, y: y1 });
    }
    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    console.log(data.logo.height);
                    console.log(data.logo.width);
                    console.log(data.logo.x);
                    console.log(data.logo.y);

                    return (
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                    <h3 className="panel-title">
                                        View Logo
                                    </h3>
                                </div>
                                <div className="panel-body row">
                                    <div className="col-6">
                                        <dl>
                                            <dt>Text:</dt>
                                            <dd>{data.logo.text}</dd>
                                            <dt>Color:</dt>
                                            <dd>{data.logo.color}</dd>
                                            <dt>BackgroundColor:</dt>
                                            <dd>{data.logo.backgroundColor}</dd>
                                            <dt>BorderColor:</dt>
                                            <dd>{data.logo.borderColor}</dd>
                                            <dt>Font Size:</dt>
                                            <dd>{data.logo.fontSize}</dd>
                                            <dt>Border Width:</dt>
                                            <dd>{data.logo.borderWidth}</dd>
                                            <dt>Border Radius:</dt>
                                            <dd>{data.logo.borderRadius}</dd>
                                            <dt>Padding:</dt>
                                            <dd>{data.logo.padding}</dd>
                                            <dt>Margin:</dt>
                                            <dd>{data.logo.margin}</dd>
                                            <dt>Last Updated:</dt>
                                            <dd>{data.logo.lastUpdate}</dd>
                                            
                                        </dl>
                                        <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                    </div>
                                    <div className="col-6">

                                        <Rnd 
                                            ref={c => { this.rnd = c; }}
                                                style= {{
                                                    display: "inline-block",
                                                    color: data.logo.color,
                                                    backgroundColor: data.logo.backgroundColor,
                                                    borderColor: data.logo.borderColor,
                                                    borderStyle: "solid",
                                                    fontSize: data.logo.fontSize + "pt",
                                                    borderWidth: data.logo.borderWidth + "px",
                                                    borderRadius: data.logo.borderRadius + "px",
                                                    padding: data.logo.padding + "px",
                                                    margin: data.logo.margin + "px",
                                                }}
                                                default= {{
                                                    x: data.logo.x,
                                                    y: data.logo.y,
                                                    width: data.logo.width,
                                                    height: data.logo.height
                                                }}
                                                
                                                //updatePosition={{x: data.logo.x, y: data.logo.y}}
                                                //size={{ width: this.state.renderWidth,  height: this.state.renderHeight }}
                                                disableDragging={true}
                                                enableResizing={false}
                                                // updateSize={{width: data.logo.width, height: data.logo.height}}
                                                //position={{ x: this.state.renderX, y: this.state.renderY }}
                                                >
                                                {data.logo.text ? data.logo.text :  "New Logo"}
                                                </Rnd>
                                        {/* <span style={{
                                            display: "inline-block",
                                            color: data.logo.color,
                                            backgroundColor: data.logo.backgroundColor,
                                            borderColor: data.logo.borderColor,
                                            borderStyle: "solid",
                                            fontSize: data.logo.fontSize + "pt",
                                            borderWidth: data.logo.borderWidth + "px",
                                            borderRadius: data.logo.borderRadius + "px",
                                            padding: data.logo.padding + "px",
                                            margin: data.logo.margin + "px"
                                        }}>{data.logo.text}</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;