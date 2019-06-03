import thunk from 'redux-thunk';
import {createStore,compose,applyMiddleware} from 'redux';
import reducers from '../reducers';

export default createStore(reducers,compose(
    applyMiddleware(thunk),
window.REDUX_DEVTOOLS_EXTENSION ? window.REDUX_DEVTOOLS_EXTENSION() : f => f));