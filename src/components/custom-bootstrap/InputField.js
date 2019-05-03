import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import SelectMultiple from './SelectMultiple';
import PasswordInput from './PasswordInput';

export default class InputField extends Component {
    renderForm() {
        const {
            input,
            meta: {
                error,
                warning,
                touched
            },
            type
        } = this.props;
        const validationState = (touched && (error && "error")) || ((warning && "warning") || null);
        switch (type) {
            case 'password':
                return (<PasswordInput isInvalid={!!validationState} {...input} {...this.props}/>);
            case 'radio':
            case 'checkbox':
                return (<Form.Check
                    isInvalid={!!validationState}
                    type={type}
                    {...input}
                    {...this.props}/>);
            case 'select':
                return (
                    <Form.Control
                        isInvalid={!!validationState}
                        { ...input }
                        as='select'
                        { ...this.props }>
                        {this.props.children}
                    </Form.Control>
                );
            case 'textarea':
                return (<Form.Control
                    isInvalid={!!validationState}
                    { ...input }
                    as='textarea'
                    { ...this.props }
                    rows={4}/>);
            case 'select-multiple':
                return (<SelectMultiple
                    isInvalid={!!validationState}
                    { ...input }
                    isMulti
                    closeMenuOnSelect={false}
                    { ...this.props }/>);
            default:
                return (<Form.Control
                    isInvalid={!!validationState}
                    { ...input }
                    type={type}
                    { ...this.props }/>);
        }
    }

    isCheckType = () => {
        return this.props.type === 'checkbox' || this.props.type === 'radio';
    }

    render() {
        const {
            meta: {
                error,
                warning,
                touched
            },
            type,
            label
        } = this.props;

        let message;

        if (touched && (error || warning)) {
            message = <Form.Control.Feedback type="invalid">{error || warning}</Form.Control.Feedback>;
        }
        return (
            <Form.Group
                className={`${this.props.className} ${type === 'password'
                ? 'inner-addon right-addon'
                : ''}`}
                style={this.props.style}>
                {!!label && !this.isCheckType()
                    ? <Form.Label>{label}</Form.Label>
                    : ''}
                {this.renderForm()}
                {message}
            </Form.Group>
        );
    }
}