import React,{Component} from 'react';
import {FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

export default class PasswordInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            isVisible: false
        }
    }

    toggleVisibility = (e) => {
        e.preventDefault();
        this.setState({isVisible: !this.state.isVisible});
    }

    render(){
        return(
            <>
                <FormControl {...this.props} type={this.state.isVisible ? 'text' : 'password'} className=""/>  
                < i className = "btn icon-button"
                onClick = {
                    this.toggleVisibility
                } > < FontAwesomeIcon
                icon={this.state.isVisible ? faEyeSlash : faEye} 
                className = "toggle-visibility"
                /></i>
            </>
        )
    } 
}