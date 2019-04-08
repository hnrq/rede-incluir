import React,{Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form,Button,Row,Col} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addUserInfo } from '../../actions';
import { editProfile } from '../../firebase/queries';
import { connect } from 'react-redux';
import TextField from '../custom-bootstrap/TextField';

class EditProfileForm extends Component{
    submit = (values) => {
        editProfile(values,this.props.uid).then((result) => {
            this.props.addUserInfo(values);
            if(this.props.closeModal) this.props.closeModal();
            toast.success('Perfil editado com sucesso');
        });
    }

    render(){
        const {handleSubmit,submitting} = this.props;
        return(
            <Form onSubmit={handleSubmit(this.submit)}>
            <h1>Editar Perfil</h1>
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
                    <Field name = "occupation"
                    type = 'text'
                    component = {TextField}
                    placeholder = {"Profissão"}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Field name = "workLocation"
                    type = 'text'
                    component = {TextField}
                    placeholder = {"Local de trabalho"}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Field name = "desc"
                    type = 'textarea'
                    component = {TextField}
                    placeholder = {"Descrição"}/>
                </Col>
            </Row>
            <Button disabled={submitting} block type="submit" size="lg">Salvar alterações</Button>
        </Form>
        );
    }
}

const mapStateToProps = (state,ownProps) => ({
    uid: state.auth.user.uid
});

const mapDispatchToProps = (dispatch,ownProps) => ({
    addUserInfo: (userInfo) => {
        dispatch(addUserInfo(userInfo))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'editProfile'
})(EditProfileForm));