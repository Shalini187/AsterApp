import { combineReducers } from 'redux';
import auth from "./auth";
import api from "./api";
import types from '../types';

const appReducer = combineReducers({ auth, api });

const rootReducer = (state: any, action: any) => {
    if (action.type == types.CLEAR_REDUX_STATE) {
        state = undefined;
    }
    if (action.type == types.CLEAR_REDUX_DATA) {
        state = {
            ...state, api: { ...state?.api, data: [] }
        };
    }
    return appReducer(state, action)
}

export default rootReducer;