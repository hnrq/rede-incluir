import React,{Component} from 'react';
import {Field, reduxForm,formValueSelector} from 'redux-form';
import {Form,Button,Row,Col,Modal} from 'react-bootstrap';
import {startAddExperience,startEditExperience, startDeleteExperience} from '../../actions';
import {connect} from 'react-redux';
import InputField from '../custom-bootstrap/InputField';

class ExperienceForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            showDeleteModal:false,
        }
    }

    handleCloseDeleteModal = () => {
        this.setState({
            showDeleteModal: false
        });
    }
    handleShowDeleteModal = () => {
        this.setState({showDeleteModal: true});
    }

    submit = (values) => {
        const {editMode,closeModal,addExperience,editExperience} = this.props;
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

        if(editMode) editExperience(data,values.id) 
        else addExperience(data);     
        closeModal();
    }

    deleteExperience = () => {
        this.props.deleteExperience(this.props.id).then((result) => {
            this.handleCloseDeleteModal();
            this.props.closeModal();
        });
    }

    
    render(){
        const {submitting,handleSubmit,editMode,isCurrentWork} = this.props;
        return(
            <>
            <Form onSubmit={handleSubmit(this.submit)}>
            <Modal.Header closeButton>
                <Modal.Title>{editMode ? 'Editar' : 'Adicionar'} experiência</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Field name="post"
                        type = 'text'
                        component = {InputField}
                        label = {"Cargo"}
                        placeholder = {"Ex: Gerente"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Field name="company"
                        type = 'text'
                        component = {InputField}
                        label = {"Empresa"}
                        placeholder = {"Ex: Apple"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Field name="workLocation"
                        component = {InputField}
                        type="text"
                        label = {"Localidade"}
                        placeholder = {"Ex: Belo Horizonte"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field name="isCurrentWork"
                        component = {InputField}
                        type="checkbox" onToggle={this.toggleIsCurrentWork}
                        label = {"Este é meu cargo atual"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field name="startMonth"
                        component={InputField}
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
                                component={InputField}
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
                        component={InputField}
                        type="number" normalize={normalizeYear}/>
                    </Col>
                    {
                        !isCurrentWork && (
                        <Col>
                        <Field name="endYear"
                            placeholder="Ano final"
                            component={InputField}
                            type="number" normalize={normalizeYear}/>
                        </Col>)
                    }
                </Row>
                </Modal.Body>
                <Modal.Footer className="footer-button">
                        {editMode
                            ? <Button
                                    disabled={submitting}
                                    variant="outline-danger"
                                    onClick={() => {
                                    this.handleShowDeleteModal()
                                }}
                                    size="lg">Excluir</Button>
                            : null
}
                        <Button disabled={submitting} className="ml-auto" type="submit" size="lg">Salvar</Button>
                </Modal.Footer>
            </Form>
            {this.state.showDeleteModal ? 
                    <div className="fade modal-backdrop show" aria-hidden = "true"/> : null}
            <Modal centered className="modal-small" size="sm" show={this.state.showDeleteModal} onHide={this.handleCloseDeleteModal}>
                <Modal.Header closeButton/>
                <Modal.Body>
                    <p>Deseja excluir esta experiência?</p>
                </Modal.Body>
                <Modal.Footer className="footer-button">
                    <Button disabled={submitting} variant="danger" onClick={() => {this.deleteExperience()}}>Excluir</Button>
                    <Button disabled={submitting} variant="outline-primary" onClick={this.handleCloseDeleteModal}>Não, Obrigado</Button>
                </Modal.Footer>
            </Modal>
            </>
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
    addExperience: (experience) => dispatch(startAddExperience(experience)),
    editExperience : (experience,experienceId) => dispatch(startEditExperience(experience,experienceId)),
    deleteExperience: (experienceId) => dispatch(startDeleteExperience(experienceId))
});

export default connect(state => {
    const isCurrentWork = selector(state,'isCurrentWork');
    const id = selector(state,'id');
    return {isCurrentWork,id};
},mapDispatchToProps)(reduxForm({
    form: 'experience',
    validate
})(ExperienceForm));