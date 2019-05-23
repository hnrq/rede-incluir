import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Container,Button,Modal} from 'react-bootstrap';
import placeholder from '../images/ppic-placeholder.png';
import backgroundPlaceholder from '../images/background-placeholder.png';
import VacancyForm from './forms/VacancyForm';
import EditCompanyForm from './forms/EditCompanyForm';
import VacancyList from './List/VacancyList';
import ReactPlaceholder from 'react-placeholder';
import {disabilities} from '../utils/Disabilities';

class CompanyProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            showVacancyModal:false,
            showProfileModal:false,
            showApplyModal:false,
        }
    }

    handleCloseApplyModal = () => {
        this.setState({showApplyModal: false});
    }

    handleShowApplyModal = (vacancyId,vacancyTitle) => {
        this.setState({showApplyModal: true,vacancyTitle,vacancyId});
    }

    handleShowVacancyModal = () => {
        this.setState({showVacancyModal: true});
    }

    handleCloseProfileModal = () => {
    this.setState({showProfileModal: false});
    }

    handleShowProfileModal = () => {
        const {name,desc,profilePic,zipCode,street,number,complement,city,neighborhood,province} = this.props;
        this.setState({showProfileModal: true,initialValues:{name,desc,profilePic,zipCode,street,number,city,complement,neighborhood,province}});
    }

    handleCloseVacancyModal = () => {
        this.setState({
            showVacancyModal: false
        });
    }

    addVacancy = () => {
        this.setState({editMode: false,initialValues:null});
        this.handleShowVacancyModal();
    }

    editVacancy = (vacancy) => {
        this.setState({editMode: true,initialValues:vacancy});
        this.handleShowVacancyModal();
    }

    vacancyApply = () => {
        this.props.vacancyApply(this.state.vacancyId,this.props.uid).then((response) => {
            this.handleCloseApplyModal();
        });
    }

    renderLists(showListAction){
        var showItemAction = showListAction;
        if(this.props.currentUser && !this.props.currentUser.isCompany)
            showItemAction = true ;
        const isCompany = this.props.currentUser ? this.props.currentUser.isCompany : null;
        if(this.props.ready){
            return(
                <Container style={{padding:0}} className="card experiences">
                    <VacancyList 
                    showItemAction={showItemAction} 
                    title={"Vagas ofertadas"}  
                    items={this.props.vacancies} 
                    listAction={showListAction ? this.addVacancy : null} 
listItemAction = {
    showItemAction
        ? isCompany
            ? this.editVacancy
            : this.handleShowApplyModal : null
}
                    buttonText={isCompany ? null : "Candidatar"}/>
                </Container>
            )
        }
    }

    render(){
        const {profilePic,backgroundPic,name,workLocation,occupation,desc,ready} = this.props;
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
                                <h3 style={{fontWeight:'bold'}}>{name ? name : ''}</h3>
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
                            </div>
                        </ReactPlaceholder>
                        {editable && ready ? <Button className="edit-profile" onClick={this.handleShowProfileModal}>Editar Perfil</Button> : null}
                        <hr/>
                        <div className="desc" style={{textAlign:'justify'}}>
                            <ReactPlaceholder type='text' rows={8} showLoadingAnimation={true} ready={ready} style={{height:200}}>
                                {desc ? <p>{desc}</p> : <i style={{color:'grey',textAlign:'center',margin:'50px 0px',display:'block'}}>Nenhuma descrição</i>}
                            </ReactPlaceholder>
                        </div>
                    </div>
            </Container>
            {this.renderLists(editable)}
            <Modal size="lg" show={this.state.showVacancyModal} onHide={this.handleCloseVacancyModal}>
                <VacancyForm editMode={this.state.editMode} initialValues={this.state.initialValues} closeModal={this.handleCloseVacancyModal}/>
            </Modal>
            <Modal size="lg" show={this.state.showProfileModal} onHide={this.handleCloseProfileModal}>
                <EditCompanyForm initialValues={this.state.initialValues} closeModal={this.handleCloseProfileModal}/>
            </Modal>
            <Modal centered className="modal-small" size="sm" show={this.state.showApplyModal} onHide={this.handleCloseApplyModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Candidatar à vaga</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Deseja se candidatar à vaga de {this.state.vacancyTitle}?</p>
                </Modal.Body>
                <Modal.Footer className="footer-button">
                    <Button variant="outline-secondary"  onClick={this.handleCloseApplyModal}>Não</Button>
                    <Button variant="primary" onClick={this.vacancyApply}>Candidatar</Button>
                </Modal.Footer>
            </Modal>
            </>
            
        )
    }
}

export default withRouter(CompanyProfile);