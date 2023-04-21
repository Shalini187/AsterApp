import { put, takeLatest, all } from "@redux-saga/core/effects";
import types from "../types";

function* getTopHeadline(headLineRequest: any, payload: any) {
    try {
        const res = yield (headLineRequest(payload))
        if (res?.results?.length > 0) {
            yield put({
                type: types.API_SUCCESS,
                payload: res?.results
            })
        } else {
            yield put({ type: types.API_LIST_END })
        }
    } catch (err: any) {
        yield put({
            type: types.API_FAILURE,
            payload: err.message
        })
    }
}

function* topHeadlineSaga() {
    yield takeLatest(types.API_REQUEST, getTopHeadline);
}

export default function* rootSaga() {
    yield all([
        topHeadlineSaga(),
    ])
}