import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Container,Button,Modal} from 'react-bootstrap';
import placeholder from '../images/ppic-placeholder.png';
import backgroundPlaceholder from '../images/background-placeholder.png';
import ExperienceForm from './forms/ExperienceForm';
import EditUserForm from './forms/EditUserForm';
import ExperienceList from './List/ExperienceList';
import GraduationList from './List/GraduationList';
import ReactPlaceholder from 'react-placeholder';
import {disabilities} from '../utils/Disabilities';
import GraduationForm from './forms/GraduationForm';
import CurriculumPDF from './pdfExporter';

class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            showExperienceModal:false,
            showGraduationModal:false,
            showProfileModal:false,
            showCurriculumModal:false,
        }
    }

    handleShowExperienceModal = () => {
        this.setState({showExperienceModal: true});
    }

    handleCloseExperienceModal = () => {
        this.setState({
            showExperienceModal: false
        });
    }
    handleShowGraduationModal = () => {
        this.setState({showGraduationModal: true});
    }

    handleCloseGraduationModal = () => {
        this.setState({
            showGraduationModal: false
        });
    }

    handleShowProfileModal = () => {
        const {firstName,lastName,workLocation,occupation,desc,profilePic,disabilities,hasCID10,cid10} = this.props;
        this.setState({showProfileModal: true,initialValues:{firstName,lastName,workLocation,occupation,desc,profilePic,hasCID10,disabilities,cid10}});
    }

    handleCloseProfileModal = () => {
        this.setState({
            showProfileModal: false
        });
    }

    addExperience = () => {
        this.setState({editMode: false,initialValues:null});
        this.handleShowExperienceModal();
    }

    editExperience = (experience) => {
        this.setState({editMode: true,initialValues:{
            ...experience,
            startMonth: experience.startDate.month,
            startYear: experience.startDate.year,
            endYear: (experience.endDate ? experience.endDate.year : null),
            endMonth: (experience.endDate ? experience.endDate.month : null),
        }});
        this.handleShowExperienceModal();
    }

    addGraduation = () => {
        this.setState({editMode: false,initialValues:null});
        this.handleShowGraduationModal();
    }

    editGraduation = (graduation) => {
        console.log(graduation);
        this.setState({editMode: true,initialValues:{
            ...graduation,
            startYear: graduation.startDate.year,
            endYear: graduation.endDate.year
        }});
        this.handleShowGraduationModal();
    }


    renderLists(showItemAction){
        if(this.props.ready){
            return(
                <>
                <Container style={{padding:0, marginBottom:'25px'}} className="card experiences">
                    <ExperienceList title={"Experiências"}  items={this.props.experiences} listAction={showItemAction ? this.addExperience : null} showItemAction={showItemAction} listItemAction={showItemAction ? this.editExperience : null}/>
                </Container>
                <Container style={{padding:0}} className="card experiences">
                    <GraduationList title={"Formação acadêmica"} items={this.props.graduations} listAction={showItemAction ? this.addGraduation : null} showItemAction={showItemAction} listItemAction={showItemAction ? this.editGraduation : null}/>
                </Container>
                </>
            )
        }
    }

    handleCloseCurriculumModal = () => {
        this.setState({showCurriculumModal: false});
    }

    handleShowCurriculumModal = () => {
        this.setState({showCurriculumModal: true});
    }

    render(){
        const {profilePic,backgroundPic,firstName,lastName,workLocation,occupation,desc,ready,cid10} = this.props;
        let userDisabilities;
        if(this.props.disabilities)
            userDisabilities = disabilities.filter((disability) => this.props.disabilities.includes(disability.value)).map((disability,index) => <i className="disability" key={index}>{disability.label}</i>);
        const editable = this.props.location.pathname.substr(1) === this.props.uid;
        return(
            <>
            <ReactPlaceholder type='rect' style={{width:'100%',height: '250px'}} showLoadingAnimation={true} ready={ready}>
                <div className="background-pic" style={{background:`url(${backgroundPic ? backgroundPic : backgroundPlaceholder})`,backgroundPosition:'center'}}></div>
            </ReactPlaceholder>
            <Container className="card profile">
                    <div className="avatar">
                        <ReactPlaceholder type='round' showLoadingAnimation={true} ready={ready} style={{width:160,height: 160}}>
                            <img alt="profile-pic" src={profilePic ? profilePic : placeholder}/>
                        </ReactPlaceholder>
                    </div>
                    <div className="profile-info">
                        <div className="title">
                            <ReactPlaceholder type='textRow' showLoadingAnimation={true} ready={ready} style={{width:170,height:30}}>
                                <h3 style={{fontWeight:'bold'}}>{firstName ? firstName + " " + lastName : ''}</h3>
                            </ReactPlaceholder>
                        </div>
                        <ReactPlaceholder type='textRow' showLoadingAnimation={true} ready={ready} style={{width:250,height:20}}>
                            {occupation ? <h5 className="occupation">{occupation}</h5> : ''}
                        </ReactPlaceholder>
                        <ReactPlaceholder type='textRow' showLoadingAnimation={true} ready={ready} style={{width:250,height:20}}>
                            {workLocation ? <p className="location">{workLocation}</p> : ''}
                        </ReactPlaceholder>
                        <ReactPlaceholder type='text' rows={3} showLoadingAnimation={true} ready={ready} style={{width:170,height:30}}>
                            <div className="disabilities">
                                {userDisabilities}
                                {cid10 ? <i className="disability">CID10: {cid10}</i> : null}
                            </div>
                        </ReactPlaceholder>
                        {editable && ready ? 
                            <>
                                <Button className="edit-profile" onClick={this.handleShowProfileModal}>Editar Perfil</Button>
                                <Button className="edit-profile" onClick={this.handleShowCurriculumModal}>Exportar para PDF</Button>
                            </>
                        : null}
                        <hr/>
                        <div className="desc" style={{textAlign:'justify'}}>
                            <ReactPlaceholder type='text' rows={8} showLoadingAnimation={true} ready={ready} style={{height:200}}>
                                {desc ? <p>{desc}</p> : <i style={{color:'grey',textAlign:'center',margin:'50px 0px',display:'block'}}>Nenhuma descrição</i>}
                            </ReactPlaceholder>
                        </div>
                    </div>
            </Container>
            {this.renderLists(editable)}
            <Modal size="lg" show={this.state.showExperienceModal} onHide={this.handleCloseExperienceModal}>
                <ExperienceForm editMode={this.state.editMode} initialValues={this.state.initialValues} closeModal={this.handleCloseExperienceModal}/>
            </Modal>
            <Modal size="lg" show={this.state.showGraduationModal} onHide={this.handleCloseGraduationModal}>
                <GraduationForm editMode={this.state.editMode} initialValues={this.state.initialValues} closeModal={this.handleCloseGraduationModal}/>
            </Modal>
            <Modal size="lg" show={this.state.showProfileModal} onHide={this.handleCloseProfileModal}>
                <EditUserForm initialValues={this.state.initialValues} closeModal={this.handleCloseProfileModal}/>
            </Modal>
            <Modal size="lg" show={this.state.showCurriculumModal} onHide={this.handleCloseCurriculumModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Curriculo em PDF</Modal.Title>
                </Modal.Header>
                <CurriculumPDF {...this.props}/>
            </Modal>
            </>
            
        )
    }
}

export default withRouter(UserProfile);