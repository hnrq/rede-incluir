import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getUserInfo,addUserInfo} from '../actions';
import {connect} from 'react-redux';
import {Container,Button,Modal} from 'react-bootstrap';
import placeholder from '../images/ppic-placeholder.jpg';
import backgroundPlaceholder from '../images/background-placeholder.png';
import ExperienceForm from './forms/ExperienceForm';
import EditProfileForm from './forms/EditProfileForm';
import List from './List';
import ReactPlaceholder from 'react-placeholder';
import {GRADUATION} from './ListItem';

const experiences = [
    {
        post:'Estagiário de desenvolvimento',
        company: 'Teknisa',
        workLocation: 'Belo Horizonte',
        startDate:{
            month:'0',
            year:2017
        },
        isCurrentWork:true,
    },
    {
        post: 'Estagiário de design',
        company: 'DTI',
        workLocation: 'Belo Horizonte',
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

class Profile extends Component{
    constructor(){
        super();
        this.state = {
            showListModal:false,
            showProfileModal:false,
            ready:false,
        }
    }

    handleShowListModal = () => {
        this.setState({showListModal: true});
    }

    handleCloseListModal = () => {
        this.setState({
            showListModal: false
        });
    }

    handleShowProfileModal = () => {
        this.setState({showProfileModal: true});
    }

    handleCloseProfileModal = () => {
        this.setState({
            showProfileModal: false
        });
    }

    componentWillMount(){
        const {getUserInfo,addUserInfo} = this.props;
        getUserInfo().then((doc) => {
            addUserInfo(doc.val());
            this.setState({ready:true});
        });
    }

    addExperience = () => {
        this.setState({editMode: false,initialValues:null});
        this.handleShowListModal();
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
        this.handleShowListModal();
    }


    renderExperiences(){
        if(this.state.ready){
            return(
                <Container className="card experiences">
                    <List title={"Experiências"} items={this.props.experiences} listActionOnClick={this.addExperience} itemOnClick={this.editExperience}/>
                    <List title={"Formação acadêmica"} items={graduations} listActionOnClick={this.addExperience} type={GRADUATION} itemOnClick={this.editExperience}/>
                </Container>
            )
        }
    }

    render(){
        const {profilePic,backgroundPic,location,firstName,lastName,workLocation,occupation,desc} = this.props;
        return(
            <>
            <ReactPlaceholder type='rect' style={{width:'100%',height: '250px'}} showLoadingAnimation={true} ready={this.state.ready}>
                <div className="background-pic" style={{background:`url(${backgroundPic ? backgroundPic : backgroundPlaceholder})`,backgroundPosition:'center'}}></div>
            </ReactPlaceholder>
            <Container className="card profile">
                    <div className="avatar">
                        <ReactPlaceholder type='round' showLoadingAnimation={true} ready={this.state.ready} style={{width:160,height: 160}}>
                            <img alt="profile-pic" src={profilePic ? profilePic : placeholder}/>
                        </ReactPlaceholder>
                    </div>
                    <div className="info">
                        <div className="title">
                            <ReactPlaceholder type='textRow' showLoadingAnimation={true} ready={this.state.ready} style={{width:170,height:30}}>
                                <h3 style={{fontWeight:'bold'}}>{firstName ? firstName + " " + lastName : 'Ronaldo'}</h3>
                            </ReactPlaceholder>
                        </div>
                        <ReactPlaceholder type='textRow' showLoadingAnimation={true} ready={this.state.ready} style={{width:250,height:20}}>
                            <h5 className="occupation">{occupation}</h5>
                        </ReactPlaceholder>
                        <ReactPlaceholder type='textRow' showLoadingAnimation={true} ready={this.state.ready} style={{width:250,height:20}}>
                            <p className="location">{workLocation}</p>
                        </ReactPlaceholder>
                        {location.pathname.substr(1) === this.props.uid && this.state.ready ? <Button className="edit-profile" onClick={this.handleShowProfileModal}>Editar Perfil</Button> : null}
                        <hr/>
                        <div className="desc" style={{textAlign:'justify'}}>
                            <ReactPlaceholder type='text' rows={8} showLoadingAnimation={true} ready={this.state.ready} style={{height:200}}>
                                {desc ? <p>{desc}</p> : <i style={{color:'grey',textAlign:'center',margin:'50px 0px',display:'block'}}>Nenhuma descrição</i>}
                            </ReactPlaceholder>
                        </div>
                    </div>
            </Container>
            {this.renderExperiences()}
            <Modal show={this.state.showListModal} onHide={this.handleCloseListModal}>
                <ExperienceForm editMode={this.state.editMode} initialValues={this.state.initialValues} closeModal={this.handleCloseListModal}/>
            </Modal>
            <Modal show={this.state.showProfileModal} onHide={this.handleCloseProfileModal}>
                <Container style={{padding:'25px'}}><EditProfileForm initialValues={{firstName,lastName,workLocation,occupation,desc}} closeModal={this.handleCloseProfileModal}/></Container>
            </Modal>
            </>
            
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...state.userInfo,
    uid: state.auth.user ? state.auth.user.uid : null
});

const mapDispatchToProps = (dispatch,ownProps) => ({
    getUserInfo: () => dispatch(getUserInfo(ownProps.location.pathname.substr(1))),
    addUserInfo: (data) => dispatch(addUserInfo(data))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Profile));