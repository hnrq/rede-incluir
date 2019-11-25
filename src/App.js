import React, { Component } from 'react';
import './App.scss';
import {Provider} from 'react-redux';
import Header from './components/Header';
import {firebaseAuth,firebaseRef} from './firebase';
import store from './store';
import * as actions from './actions';
import {Router} from 'react-router-dom';
import Container from './components/Container';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss'
import {createBrowserHistory} from 'history';
import "react-placeholder/lib/reactPlaceholder.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';

const history = createBrowserHistory();

toast.configure()

firebaseAuth.onAuthStateChanged((user) => {
    if (user){
      firebaseRef.child(`users/${user.uid}`).once('value').then((doc) => {
        const values = doc.val();
        store.dispatch(actions.login({uid:user.uid,...values}));
        if(history.location.pathname === '/')
          history.push(`/${user.uid}`);      
      });
    } 
    else store.dispatch(actions.logout());
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
