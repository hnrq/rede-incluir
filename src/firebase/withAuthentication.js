import React,{Component} from 'react';
import {firebaseAuth} from '../firebase/auth';
import {withRouter} from 'react-router-dom';

export default function withAuthentication(wrappedComponent){
    class AuthenticatedComponent extends React.Component {
        constructor(props){
            super(props);
            if(!firebaseAuth.currentUser) props.history.push('/');
        }

        componentDidReceive(prevProps) {
            if (!firebaseAuth.currentUser) prevProps.history.push('/');
        }

        render(){
            return <wrappedComponent {...this.props}/>
        }
    }

    return withRouter(AuthenticatedComponent);
}