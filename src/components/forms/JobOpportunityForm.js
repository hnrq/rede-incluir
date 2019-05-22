import React, {Component} from 'react';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {Form, Button, Row, Col, Modal} from 'react-bootstrap';
import {startAddJobOpportunity, startEditJobOpportunity, startDeleteJobOpportunity} from '../../actions';
import {connect} from 'react-redux';
import {disabilities} from '../../utils/Disabilities';
import InputField from '../custom-bootstrap/InputField';
import {createNumberMask} from 'redux-form-input-masks';

class JobOpportunity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteModal: false
        }
    }

    handleCloseDeleteModal = () => {
        this.setState({showDeleteModal: false});
    }
    handleShowDeleteModal = () => {
        this.setState({showDeleteModal: true});
    }

    submit = (values) => {
        const {editMode, closeModal, addJobOpportunity, editJobOpportunity} = this.props;
        delete values.id;
        if (editMode) 
            editJobOpportunity(values, this.props.id)
        else 
            addJobOpportunity(values);
        closeModal();
    }

    deleteJobOpportunity = () => {
        this
            .props
            .deleteJobOpportunity(this.props.id)
            .then((result) => {
                this.handleCloseDeleteModal();
                this
                    .props
                    .closeModal();
            });
    }

    render() {
        const {submitting, handleSubmit, editMode} = this.props;
        return ( <> <Form onSubmit={handleSubmit(this.submit)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode
                            ? 'Editar'
                            : 'Adicionar'}
                         vaga</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Field
                                name="post"
                                type='text'
                                component={InputField}
                                label={"Cargo"}
                                placeholder={"Ex: Gerente"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field
                                name="workLoad"
                                type='text'
                                component={InputField}
                                label={"Carga horária"}
                                placeholder={"Ex: 8 horas"}/>
                        </Col>
                        <Col>
                            <Field
                                name="salary"
                                component={InputField}
                                type="text"
                                label={"Remuneração"}
                                placeholder={"Ex.: R$ 2500,00"}
                                {...currencyMask}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field
                                style={{marginBottom: 5}}
                                name="disabilities"
                                closeMenuOnSelect={false}
                                type='select-multiple'
                                component={InputField}
                                placeholder="Selecione (se houver) limitação para deficiências"
                                options={disabilities}
                                label="Deficiências"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field
                                name="desc"
                                type="textarea"
                                component={InputField}
                                label={"Descrição"}
                                placeholder={"Ex.: O profissional exercerá tarefas de gerência... etc."}/>
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
            {
            this.state.showDeleteModal
                ? <div className="fade modal-backdrop show" aria-hidden="true"/>
                : null
        } <Modal centered className = "modal-small" size = "sm" show = {
            this.state.showDeleteModal
        }
        onHide = {
            this.handleCloseDeleteModal
        } > <Modal.Header closeButton>
                    <Modal.Title>Excluir vaga</Modal.Title>
                </Modal.Header>
                <Modal.Body> <p>Deseja excluir esta vaga?</p> </Modal.Body>
                <Modal.Footer className="footer-button">
                    <Button disabled={submitting} variant="danger" onClick={() => {this.deleteJobOpportunity()}}>Excluir</Button> 
                    <Button disabled={submitting} 
                            variant="outline-primary"
                            onClick={this.handleCloseDeleteModal}>Não, Obrigado</Button> 
                </Modal.Footer>
            </Modal > </>);
    }
};

const currencyMask = createNumberMask({prefix: 'R$ ', decimalPlaces: 2, locale: 'pt-BR'})

const validate = values => {
    const errors = {};
    if (!values.post) 
        errors.post = 'Campo obrigatório.';
    if (!values.workLoad) 
        errors.workLoad = 'Campo obrigatório.';
    if (!values.salary) 
        errors.salary = 'Campo obrigatório.';
    if (!values.desc) 
        errors.desc = 'Campo obrigatório.'
    return errors;
}

const selector = formValueSelector('jobOpportunity');

const mapDispatchToProps = (dispatch) => ({
    addJobOpportunity: (jobOpportunity) => dispatch(startAddJobOpportunity(jobOpportunity)),
    editJobOpportunity: (jobOpportunity, jobOpportunityId) => dispatch(startEditJobOpportunity(jobOpportunity, jobOpportunityId)),
    deleteJobOpportunity: (jobOpportunityId) => dispatch(startDeleteJobOpportunity(jobOpportunityId))
});

export default connect(state => {
    const id = selector(state, 'id');
    return {id};
}, mapDispatchToProps)(reduxForm({form: 'jobOpportunity', validate})(JobOpportunity));