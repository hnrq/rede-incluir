import React,{Component} from 'react';
import {Field, reduxForm,formValueSelector} from 'redux-form';
import {Form,Button,Row,Col,Container} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {startAddGraduation} from '../../actions';
import {connect} from 'react-redux';
import TextField from '../custom-bootstrap/TextField';

class GraduationForm extends Component{

    submit = (values) => {
        const {editMode,closeModal,uid,startAddGraduation} = this.props;
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
            startMonth: undefined,
            startYear: undefined,
            endMonth: undefined,
            endYear: undefined,
        }
        if(editMode){
            toast.success("Editado com sucesso");
        } else{
            addExperience(data,uid).then((result)=>{
                startAddGraduation(data, result.key);
                toast.success("Adicionado com sucesso");
            })
        }
        closeModal();
    }

    
    render(){
        const {submitting,handleSubmit,editMode,isCurrentWork} = this.props;
        return(
            <Form onSubmit={handleSubmit(this.submit)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Editar' : 'Adicionar'} experiência</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Field name="institution"
                            type = 'text'
                            component = {TextField}
                            label = {"Instituição de Ensino"}
                            placeholder = {"Ex: PUC Minas"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Field name="graduation"
                            type = 'text'
                            component = {TextField}
                            label = {"Formação"}
                            placeholder = {"Ex: Bacharelado"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Field name="area"
                            component = {TextField}
                            type="text"
                            label = {"Área de estudo"}
                            placeholder = {"Ex: Direito"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Field name="startYear"
                            label="Do ano de"
                            placeholder="Ano inicial"
                            component={TextField}
                            type="number" normalize={normalizeYear}/>
                        </Col>
                        <Col>
                        <Field name="endYear"
                            placeholder="Ano de término"
                            label="Até (ou previsão)"
                            component={TextField}
                            type="number" normalize={normalizeYear}/>
                        </Col>
                    </Row>
                </Modal.Body>
                <Button disabled={submitting} block type="submit" size="lg">Salvar</Button>
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
    if(!values.institution) errors.institution = 'Campo obrigatório.';
    if(!values.graduation) errors.graduation = 'Campo obrigatório.';
    if(!values.area) errors.area = 'Campo obrigatório.';
    if(!values.startYear) errors.startYear = 'Campo obrigatório.'
    if(!values.endYear) errors.endYear = 'Campo obrigatório.'
    return errors;
}

const selector = formValueSelector('experience');

const mapDispatchToProps = (dispatch) => ({
    addGraduation: (experience,uid) => dispatch(startAddGraduation(experience,uid)),
    editGraduation: (experience,uid) => dispatch(startEditGraduation(experience,uid))
});

export default connect(state => ({uid: state.auth.user.uid}),
mapDispatchToProps)(reduxForm({
    form: 'graduation',
    validate
})(GraduationForm));