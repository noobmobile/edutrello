import {all} from "@redux-saga/core/effects";
import projects from './projects/sagas'

export default function* rootSaga(){
    return yield all(
        [
            projects,
        ]
    )
}