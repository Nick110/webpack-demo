/** @format */

import todoReducer from './reducers/todo';
import homeReducer from './reducers/home';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import saga from './saga';
const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    todoReducer,
    homeReducer,
});

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(saga);

export default store;
