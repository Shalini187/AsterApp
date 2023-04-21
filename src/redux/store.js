import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

import rootSaga from './sagas';
import reducers from "./reducers";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(reducers, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;