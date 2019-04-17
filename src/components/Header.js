import React,{Component} from 'react';
import {Navbar,Form,Button,Row,Col,Nav} from 'react-bootstrap';
import PasswordInput from './custom-bootstrap/PasswordInput';
import {LinkContainer} from 'react-router-bootstrap';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions';
import {authenticate} from '../firebase/auth';
import queryString from 'query-string';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchCriteria: '',
            email: '',
            password: '',
        };
    }

    handleSearchCriteria = (e) => {
        this.setState({
            searchCriteria: e.target.value
        });
    }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    login = (e) => {
        const {email, password} = this.state ;
        authenticate(email, password);
    }
    
    search = (e) => {
        e.preventDefault()
        this.props.history.push({
            pathname: '/search',
            search: `?${queryString.stringify({query:this.state.searchCriteria})}`,
            state: {
                query: this.state.searchCriteria
            }
        })
    }
    

    renderForm = () => {
        if(this.props.isLogged)
            return(
                <Nav style={{width:'100%'}}>
                <Form.Row onSubmit={this.search}>
                    <Col><Form.Control type="text" value={this.state.searchCriteria} className="mr-sm-2" onChange={this.handleSearchCriteria} placeholder="Search"/></Col>
                    <Col md={4}><Button variant="primary" type="submit" onClick={this.search} className="mr-sm-2" block>Search</Button></Col>
                </Form.Row>
                    <Row className="ml-auto">
                        <Col><Button variant="danger" onClick={this.props.logout} block>Logout</Button></Col>
                    </Row>
                </Nav>
                );
        else return(<Nav className="ml-auto"><Form inline onSubmit={this.login}>
                <Form.Group>
                    <Form.Control type="text" value={this.state.email} className="mr-sm-2" onChange={this.handleEmail} placeholder="Email"/>
                </Form.Group>
                <Form.Group className="inner-addon right-addon mr-sm-2"><PasswordInput value={this.state.password} onChange={this.handlePassword} placeholder="Senha"/></Form.Group>
            </Form>
                <Row style={{paddingBottom:0}}>
                    <Col><Button type="submit" block variant="primary" onClick={this.login} >Log-in</Button></Col>
                </Row>
            </Nav>);
    }

    render(){
        return(
            <Navbar fixed="top" bg="light" expand="lg">
                <LinkContainer to="/"><Navbar.Brand><b>Rede Incluir</b></Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                        {this.renderForm()}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => ({
    isLogged: !!state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        dispatch(startLogout())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));