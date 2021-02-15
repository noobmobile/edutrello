import {all, put, takeLatest} from "@redux-saga/core/effects";
import {addSuccess} from "./action";

function* addRequest({request}){
    yield put(addSuccess(request))
}

export default all(
    [
        takeLatest("ADD_REQUEST", addRequest),
    ]
)