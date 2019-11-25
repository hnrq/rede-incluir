import React, {Component} from "react";
import {Field, reduxForm, formValueSelector} from "redux-form";
import {Form, Button, Row, Col, Modal} from "react-bootstrap";
import {startEditProfileInfo} from "../../actions";
import axios from 'axios';
import ReactDOM from 'react-dom'
import {connect} from "react-redux";
import InputField from "../custom-bootstrap/InputField";
import Avatar from "../custom-bootstrap/Avatar";
import {states} from '../../data/locale';
import {createTextMask} from 'redux-form-input-masks';

class EditCompanyForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            cities: null
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.province !== prevProps.province) {
            const provinceField = ReactDOM.findDOMNode(this.provinceField).children[1];
            axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${provinceField.options[provinceField.selectedIndex].getAttribute('data-id')}/municipios`)
            .then((response) => this.setState({cities: response.data}));
        }
    }

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
                        <Col sm={5} md={5} lg={3} className="justify-content-md-center">
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
                        <Col sm={7} md={7} lg={9}>
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
                        <Col>
                            <Field
                                ref={(provinceField) => {this.provinceField = provinceField}}
                                name="province"
                                component={InputField}
                                type="select"
                                label="Estado"
                                placeholder="Selecione um estado..." onChange={this.getCities}>
                                {states.sort((p1,p2) => p1.nome > p2.nome ? 1 : -1).map((province) => <option key={province.id} data-id={province.id} value={province.sigla}>{province.nome}</option>)}
                            </Field>
                        </Col>
                        {this.props.province && this.state.cities ? 
                            <Col>
                                <Field
                                    name="city"
                                    component={InputField}
                                    type="select-search"
                                    label="Cidade"
                                    options={this.state.cities.map(city => ({value:city.nome,label:city.nome}))}
                                    placeholder="Ex.: Belo Horizonte">
                                </Field>
                            </Col>: null}
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
    province: selector(state, 'province'),
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