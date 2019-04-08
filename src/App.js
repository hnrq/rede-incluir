import React, { Component } from 'react';
import './App.scss';
import {Provider} from 'react-redux';
import Header from './components/Header';
import {firebaseAuth} from './firebase';
import store from './store';
import * as actions from './actions';
import {BrowserRouter} from 'react-router-dom';
import Container from './components/Container';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss'

toast.configure()

firebaseAuth.onAuthStateChanged((user) => {
    if (user) store.dispatch(actions.login(user));
    else store.dispatch(actions.logout());
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div className="App">
            <Header/>
            <Container/>
          </div>
          <ToastContainer position="top-center"/>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
