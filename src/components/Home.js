import React,{Component} from 'react';
import {Jumbotron} from 'react-bootstrap';
import SignupForm from './forms/SignupForm';

export default class Home extends Component{
    render(){
        return (
            <Jumbotron>
               <SignupForm/>
            </Jumbotron>
        );
    }
}


