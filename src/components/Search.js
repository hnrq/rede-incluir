import React,{Component} from 'react';
import {Container} from 'react-bootstrap';
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
        return(
            <Container style={{marginTop:'50px'}}>
                <h1>Resultados para {this.state.searchCriteria}</h1>
            </Container>
        ) 
    }
}

export default withRouter(Search);