import React,{Component} from 'react';
import {Container, Navbar, Row, Col} from 'react-bootstrap';
import Select from 'react-select';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {startSearch} from '../actions/';
import SearchList from './List/SearchList';
import {disabilities} from '../utils/Disabilities';
import ReactPlaceholder from 'react-placeholder';

const showOptions = [
    {
        value:'both',
        label:'Usuários e empresas'
    },
    {
        value:'user',
        label:'Usuários'
    },
    {
        value:'company',
        label:'Empresas'
    },
]

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchCriteria: null,
            searchResults: null,
            ready : false,
            show: showOptions[0],
            disabilities: []
        }
    }

    componentDidMount(){
        const values = this.props.location.state;
        const searchCriteria = decodeURI(values.query);
        this.setState({searchCriteria});
        this.props.search(searchCriteria,this.loadingReady);
    }

    componentDidUpdate(prevProps){
        const values = this.props.location.state;
        const searchCriteria = decodeURI(values.query);
        if(this.state.searchCriteria !== searchCriteria){
            this.setState({searchCriteria,ready: false});
            this.props.search(searchCriteria,this.loadingReady);
        }
    }

    handleShow = (show) => {
        this.setState({
            show
        });
    }

    handleDisabilities = (disabilities) => {
        this.setState({
            disabilities
        });
    }

    loadingReady = () => {
        this.setState({ready: true});
    }

    filterUsers = () => {
        const {users} = this.props.searchResults;
        if(this.state.disabilities.length > 0){
            const disabilities = this.state.disabilities.map(disability => disability.value);
            var result = {},key;
            for(key in users){
                if(users.hasOwnProperty(key) && users[key].disabilities)
                    if(disabilities.every((disability) => users[key].disabilities.indexOf(disability) > -1))
                        result[key] = users[key];
                // users[key].filter((value) => {
                //     return !!value.disabilities ? value.disabilties.some(item => disabilities.includes(item)) : false
                // });
            }
            return result === {} ? undefined : result;
        }
        else return users;
    }

    render(){
        return(
            <>
                <Navbar style={{marginTop:50 }} bg="light" expand="lg">
                    <Row style={{width:'100%'}}>
                        <Col md={6}>
                            <label htmlFor="show">Mostrar</label>
                            <Select
                                defaultValue="both"
                                isSearchable={false}
                                name="show"
                                value={this.state.show}
                                options={showOptions}
                                onChange={this.handleShow}/>
                        </Col>
                        <Col md={6}>
                            <label htmlFor="show">Deficiências</label>
                            <Select
                                name="disabilities"
                                isMulti
                                value={this.state.disabilities}
                                onChange={this.handleDisabilities}
                                isSearchable={false}
                                placeholder="Selecione uma ou mais deficiências"
                                options={disabilities}/>
                        </Col>
                    </Row>
                </Navbar>
                <Container style={{marginTop:'20px'}}>
                    <h3>Resultados da pesquisa {this.state.searchCriteria ? `para "${this.state.searchCriteria}"` : null}</h3>
                    {(this.state.show.value !== 'company' ? 
                    <>
                        <h4>Usuários</h4>
                        <ReactPlaceholder type='media' rows={4} showLoadingAnimation={true} ready={this.state.ready}>
                            <SearchList items={this.filterUsers()}/>
                        </ReactPlaceholder>
                    </>
                    : null)}
                    {(this.state.show.value !== 'user') ? 
                    <>
                        <h4>Empresas</h4>
                        <ReactPlaceholder type='media' rows={4} showLoadingAnimation={true} ready={this.state.ready}>
                            <SearchList items={this.props.searchResults.companies}/>
                        </ReactPlaceholder>
                    </> : null}
                </Container>
            </>
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