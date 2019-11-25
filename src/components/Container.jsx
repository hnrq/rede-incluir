import React,{Component} from 'react';
import {Route,withRouter,Switch} from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Search from './Search';


class Container extends Component{
    render(){
        return(
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path={`/search`} component={Search}/>
                <Route path="/:id" component={Profile}/>
            </Switch>
        );
    }
}

export default withRouter(Container);