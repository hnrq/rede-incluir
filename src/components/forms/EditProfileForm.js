import React,{Component} from "react";
import {Field, reduxForm, formValueSelector} from "redux-form";
import {Form,Button,Row,Col,Modal} from "react-bootstrap";
import { startEditUserInfo } from "../../actions";
import { connect } from "react-redux";
import InputField from "../custom-bootstrap/InputField";
import Avatar from "../custom-bootstrap/Avatar";
import {disabilities} from '../../utils/Disabilities';

class EditProfileForm extends Component{
    submit = (values) => {
        this.props.editUserInfo(values);
        if (this.props.closeModal) this.props.closeModal();
    }

    render(){
        const {handleSubmit,submitting,hasCID10} = this.props;
        return(
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
                            width={180} height={180}
                            label ={"Foto de perfil"}
                            placeholder={"Foto de perfil"}
                            withPreview
                        />
                    </Col>
                    <Col  sm={7}>
                        <Field name = "firstName"
                        type = "text"
                        component = {InputField}
                        label  = {"Nome"}
                        placeholder = {"Nome"}/>
                        <Field name = "lastName"
                        type = "text"
                        component = {InputField}
                        label  = {"Sobrenome"}
                        placeholder = {"Sobrenome"}/>
                        <Field name = "occupation"
                        type = "text"
                        component = {InputField}
                        label  = {"Profissão"}
                        placeholder = {"Profissão"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field style={{marginBottom:5}}
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
                {hasCID10 ? <Row>
                    <Col>
                        <Field
                            name="cid10"
                            component={InputField}
                            options={disabilities}
                            normalize={normalizeCID10}
                            label="Código CID10"
                            placeholder="Ex.: F41"/>
                    </Col>
                </Row> : null}
                <Row>
                    <Col>
                        <Field name = "workLocation"
                        type = "text"
                        component = {InputField}
                        label  = {"Local de trabalho"}
                        placeholder = {"Local de trabalho"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field name = "desc"
                        type = "textarea"
                        component = {InputField}
                        label  = {"Descrição"}
                        placeholder = {"Descrição"}/>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={submitting} block type="submit" size="lg">Salvar alterações</Button>
            </Modal.Footer>
            </Form>
        );
    }
}

const selector = formValueSelector('editProfile');

const mapStateToProps = (state) => ({
        hasCID10: selector(state, 'hasCID10'),
        uid: state.auth.user.uid
    });

const mapDispatchToProps = (dispatch) => ({
    editUserInfo: (userInfo) => {
        dispatch(startEditUserInfo(userInfo))
    },
});

const normalizeCID10 = (value, previousValue) => {
    if (value.length > 3) 
        return previousValue;
    return value;
}

const validate = values => {
    const errors = {}
    if (!values.firstName) errors.firstName = 'Campo obrigatório.';
    if (!values.lastName) errors.lastName = 'Campo obrigatório.';
    if (!values.disabilities) errors.disabilities = 'Escolha uma deficiência ou mais';
    return errors;
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: "editProfile",
    validate
})(EditProfileForm));