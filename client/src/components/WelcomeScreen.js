import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;



class WelcomeScreen extends Component {

    render() {
        return (
            <div className='container col'>
                <div className='col s4'>
                    <button> Login </button>
                    
                </div>
                <div className='col s4'>
                    <button> Register </button>
                    
                </div>
                
                <div>
                     <button> Submit </button>
                </div>
            </div>
        );
    }
}

export default WelcomeScreen;
