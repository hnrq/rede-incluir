import React,{Component} from 'react';
import {Field, reduxForm,formValueSelector} from 'redux-form';
import {Form,Button,Row,Col,Container} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {connect} from 'react-redux';
import TextField from '../custom-bootstrap/TextField';

class ExperienceForm extends Component{

    submit = (values) => {
        const {editMode,closeModal} = this.props;
        editMode ? toast.success("Editado com sucesso") : toast.success("Adicionado com sucesso");
        console.log(values);
        closeModal();
    }

    
    render(){
        const {submitting,handleSubmit,editMode,isCurrentWork} = this.props;
        return(
            <Container style={{padding:'25px'}}>
            <h1>{editMode ? 'Editar' : 'Adicionar'} experiência</h1>
            <Form onSubmit={handleSubmit(this.submit)}>
                <Row>
                    <Col>
                        <Field name="post"
                        type = 'text'
                        component = {TextField}
                        placeholder = {"Cargo"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Field name="company"
                        type = 'text'
                        component = {TextField}
                        placeholder = {"Empresa"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Field name="location"
                        component = {TextField}
                        type="text"
                        placeholder = {"Localidade"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field name="isCurrentWork"
                        component = {TextField}
                        type="checkbox" onToggle={this.toggleIsCurrentWork}
                        label = {"Trabalho aqui atualmente"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field name="startMonth"
                        component={TextField}
                        type="select"
                        label={'Data de inicio'}>
                            <option value="0">Jan</option>
                            <option value="1">Fev</option>
                            <option value="2">Mar</option>
                            <option value="3">Abr</option>
                            <option value="4">Mai</option>
                            <option value="5">Jun</option>
                            <option value="6">Jul</option>
                            <option value="7">Ago</option>
                            <option value="8">Set</option>
                            <option value="9">Out</option>
                            <option value="10">Nov</option>
                            <option value="11">Dez</option>
                        </Field>
                    </Col>
                    {
                        !isCurrentWork && (
                            <Col>
                                <Field name="endMonth"
                                component={TextField}
                                type="select"
                                label={'Data de término'}>
                                    <option value="0">Jan</option>
                                    <option value="1">Fev</option>
                                    <option value="2">Mar</option>
                                    <option value="3">Abr</option>
                                    <option value="4">Mai</option>
                                    <option value="5">Jun</option>
                                    <option value="6">Jul</option>
                                    <option value="7">Ago</option>
                                    <option value="8">Set</option>
                                    <option value="9">Out</option>
                                    <option value="10">Nov</option>
                                    <option value="11">Dez</option>
                                </Field>
                            </Col>
                        )
                    }
                </Row>
                <Row>
                    <Col>
                    <Field name="startYear"
                        component={TextField}
                        type="number" normalize={normalizeYear}/>
                    </Col>
                    {
                        !isCurrentWork && (
                        <Col>
                        <Field name="endYear"
                            component={TextField}
                            type="number" normalize={normalizeYear}/>
                        </Col>)
                    }
                </Row>
                <Button disabled={submitting} block type="submit" size="lg">Salvar</Button>
            </Form>
            </Container>
            
        );
    }
};

const normalizeYear = (value, previousValue) => {
    if (!value) return value
    if(value < 0) return previousValue;
    if (value.length > 4) return previousValue;
    if (value > new Date().getFullYear()) return new Date().getFullYear();
    return value;
}


const validate = values => {
    const errors = {};
    if(!values.post) errors.post = 'Campo Obrigatório';
    if(!values.company) errors.company = 'Campo Obrigatório';
    if(!values.location) errors.location = 'Campo Obrigatório';
    return errors;
}

const selector = formValueSelector('experience');

export default connect(state => {
    const isCurrentWork = selector(state,'isCurrentWork');
    return {
        isCurrentWork
    };
})(reduxForm({
    form: 'experience',
    validate
})(ExperienceForm));