import React, {Component} from 'react';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {Form, Button, Row, Col, Modal} from 'react-bootstrap';
import {startAddGraduation, startEditGraduation, startDeleteGraduation} from '../../actions';
import {connect} from 'react-redux';
import InputField from '../custom-bootstrap/InputField';

class GraduationForm extends Component {
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
        const {editMode, closeModal, editGraduation, addGraduation} = this.props;
        const data = {
            ...values,
            startDate: {
                'year': values.startYear
            },
            endDate: {
                'year': values.endYear
            }
        }
        delete data.id;
        delete data.startMonth;
        delete data.startYear;
        delete data.endMonth;
        delete data.endYear;
        delete data.type;

        if (editMode) editGraduation(data, values.id);
        else addGraduation(data, values.id);
        closeModal();
    }

    deleteGraduation = () => {
        this.props.deleteGraduation(this.props.id).then((result) => {
            this.handleCloseDeleteModal();
            this.props.closeModal();
        });
    }

    render() {
        const {submitting, handleSubmit, editMode} = this.props;
        return (
            <>
            <Form onSubmit={handleSubmit(this.submit)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode
                            ? 'Editar '
                            : 'Adicionar '}
                        graduação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Field
                                name="institution"
                                type='text'
                                component={InputField}
                                label={"Instituição de Ensino"}
                                placeholder={"Ex: PUC Minas"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field
                                name="graduation"
                                type='text'
                                component={InputField}
                                label={"Formação"}
                                placeholder={"Ex: Bacharelado"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field
                                name="area"
                                component={InputField}
                                type="text"
                                label={"Área de estudo"}
                                placeholder={"Ex: Direito"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field
                                name="startYear"
                                label="Do ano de"
                                placeholder="Ano inicial"
                                component={InputField}
                                type="number"
                                normalize={normalizeYear}/>
                        </Col>
                        <Col>
                            <Field
                                name="endYear"
                                placeholder="Ano de término"
                                label="Até (ou previsão)"
                                component={InputField}
                                type="number"
                                normalize={normalizeYear}/>
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
                    <p>Deseja excluir esta formação?</p>
                </Modal.Body>
                <Modal.Footer  className="footer-button">
                        <Button disabled={submitting} variant="danger" onClick={() => {this.deleteGraduation()}}>Excluir</Button>
                        <Button disabled={submitting} variant="outline-primary" onClick={this.handleCloseDeleteModal}>Não, Obrigado</Button>
                </Modal.Footer>
            </Modal>
            </>
        );
    }
};

const normalizeYear = (value, previousValue) => {
    if (!value) 
        return value
    if (value < 0) 
        return previousValue;
    if (value.length > 4) 
        return previousValue;
    return value;
}

const validate = values => {
    const errors = {};
    if (!values.institution) 
        errors.institution = 'Campo obrigatório.';
    if (!values.graduation) 
        errors.graduation = 'Campo obrigatório.';
    if (!values.area) 
        errors.area = 'Campo obrigatório.';
    if (!values.startYear) 
        errors.startYear = 'Campo obrigatório.'
    if (!values.endYear) 
        errors.endYear = 'Campo obrigatório.'
    return errors;
}

const selector = formValueSelector('graduation');

const mapDispatchToProps = (dispatch) => ({
    addGraduation: (graduation) => dispatch(startAddGraduation(graduation)),
    editGraduation: (graduation, graduationId) => dispatch(startEditGraduation(graduation, graduationId)),
    deleteGraduation: (graduationId) => dispatch(startDeleteGraduation(graduationId))
});

export default connect(state => {
    const id = selector(state, 'id');
    return {id};
}, mapDispatchToProps)(reduxForm({form: 'graduation', validate})(GraduationForm));