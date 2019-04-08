import thunk from 'redux-thunk';
import {createStore,compose,applyMiddleware} from 'redux';
import reducers from '../reducers';

export default createStore(reducers,compose(
    applyMiddleware(thunk),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));