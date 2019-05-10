import React,{Component} from 'react';
import {Jumbotron} from 'react-bootstrap';
import SignupFormContainer from './forms/SignupFormContainer';
import {withRouter} from 'react-router-dom';
import { firebaseAuth } from '../firebase';

class Home extends Component{
    constructor(props){
        super(props);
        if(firebaseAuth.currentUser) props.history.push(`/${firebaseAuth.currentUser.uid}`);
    }
    render(){
        return (
            <Jumbotron>
               <SignupFormContainer/>
            </Jumbotron>
        );
    }
}

export default withRouter(Home);


