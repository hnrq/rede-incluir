import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Container,Button,Modal} from 'react-bootstrap';
import placeholder from '../images/ppic-placeholder.png';
import backgroundPlaceholder from '../images/background-placeholder.png';
import JobOpportunityForm from './forms/JobOpportunityForm';
import EditCompanyForm from './forms/EditCompanyForm';
import JobOpportunityList from './List/JobOpportunityList';
import ReactPlaceholder from 'react-placeholder';
import {disabilities} from '../utils/Disabilities';

class CompanyProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            showJobOpportunityModal:false,
            showProfileModal:false,
        }
    }

    handleShowJobOpportunityModal = () => {
        this.setState({showJobOpportunityModal: true});
    }

    handleCloseProfileModal = () => {
    this.setState({showProfileModal: false});
    }

    handleShowProfileModal = () => {
        const {name,desc,profilePic,zipCode,street,number,complement,city,neighborhood,province} = this.props;
        this.setState({showProfileModal: true,initialValues:{name,desc,profilePic,zipCode,street,number,city,complement,neighborhood,province}});
    }

    handleCloseJobOpportunityModal = () => {
        this.setState({
            showJobOpportunityModal: false
        });
    }

    addJobOpportunity = () => {
        this.setState({editMode: false,initialValues:null});
        this.handleShowJobOpportunityModal();
    }

    editJobOpportunity = (jobOpportunity) => {
        this.setState({editMode: true,initialValues:jobOpportunity});
        this.handleShowJobOpportunityModal();
    }


    renderLists(showItemAction){
        if(this.props.ready){
            return(
                <Container style={{padding:0}} className="card experiences">
                    <JobOpportunityList showItemAction={showItemAction} title={"Vagas ofertadas"}  items={this.props.jobOpportunities} listAction={showItemAction ? this.addJobOpportunity : null} listItemAction={showItemAction ? this.editJobOpportunity : null}/>
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
            <Modal size="lg" show={this.state.showJobOpportunityModal} onHide={this.handleCloseJobOpportunityModal}>
                <JobOpportunityForm editMode={this.state.editMode} initialValues={this.state.initialValues} closeModal={this.handleCloseJobOpportunityModal}/>
            </Modal>
            <Modal size="lg" show={this.state.showProfileModal} onHide={this.handleCloseProfileModal}>
                <EditCompanyForm initialValues={this.state.initialValues} closeModal={this.handleCloseProfileModal}/>
            </Modal>
            </>
            
        )
    }
}

export default withRouter(CompanyProfile);