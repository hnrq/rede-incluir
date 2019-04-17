import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchCriteria: ''
        }
    }

    componentDidMount(){
        const values = this.props.location.state;
        this.setState({searchCriteria:decodeURI(values.query)});
    }
    render(){
        return <h1>Resultados para {this.state.searchCriteria}</h1>
    }
}

export default withRouter(Search);