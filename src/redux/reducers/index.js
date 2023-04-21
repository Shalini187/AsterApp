import { combineReducers } from 'redux';
import auth from "./auth";
import api from "./api";
import types from '../types';

const appReducer = combineReducers({ auth, api });

const rootReducer = (state, action) => {
    if (action.type == types.CLEAR_REDUX_STATE) {
        state = undefined;
    }
    return appReducer(state, action)
}

export default rootReducer;