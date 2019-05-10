import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserInfo} from '../actions';
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
        props.getUserInfo(this.loadingReady);
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
    ...state.userInfo,
    uid: state.auth.user
        ? state.auth.user.uid
        : null
});

const mapDispatchToProps = (dispatch,ownProps) => ({
    getUserInfo: (ready) => dispatch(getUserInfo(ownProps.location.pathname.substr(1),ready))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));