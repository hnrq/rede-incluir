import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getProfileInfo,startVacancyApply} from '../actions';
import UserProfile from './UserProfile';
import CompanyProfile from './CompanyProfile';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            showExperienceModal:false,
            showGraduationModal:false,
            showProfileModal:false,
            ready:false,
        }
        props.getProfileInfo(this.loadingReady);
    }

    loadingReady = () => {
        this.setState({ready: true});
    }

    render(){
        const {isCompany} = this.props;
        const {ready} = this.state;
        return (isCompany && ready) ? <CompanyProfile ready={ready} {...this.props}/> : <UserProfile ready={ready} {...this.props}/>;
    }
}

const mapStateToProps = (state) => ({
    ...state.profileInfo,
    currentUser:state.auth.user,
    uid: state.auth.user
        ? state.auth.user.uid
        : null
});

const mapDispatchToProps = (dispatch,ownProps) => ({
    getProfileInfo: (ready) => dispatch(getProfileInfo(ownProps.location.pathname.substr(1),ready)),
    vacancyApply: (vacancyId,userId) => dispatch(startVacancyApply(ownProps.location.pathname.substr(1),vacancyId,userId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));