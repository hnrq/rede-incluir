import React,{Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form,Button,Row,Col} from 'react-bootstrap';
import { toast } from 'react-toastify';
import TextField from '../custom-bootstrap/TextField';

class SignupForm extends Component{
    submit = (values) => {
        toast.success("Conta criada");
        console.log(values);
    }

    
    render(){
        const {submitting,handleSubmit} = this.props;
        return(
            <div>
            <h1>Crie sua conta</h1>
            <Form onSubmit={handleSubmit(this.submit)}>
                <Row>
                    <Col>
                        <Field name = "firstName"
                        type = 'text'
                        component = {TextField}
                        placeholder = {"Nome"}/>
                    </Col>
                    <Col>
                        <Field name = "lastName"
                        type = 'text'
                        component = {TextField}
                        placeholder = {"Sobrenome"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Field name = "email"
                        type = 'email'
                        component = {TextField}
                        placeholder = {"E-mail"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Field name = "password"
                        component = {TextField}
                        type="password"
                        placeholder = {"Password"}/>
                    </Col>
                </Row>
                <Button disabled={submitting} block type="submit" size="lg">Salvar</Button>
            </Form>
            </div>
            
        );
    }
};

const validate = values => {
    const errors = {}
    if(!values.firstName) errors.firstName = 'Campo Obrigatório';
    if(!values.lastName) errors.lastName = 'Campo Obrigatório';
    if(!values.email) errors.email = 'Campo Obrigatório';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Email Inválido';
    if(!values.password) errors.password = 'Campo Obrigatório';
    else if(values.password.length < 6) errors.password = 'A senha deve conter pelo menos 6 caracteres';
    return errors;
}

export default reduxForm({
    form: 'signup',
    validate
})(SignupForm);