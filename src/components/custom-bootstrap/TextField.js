import React,{Component} from 'react';
import {Form} from 'react-bootstrap';
import PasswordInput from './PasswordInput';

export default class TextField extends Component{
    renderForm(){
        const {
            input,
            meta: { error, warning, touched },
            type
        } = this.props;
        const validationState = (touched && ( error && "error" )) || (( warning && "warning" ) || null);
        if(type === 'password'){
            return(<PasswordInput 
                isInvalid={!!validationState} 
                {...input} 
                {...this.props}/>
            );
        } else if(this.isCheckType()){
           return (<Form.Check 
                isInvalid={!!validationState} type={type} 
                {...input} 
                {...this.props}/>);
        } else if(type === 'select'){
            return (<Form.Control isInvalid={!!validationState} { ...input }
                    as='select' { ...this.props }>
                        {this.props.children}
                    </Form.Control>);
        } else if(type === 'textarea'){
            return (<Form.Control isInvalid={!!validationState} { ...input }
                    as='textarea' { ...this.props } rows={4}/>);
        } else{
             return (<Form.Control isInvalid={!!validationState} { ...input }
                    type={ type }
                    { ...this.props } />);
        }
    }

    isCheckType = () => {
        return this.props.type === 'checkbox' || this.props.type === 'radio';
    }

    render(){
        const {
            meta: { error, warning, touched },
            type,
            label
        } = this.props;

        let message;

        if ( touched && ( error || warning ) ) {
            message = <Form.Control.Feedback type="invalid">{ error || warning }</Form.Control.Feedback>;
        }
        return (
            <Form.Group className={`${this.props.className} ${type === 'password' ? 'inner-addon right-addon' : ''}`}>
                {!!label  && !this.isCheckType() ? <Form.Label>{label}</Form.Label> : ''}
                {this.renderForm()}
                { message }
            </Form.Group>
        );
    }
}