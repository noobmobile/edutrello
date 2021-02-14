import {all, put, takeLatest} from "@redux-saga/core/effects";
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
                order: 1,
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
            },
            {
                name: "ACTIVITY 2",
                id: 2,
                order: 2,
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
            {
                name: "ACTIVITY 4",
                order: 4,
                id: 4,
                tasks:[],
            },{
                name: "ACTIVITY 6",
                order: 6,
                id: 6,
                tasks:[],
            },{
                name: "ACTIVITY 5",
                order: 5,
                id: 5,
                tasks:[],
            },
            {
                name: "ACTIVITY 3",
                order: 3,
                id: 3,
                tasks: [
                    {
                        name: "task 33",
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
                            }, {
                                name: "do 2 thing",
                                done: false
                            }, {
                                name: "do 2 thing",
                                done: true
                            }
                        ]
                    },
                    {
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
                    },
                    {
                        name: "task4",
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
                    },
                    {
                        name: "task5",
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
                    },
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