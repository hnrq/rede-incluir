import React, {Component} from 'react';
import {Field, reduxForm,formValueSelector,autofill} from 'redux-form';
import {Form, Button, Row, Col, Modal} from 'react-bootstrap';
import InputField from '../custom-bootstrap/InputField';
import {signUp} from '../../firebase/auth';
import {connect} from 'react-redux';
import {createTextMask} from 'redux-form-input-masks';
import {validateCNPJ} from '../../utils/cnpjUtils';
import axios from 'axios';

class SignupCompanyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTerms: false
        }
    }

    handleShowTerms = () => this.setState({showTerms: true});

    handleCloseTerms = () => this.setState({showTerms: false});

    submit = (values) => {
        delete values.termsAndConditions;
        signUp(values, true);
    }

    render() {
        const {submitting, handleSubmit} = this.props;
        return (
            <div>
                <h1>Crie a conta da sua empresa</h1>
                <Form onSubmit={handleSubmit(this.submit)}>
                    <Row>
                        <Col>
                            <Field
                                name="cnpj"
                                type='text'
                                component={InputField}
                                label="CNPJ"
                                placeholder="Ex.: 00.000.000/0000-00"
                                {...cnpjMask}/>
                        </Col>
                        <Col>
                            <Field
                                name="name"
                                type='text'
                                component={InputField}
                                label="Razão Social"
                                placeholder="Ex.: Apple Inc."/>
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
                                name="zipCode"
                                component={InputField}
                                type="text"
                                label="CEP"
                                placeholder="Ex.: 00.000-000"
                                {...zipCodeMask}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Field
                                name="street"
                                component={InputField}
                                type="text"
                                label="Endereço"
                                placeholder="Ex.: Rua do Zé"/>
                        </Col>
                        <Col md={2}>
                            <Field
                                name="number"
                                component={InputField}
                                type="text"
                                label="Número"
                                placeholder="Ex.: 33"/>
                        </Col>
                        <Col md={3}>
                            <Field
                                name="complement"
                                component={InputField}
                                type="text"
                                label="Bloco/Andar"
                                placeholder="Ex.: 9º andar, Bloco 5"/>
                        </Col>
                        <Col md={3}>
                            <Field
                                name="neighborhood"
                                component={InputField}
                                type="text"
                                label="Bairro"/>
                        </Col>
                    </Row>
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
                    <Row>
                        <Col>
                            <Field
                                style={{display: 'inline-block'}}
                                name="termsAndConditions"
                                component={InputField}
                                type="checkbox"
                                label={"Li e aceito os "}
                                labellink={
                                    <Button variant="link" style={{padding:0,verticalAlign:'baseline'}}
                                    onClick={this.handleShowTerms}>
                                    termos de condições</Button>
                                }
                                placeholder="No mínimo 6 caracteres"/>
                                <div style={{width:'5px',height:'auto',display:'inline-block'}}/>
                            
                        </Col>
                    </Row>

                    <Button disabled={submitting} block type="submit" size="lg">Criar conta</Button>
                </Form>
                <Modal size="lg" show={this.state.showTerms} onHide={this.handleCloseTerms}>
                    <Modal.Header closeButton>Termos e condições</Modal.Header>
                    <Modal.Body>
                        TERMOS E CONDIÇÕES
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
};

const cnpjMask = createTextMask({pattern: '99.999.999/9999-99',guide:false});
const zipCodeMask = createTextMask({pattern: '99.999-999', guide: false});

const validate = values => {
    const errors = {}
    if (!values.name) 
        errors.name = 'Campo obrigatório.';
    if (!validateCNPJ(values.cnpj)) 
        errors.cnpj = 'CNPJ inválido.'
    if (!values.cnpj) 
        errors.cnpj = 'Campo obrigatório.';
    if(!values.zipCode)
        errors.zipCode = 'Campo obrigatório.';
    if(!values.street)
        errors.street = 'Campo obrigatório.';
    if(!values.neighborhood)
        errors.neighborhood = 'Campo obrigatório.';
    if(!values.number)
        errors.number = 'Campo obrigatório.';
    if (!values.email) 
        errors.email = 'Campo obrigatório.';
    if (!values.termsAndConditions) 
        errors.termsAndConditions = 'Você deve aceitar os termos para criar sua conta.';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) 
        errors.email = 'Email Inválido';
    if (!values.password) 
        errors.password = 'Campo obrigatório.';
    else if (values.password.length < 6) 
        errors.password = 'A senha deve conter pelo menos 6 caracteres';
    return errors;
}

const asyncValidate = (values, dispatch) => {
    if(values.zipCode && values.zipCode.length === 8)
     return axios.get(`https://viacep.com.br/ws/${values.zipCode}/json/ `)
            .then((response) => {
                const {data} = response;
                dispatch(autofill('signupCompany','street',data.logradouro));
                dispatch(autofill('signupCompany','city',data.localidade));
                dispatch(autofill('signupCompany','neighborhood',data.bairro));
                dispatch(autofill('signupCompany','state',data.uf));
                if(data.erro) {
                   const error = {zipCode: 'CEP inválido.'}; throw error;
                }
            });
    else return new Promise((resolve) => { const error = {zipCode: 'CEP inválido.'}; throw error});
}

const selector = formValueSelector('signupCompany');

export default connect(state => {
    const zipCode = selector(state, 'zipCode');
    return {zipCode};
})(reduxForm({form: 'signupCompany', validate, asyncValidate, asyncBlurFields: ['zipCode']})(SignupCompanyForm));