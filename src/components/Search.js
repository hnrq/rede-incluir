import React,{Component} from 'react';
import {Container} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {startSearch} from '../actions/';
import SearchList from './List/SearchList';
import ReactPlaceholder from 'react-placeholder';


class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchCriteria: null,
            ready : false,
        }
    }

    componentDidMount(){
        const values = this.props.location.state;
        const searchCriteria = decodeURI(values.query)
        this.setState({searchCriteria});
        this.props.search(searchCriteria,this.loadingReady);
    }

    loadingReady = () => {
        this.setState({ready: true});
    }

    render(){
        return(
            <Container style={{marginTop:'70px'}}>
                <h3>Resultados da pesquisa {this.state.searchCriteria ? `para ${this.state.searchCriteria}` : null}</h3>
                <ReactPlaceholder type='media' rows={4} showLoadingAnimation={true} ready={this.state.ready}>
                    <SearchList items={this.props.searchResults}/>
                </ReactPlaceholder>
            </Container>
        ) 
    }
}

const mapStateToProps = (state) => ({
    searchResults: state.searchResults
});

const mapDispatchToProps = (dispatch) => ({
    search: (searchCriteria, ready) => dispatch(startSearch(searchCriteria, ready))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Search));