import {all, put, select, takeLatest} from "@redux-saga/core/effects";
import {getProjectSuccess, moveActivitySuccess, moveTaskSuccess} from "./action";

function* getProjectRequest({id}){
    const preproject = {
        name: "Project 1",
        team: {
            id: 1,
            name: "team 1",
        },
        activities: [
            {
                name: "ACTIVITY 1",
                order: 2,
                id: 1,
                tasks: [
                    {
                        name: "task 1",
                        description: "do something",
                        order: 2,
                        creator: {
                            id: 1,
                            name: "user 1"
                        },
                        dueTo: {
                            id: 2,
                            name: "user 2",
                        },
                        checklist: [
                            {
                                name: "do a thing",
                                done: false
                            }, {
                                name: "do 2 thing",
                                done: false
                            }
                        ]
                    },  {
                        name: "task3",
                        description: "do something",
                        order: 1,
                        creator: {
                            id: 1,
                            name: "user 1"
                        },
                        dueTo: {
                            id: 2,
                            name: "user 2",
                        },
                        checklist: [
                            {
                                name: "do a thing",
                                done: true
                            }
                        ]
                    }
                ]
            },{
                name: "ACTIVITY 2",
                id: 2,
                order: 1,
                tasks: [
                    {
                        name: "task 2",
                        description: "do something2",
                        order: 1,
                        creator: {
                            id: 2,
                            name: "user 2"
                        },
                        dueTo: {
                            id: 1,
                            name: "user 1",
                        },
                    }
                ]
            },
        ]
    }
    yield put(getProjectSuccess(preproject))
}

function* moveTaskRequest({task, from, to, y}){
    yield put(moveTaskSuccess(task, from.id, to.id, y))
}
function* moveActivityRequest({activity, to}){
    yield put(moveActivitySuccess(activity.id, to))
}

export default all(
    [
        takeLatest("GET_PROJECT_REQUEST", getProjectRequest),
        takeLatest("MOVE_TASK_REQUEST", moveTaskRequest),
        takeLatest("MOVE_ACTIVITY_REQUEST", moveActivityRequest),
    ]
)