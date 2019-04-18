import React,{Component} from "react";
import {Field, reduxForm} from "redux-form";
import {Form,Button,Row,Col,Modal} from "react-bootstrap";
import { startEditUserInfo } from "../../actions";
import { connect } from "react-redux";
import TextField from "../custom-bootstrap/TextField";
import Avatar from "../custom-bootstrap/Avatar";

class EditProfileForm extends Component{
    submit = (values) => {
        this.props.editUserInfo(values);
        if (this.props.closeModal) this.props.closeModal();
    }

    render(){
        const {handleSubmit,submitting} = this.props;
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
                        component = {TextField}
                        label  = {"Nome"}
                        placeholder = {"Nome"}/>
                        <Field name = "lastName"
                        type = "text"
                        component = {TextField}
                        label  = {"Sobrenome"}
                        placeholder = {"Sobrenome"}/>
                        <Field name = "occupation"
                        type = "text"
                        component = {TextField}
                        label  = {"Profissão"}
                        placeholder = {"Profissão"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field name = "workLocation"
                        type = "text"
                        component = {TextField}
                        label  = {"Local de trabalho"}
                        placeholder = {"Local de trabalho"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field name = "desc"
                        type = "textarea"
                        component = {TextField}
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

const mapStateToProps = (state,ownProps) => ({
    uid: state.auth.user.uid
});

const mapDispatchToProps = (dispatch) => ({
    editUserInfo: (userInfo) => {
        dispatch(startEditUserInfo(userInfo))
    },
});

const validate = values => {
    const errors = {}
    if (!values.firstName) errors.firstName = 'Campo obrigatório.';
    if (!values.lastName) errors.lastName = 'Campo obrigatório.';
    return errors;
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: "editProfile",
    validate
})(EditProfileForm));