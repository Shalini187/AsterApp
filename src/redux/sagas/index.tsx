import { put, takeLatest, all } from "@redux-saga/core/effects";
import { getQueryRequest } from "../../services/api";
import { GET_POPULAR_LIST } from "../../services/urls";
import types from "../types";
import { createQueryString } from "../../utils";

function* getTopHeadline({ payload, apiCall }: any) {
    try {
        const res =  yield (getQueryRequest(GET_POPULAR_LIST, createQueryString(payload)));
        console.log("Saga Api Call ---> " , res, payload)
        if (res?.results?.length) {
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