import React,{Component} from 'react';
import {Field, reduxForm,formValueSelector} from 'redux-form';
import {Form,Button,Row,Col,Modal} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {startAddExperience,startEditExperience} from '../../actions';
import {connect} from 'react-redux';
import TextField from '../custom-bootstrap/TextField';

class ExperienceForm extends Component{

    submit = (values) => {
        const {editMode,closeModal,startAddExperience,startEditExperience} = this.props;
        const data = {
            ...values,
            startDate: {
                'month': values.startMonth ? values.startMonth : 0,
                'year': values.startYear,
            },
            endDate: {
                'month': values.endMonth ? values.endMonth : 0,
                'year': values.endYear ? values.endYear : 0,
            },
        }
        delete data.id;
        delete data.startMonth;
        delete data.startYear;
        delete data.endMonth;
        delete data.endYear;
        delete data.type;

        if(editMode)
            startEditExperience(data,values.id).then(() => 
            toast.success("Editado com sucesso"))
        else
            startAddExperience(data).then(() => 
            toast.success("Adicionado com sucesso"))
        closeModal();
    }

    
    render(){
        const {submitting,handleSubmit,editMode,isCurrentWork,closeModal} = this.props;
        return(
            <Form onSubmit={handleSubmit(this.submit)}>
            <Modal.Header closeButton>
                <Modal.Title>{editMode ? 'Editar' : 'Adicionar'} experiência</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Field name="post"
                        type = 'text'
                        component = {TextField}
                        label = {"Cargo"}
                        placeholder = {"Cargo"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Field name="company"
                        type = 'text'
                        component = {TextField}
                        label = {"Empresa"}
                        placeholder = {"Empresa"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Field name="workLocation"
                        component = {TextField}
                        type="text"
                        label = {"Localidade"}
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
                            <option value="1">Jan</option>
                            <option value="2">Fev</option>
                            <option value="3">Mar</option>
                            <option value="4">Abr</option>
                            <option value="5">Mai</option>
                            <option value="6">Jun</option>
                            <option value="7">Jul</option>
                            <option value="8">Ago</option>
                            <option value="9">Set</option>
                            <option value="10">Out</option>
                            <option value="11">Nov</option>
                            <option value="12">Dez</option>
                        </Field>
                    </Col>
                    {
                        !isCurrentWork && (
                            <Col>
                                <Field name="endMonth"
                                component={TextField}
                                type="select"
                                label={'Data de término'}>
                                    <option value="1">Jan</option>
                                    <option value="2">Fev</option>
                                    <option value="3">Mar</option>
                                    <option value="4">Abr</option>
                                    <option value="5">Mai</option>
                                    <option value="6">Jun</option>
                                    <option value="7">Jul</option>
                                    <option value="8">Ago</option>
                                    <option value="9">Set</option>
                                    <option value="10">Out</option>
                                    <option value="11">Nov</option>
                                    <option value="12">Dez</option>
                                </Field>
                            </Col>
                        )
                    }
                </Row>
                <Row>
                    <Col>
                    <Field name="startYear"
                        placeholder="Ano inicial"
                        component={TextField}
                        type="number" normalize={normalizeYear}/>
                    </Col>
                    {
                        !isCurrentWork && (
                        <Col>
                        <Field name="endYear"
                            placeholder="Ano final"
                            component={TextField}
                            type="number" normalize={normalizeYear}/>
                        </Col>)
                    }
                </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                        {
                            editMode ? 
                            <Col className="mr-auto">
                                <Button disabled={submitting} variant="outline-danger" block onClick={() => {closeModal()}} size="lg">Cancelar</Button>
                            </Col> : null
                        }
                        <Col className="ml-auto">
                            <Button disabled={submitting} block type="submit" size="lg">Salvar</Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Form>
            
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
    if(!values.post) errors.post = 'Campo obrigatório.';
    if(!values.company) errors.company = 'Campo obrigatório.';
    if(!values.workLocation) errors.workLocation = 'Campo obrigatório.';
    if(!values.startYear) errors.startYear = 'Campo obrigatório.'
    return errors;
}

const selector = formValueSelector('experience');

const mapDispatchToProps = (dispatch) => ({
    startAddExperience: (experience) => dispatch(startAddExperience(experience)),
    startEditExperience : (experience,experienceId) => dispatch(startEditExperience(experience,experienceId))
});

export default connect(state => {
    const isCurrentWork = selector(state,'isCurrentWork');
    return {isCurrentWork};
},mapDispatchToProps)(reduxForm({
    form: 'experience',
    validate
})(ExperienceForm));