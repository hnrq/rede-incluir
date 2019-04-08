import React,{Component} from 'react';
import {firebaseAuth} from '../firebase/auth';
import {withRouter} from 'react-router-dom';

export default function withAuthentication(wrappedComponent){
    class AuthenticatedComponent extends React.Component {
        componentWillMount(){
            if(!firebaseAuth.currentUser) this.props.history.push('/');
        }

        componentWillReceiveProps(nextProps) {
            if (!firebaseAuth.currentUser) this.props.history.push('/');
        }

        render(){
            return <wrappedComponent {...this.props}/>
        }
    }

    return withRouter(AuthenticatedComponent);
}