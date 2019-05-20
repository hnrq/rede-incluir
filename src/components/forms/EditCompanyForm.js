import React, {Component} from "react";
import {Field, reduxForm, formValueSelector} from "redux-form";
import {Form, Button, Row, Col, Modal} from "react-bootstrap";
import {startEditProfileInfo} from "../../actions";
import {connect} from "react-redux";
import InputField from "../custom-bootstrap/InputField";
import Avatar from "../custom-bootstrap/Avatar";
import {createTextMask} from 'redux-form-input-masks';

class EditCompanyForm extends Component {
    submit = (values) => {
        this
            .props
            .editProfileInfo(values);
        if (this.props.closeModal) 
            this.props.closeModal();
        }
    
    render() {
        const {handleSubmit, submitting} = this.props;
        return (
            <Form onSubmit={handleSubmit(this.submit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={5} className="justify-content-md-center">
                            <Field
                                name="profilePic"
                                component={Avatar}
                                width={180}
                                height={180}
                                label
                                ={"Foto de perfil"}
                                placeholder={"Foto de perfil"}
                                withPreview/>
                        </Col>
                        <Col sm={7}>
                            <Field
                                name="name"
                                type="text"
                                component={InputField}
                                label={"Nome"}
                                placeholder={"Nome"}/>
                            <Field
                                name="desc"
                                type="textarea"
                                component={InputField}
                                label={"Descrição"}
                                placeholder={"Descrição"}/>
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
                        <Col md={8}>
                            <Field
                                name="street"
                                component={InputField}
                                type="text"
                                label="Endereço"
                                placeholder="Ex.: Rua do Zé"/>
                        </Col>
                        <Col md={4}>
                            <Field
                                name="number"
                                component={InputField}
                                type="text"
                                label="Número"
                                placeholder="Ex.: 33"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Field
                                name="complement"
                                component={InputField}
                                type="text"
                                label="Bloco/Andar"
                                placeholder="Ex.: 9º andar, Bloco 5"/>
                        </Col>
                        <Col md={6}>
                            <Field name="neighborhood" component={InputField} type="text" label="Bairro"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={submitting} block type="submit" size="lg">Salvar alterações</Button>
                </Modal.Footer>
            </Form>
        );
    }
}

const zipCodeMask = createTextMask({pattern: '99.999-999', guide: false});

const selector = formValueSelector('editProfile');

const mapStateToProps = (state) => ({
    hasCID10: selector(state, 'hasCID10'),
    uid: state.auth.user.uid
});

const mapDispatchToProps = (dispatch) => ({
    editProfileInfo: (companyInfo) => {
        dispatch(startEditProfileInfo(companyInfo))
    }
});

const validate = values => {
    const errors = {}
    if (!values.name) 
        errors.name = 'Campo obrigatório.';
    if (!values.zipCode) 
        errors.zipCode = 'Campo obrigatório.';
    if (!values.street) 
        errors.street = 'Campo obrigatório.';
    if (!values.neighborhood) 
        errors.neighborhood = 'Campo obrigatório.';
    if (!values.number) 
        errors.number = 'Campo obrigatório.';
    return errors;
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: "editProfile", validate})(EditCompanyForm));