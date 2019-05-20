import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import Select from './Select';
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
        const selectStyles = {control: (base) => !!validationState ? {...base,borderColor: '#dc3545'} : base};
        switch (type) {
            case 'password':
                return (<PasswordInput isInvalid={!!validationState} {...input} {...this.props}/>);
            case 'radio':
            case 'checkbox':
                return (<Form.Check.Input
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
            case 'select-search':
                return (
                    <Select
                    isInvalid={!!validationState}
                    { ...input }
                    styles={selectStyles}
                    isMulti
                    closeMenuOnSelect={false}
                    { ...this.props }/>
                );
            case 'textarea':
                return (<Form.Control
                    isInvalid={!!validationState}
                    { ...input }
                    as='textarea'
                    { ...this.props }
                    rows={4}/>);
            case 'select-multiple':
                return (<Select
                    isInvalid={!!validationState}
                    { ...input }
                    styles={selectStyles}
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
            label,
            labellink,
            className
        } = this.props;

        let message;

        if (touched && (error || warning)){
            if(type === 'select-multiple') message = <div className="invalid-feedback-select-multiple">{error || warning}</div>
            else message = <Form.Control.Feedback type="invalid">{error || warning}</Form.Control.Feedback>;
        }
        if (type === 'checkbox' || type === 'radio'){
            return (<Form.Check type={type}>
                {this.renderForm()}
                <Form.Check.Label>{label}{labellink}</Form.Check.Label>
                {message}
            </Form.Check>);
        }
        else return (
            <Form.Group
                className={`${className ? className : ''} ${type === 'password'
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