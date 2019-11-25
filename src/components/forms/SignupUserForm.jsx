import React, {Component} from 'react';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import {Form, Button, Row, Col} from 'react-bootstrap';
import InputField from '../custom-bootstrap/InputField';
import {signUp} from '../../firebase/auth';
import {disabilities} from '../../utils/Disabilities';
import { createTextMask } from 'redux-form-input-masks';

class SignupUserForm extends Component {
    submit = (values) => signUp(values);

    render() {
        const {submitting, handleSubmit} = this.props;
        return (
            <div>
                <h1>Crie sua conta</h1>
                <Form onSubmit={handleSubmit(this.submit)}>
                    <Row>
                        <Col>
                            <Field
                                name="firstName"
                                type='text'
                                component={InputField}
                                label="Nome"
                                placeholder="Ex.: John"/>
                        </Col>
                        <Col>
                            <Field
                                name="lastName"
                                type='text'
                                component={InputField}
                                label="Sobrenome"
                                placeholder="Ex.: Doe"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field
                                name="email"
                                type='email'
                                component={InputField}
                                label="E-mail"
                                placeholder="Ex.: johndoe@email.com"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field
                                style={{
                                marginBottom: 5
                            }}
                                name="disabilities"
                                closeMenuOnSelect={false}
                                type='select-multiple'
                                component={InputField}
                                placeholder="Selecione uma ou mais deficiências"
                                options={disabilities}
                                label="Deficiências"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field
                                name="hasCID10"
                                component={InputField}
                                type="checkbox"
                                label={"Possuo diagnóstico de patologia listada no CID10"}/>
                        </Col>
                    </Row>
                    {this.props.hasCID10
                        ? <Row>
                                <Col>
                                    <Field
                                        name="cid10"
                                        component={InputField}
                                        options={disabilities}
                                        label="Código CID10"
                                        {...cid10Mask}
                                        placeholder="Ex.: F41"/>
                                </Col>
                            </Row>
                        : null}
                    <Row>
                        <Col>
                            <Field
                                name="password"
                                component={InputField}
                                type="password"
                                label="Senha"
                                placeholder="No mínimo 6 caracteres"/>
                        </Col>
                    </Row>
                    <Button disabled={submitting} block type="submit" size="lg">Criar conta</Button>
                </Form>
            </div>

        );
    }
};

const maskDefinitions = {
    9: {
        regExp: /[0-9]/
    },
    A: {
        regExp: /[A-Za-z]/,
        transform: char => char.toUpperCase()
    }
};

const cid10Mask = createTextMask({pattern: 'A99',maskDefinitions,guide:false})

const validate = values => {
    const errors = {}
    if (!values.firstName) 
        errors.firstName = 'Campo obrigatório.';
    if (!values.lastName) 
        errors.lastName = 'Campo obrigatório.';
    if (!values.email) 
        errors.email = 'Campo obrigatório.';
    if(!values.disabilities) 
        errors.disabilities = 'Selecione pelo menos uma deficiência.'
    if(values.disabilities && values.disabilities.length === 0)
        errors.disabilities = 'Selecione pelo menos uma deficiência.'
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) 
        errors.email = 'Email Inválido';
    if (!values.password) 
        errors.password = 'Campo obrigatório.';
    else if (values.password.length < 6) 
        errors.password = 'A senha deve conter pelo menos 6 caracteres';
    return errors;
}

const selector = formValueSelector('signupUser');

export default connect(state => {
    const hasCID10 = selector(state, 'hasCID10');
    return {hasCID10};
})(reduxForm({form: 'signupUser', validate})(SignupUserForm));