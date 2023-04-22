import { put, takeLatest, all } from "@redux-saga/core/effects";
import { GET_POPULAR_LIST } from "../../services/urls";
import types from "../types";
import { createQueryString } from "../../utils";

function* getTopHeadline({ payload }: any) {
    let { apiCall, isSearch = false, url = GET_POPULAR_LIST, id = false, ...rest } = payload || {};

    try {
        const res = yield (apiCall(url, createQueryString(rest)));
        console.log("Saga Api Call ---> ", res, payload)
        if (res?.results?.length || res?.id) {
            yield put({
                type: types.API_SUCCESS,
                payload: {
                    results: res?.results ?? res,
                    id
                }
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
    yield all([topHeadlineSaga()])
}