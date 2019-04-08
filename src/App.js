import React, { Component } from 'react';
import './App.scss';
import {Provider} from 'react-redux';
import Header from './components/Header';
import {firebaseAuth} from './firebase';
import store from './store';
import * as actions from './actions';
import {Router} from 'react-router-dom';
import Container from './components/Container';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss'
import {createBrowserHistory} from 'history';
import "react-placeholder/lib/reactPlaceholder.css";


const history = createBrowserHistory();

toast.configure()

firebaseAuth.onAuthStateChanged((user) => {
    if (user){
      store.dispatch(actions.login(user));
    } 
    else{ 
      store.dispatch(actions.logout());
      history.push('/');
    }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} basename={process.env.PUBLIC_URL}>
          <div className="App">
            <Header/>
            <Container/>
          </div>
          <ToastContainer position="top-center"/>
        </Router>
      </Provider>
    );
  }
}

export default App;
