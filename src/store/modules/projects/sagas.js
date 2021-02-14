import {all, put, select, takeLatest} from "@redux-saga/core/effects";
import {createListSuccess, createTaskSuccess, getProjectSuccess, moveActivitySuccess, moveTaskSuccess} from "./action";

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
    // TODO: POST TO API
    yield put(moveTaskSuccess(task, from.id, to.id, y))
}
function* moveActivityRequest({activity, to}){
    // TODO: POST TO API
    yield put(moveActivitySuccess(activity.id, to))
}
function* createTaskRequest({activity, title}){
    // TODO: POST TO API
    const task = { // TODO: RESPONSE FROM API
        name: title,
        order: (activity.tasks ? activity.tasks : []).length + 1,
        creator: { // CURRENT USER
            id: 1,
            name: "user 1"
        },
    }
    yield put(createTaskSuccess(activity.id, task))
}

function* createListRequest({title}){
    // TODO: POST TO API
    const project = yield select(state => state.projects.project)
    const list = { // TODO: RESPONSE FROM API
        name: title,
        order: project.activities.length + 1,
        tasks: [],
        id: project.activities.length + 1,
    }
    yield put(createListSuccess(list))

}

export default all(
    [
        takeLatest("GET_PROJECT_REQUEST", getProjectRequest),
        takeLatest("MOVE_TASK_REQUEST", moveTaskRequest),
        takeLatest("MOVE_ACTIVITY_REQUEST", moveActivityRequest),
        takeLatest("CREATE_TASK_REQUEST", createTaskRequest),
        takeLatest("CREATE_LIST_REQUEST", createListRequest),
    ]
)