import todoReducer from './reducers/todo';
import homeReducer from './reducers/home';
import { createStore, combineReducers } from "redux";

const reducer = combineReducers({
    todoReducer,
    homeReducer
})
export default createStore(reducer);


