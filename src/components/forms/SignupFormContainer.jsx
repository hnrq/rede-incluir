import React, {Component} from 'react';
import {ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import SignupCompanyForm from './SignupCompanyForm';
import SignupUserForm from './SignupUserForm';

export default class SignupFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCompany: false
        }
    }

    toggleSignup = (value) => {
        if(value === 'company') this.setState({isCompany: true});
        else this.setState({isCompany: false});
    };

    render() {
        const {isCompany} = this.state;
        return ( 
        <div className="signup-form"> 
            <div className='signup-toggle' >
                <ToggleButtonGroup name="isCompany" onChange={this.toggleSignup}>
                <ToggleButton variant="outline-primary" className={isCompany ? '' : 'active'} value='user'>Usuário</ToggleButton>
                <ToggleButton variant="outline-primary" className={isCompany ? 'active' : ''} value='company'>Empresas</ToggleButton>
            </ToggleButtonGroup>
            </div>
            {isCompany? <SignupCompanyForm/> : <SignupUserForm/>} 
        </div>
        );
    }
};