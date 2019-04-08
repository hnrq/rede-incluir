import React,{Component} from 'react';
import {Container,Button,Modal} from 'react-bootstrap';
import placeholder from '../images/ppic-placeholder.jpg';
import backgroundPlaceholder from '../images/background-placeholder.png';
import ExperienceForm from './forms/ExperienceForm';
import List from './List';
import {GRADUATION} from './ListItem';

const experiences = [
    {
        post:'Estagiário de desenvolvimento',
        company: 'Teknisa',
        location: 'Belo Horizonte',
        startDate:{
            month:'0',
            year:2017
        },
        isCurrentWork:true,
    },
    {
        post: 'Estagiário de design',
        company: 'DTI',
        location: 'Belo Horizonte',
        startDate: {
            month: '8',
            year: 2014
        },
        endDate: {
            month: '0',
            year: 2017
        },
    }
]

const graduations = [
    {
        institution:'Pontifícia Universidade Católica de Minas Gerais',
        graduation: "Engineer's degree",
        area:"Computer Software Engineering",
        startDate:{year:2017},
        endDate:{year:2022}
    }
]

export default class Profile extends Component{
    constructor(){
        super();
        this.state = {
            show:false,
        }
    }

    handleShowModal = () => {
        this.setState({show: true});
    }

    handleCloseModal = () => {
        this.setState({
            show: false
        });
    }

    addExperience = () => {
        this.setState({editMode: false,initialValues:null});
        this.handleShowModal();
    }

    editExperience = (experience) => {
        this.setState({editMode: true,initialValues:{
            ...experience,
            startMonth: experience.startDate.month,
            startYear: experience.startDate.year,
            endYear: (experience.endDate ? experience.endDate.year : null),
            endMonth: (experience.endDate ? experience.endDate.month : null),
        }});
        console.log(experience);
        this.handleShowModal();
    }

    render(){
        const {profilePic,backgroundPic} = this.props;
        return(
            <>
            <div className="background-pic" style={{background:`url(${backgroundPic ? backgroundPic : backgroundPlaceholder})`,backgroundPosition:'center'}}></div>
            <Container className="card profile">
                    <div className="avatar">
                        <img alt="profile-pic" src={profilePic ? profilePic : placeholder}/>
                    </div>
                    <div className="info">
                        <div className="title">
                            <h2 style={{fontWeight:'bold'}}>Ronaldo</h2>
                        </div>
                        <h5 className="occupation">Camisa 9</h5>
                        <p className="location">Rio de Janeiro, RJ e região</p>
                        <Button className="edit-profile">Editar Perfil</Button>
                        <hr/>
                        <div className="desc" style={{textAlign:'justify'}}>
                            <p> Ronaldo Luís Nazário de Lima, mais conhecido como Ronaldo, Ronaldo Fenômeno ou ainda Ronaldinho(Rio de Janeiro, 22 de setembro de 1976), é um empresário e ex - futebolista brasileiro que atuava como atacante, amplamente reconhecido como um dos melhores futebolistas de todos os tempos.Atualmente, trabalha como comentarista da Rede Globo.</p>
                        </div>
                    </div>
            </Container>
            <Container className="card experiences">
                <List title={"Experiências"} items={experiences} listActionOnClick={this.addExperience} itemOnClick={this.editExperience}/>
                <List title={"Formação acadêmica"} items={graduations} listActionOnClick={this.addExperience} type={GRADUATION} itemOnClick={this.editExperience}/>
            </Container>
            <Modal show={this.state.show} onHide={this.handleCloseModal}>
                <ExperienceForm editMode={this.state.editMode} initialValues={this.state.initialValues} closeModal={this.handleCloseModal}/>
            </Modal>
            </>
            
        )
    }
}