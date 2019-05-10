import React,{Component} from 'react';
import {Field, reduxForm,formValueSelector} from 'redux-form';
import {Form,Button,Row,Col,Modal} from 'react-bootstrap';
import {startAddExperience,startEditExperience, startDeleteExperience} from '../../actions';
import {connect} from 'react-redux';
import InputField from '../custom-bootstrap/InputField';
import {createNumberMask} from 'redux-form-input-masks';

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
        const {submitting,handleSubmit,editMode} = this.props;
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
                    <Field name="workLoad"
                        type = 'text'
                        component = {InputField}
                        label = {"Carga horária"}
                        placeholder = {"Ex: 8 horas"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Field name="salary"
                        component = {InputField}
                        type="text"
                        label = {"Remuneração"}
                        placeholder = {"Ex.: R$ 2500,00"}
                        {...currencyMask}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field name = "desc"
                        type = "textarea"
                        component = {InputField}
                        label  = {"Descrição"}
                        placeholder = {"Ex.: O profissional exercerá tarefas de gerência... etc."}/>
                    </Col>
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

const currencyMask = createNumberMask({prefix: 'R$ ', decimalPlaces: 2, locale: 'pt-BR'})

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
    const id = selector(state,'id');
    return {id};
},mapDispatchToProps)(reduxForm({
    form: 'jobOpportunity',
    validate
})(ExperienceForm));