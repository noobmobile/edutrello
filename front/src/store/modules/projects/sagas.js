import {all, call, put, select, takeLatest} from "@redux-saga/core/effects";
import {
    changeListNameSuccess,
    createListSuccess,
    createTaskSuccess,
    deleteListSuccess,
    getProjectSuccess,
    moveActivitySuccess,
    moveTaskSuccess
} from "./action";
import api from "../../../services/api";
import {toast} from "react-toastify";
import {currentUser} from "../../../utils/utils";

function* getProjectRequest({id}){
    const response = yield call(api.get, "/project/show/" + id)
    const project = response.data
    console.log(project)
    yield put(getProjectSuccess(project))
}

function* moveTaskRequest({task, from, to, y}){
    try {
        const project = yield select(state => state.projects.project)
        const response = yield call(api.post, "/activity/move", null, {
            params: {
                project: project.id,
                task: task.id,
                from: from.id,
                to: to.id,
                y: y,
            }
        })
        yield put(moveTaskSuccess(task, from.id, to.id, y))
    } catch (error){
        toast.error("Não foi possível mover a atividade.")
    }
}
function* moveActivityRequest({activity, to, preview}){
    try {
        if (!preview){
            const project = yield select(state => state.projects.project)
            const response = yield call(api.post, "/activityList/move", null, {
                params: {
                    project: project.id,
                    activity: activity.id,
                    to: to,
                }
            })
        }
        yield put(moveActivitySuccess(activity.id, to))
    } catch (error){
        toast.error("Não foi possível mover a lista.")
    }
}
function* createTaskRequest({activity, title}){
    const toSend = {
        title: title,
        creator: { // CURRENT USER
            id: currentUser,
        },
        activityList: {
            id: activity.id
        }
    }
    try {
        const response = yield call(api.post, "/activity/save", toSend)
        const task = response.data
        yield put(createTaskSuccess(activity.id, task))
    } catch (error){
        toast.error("Não foi possível criar a atividade.")
    }
}

function* createListRequest({title}){
    const project = yield select(state => state.projects.project)
    const toSend = {
        name: title,
        project: {
            id: project.id
        }
    }
    try {
        const response = yield call(api.post, "/activityList/save", toSend)
        const list = response.data
        yield put(createListSuccess(list))
    } catch (error){
        toast.error("Não foi possível criar a lista.")
    }


}

function* deleteListRequest({activity}){
    try {
        const response = yield call(api.delete, "/activityList/delete/"+activity.id)
        yield put(deleteListSuccess(activity.id))
    } catch (error){
        toast.error("Não foi possível deletar a lista.")
    }
}
function* changeListNameRequest({activity, name}){
    try {
        if (name === activity.name) return
        const toSend = {
            name: name
        }
        const response = yield call(api.put, "/activityList/update/" + activity.id, toSend)
        yield put(changeListNameSuccess(activity.id, name))
    } catch (error){
        toast.error("Não foi possível renomear a lista.")
    }
}

export default all(
    [
        takeLatest("GET_PROJECT_REQUEST", getProjectRequest),
        takeLatest("MOVE_TASK_REQUEST", moveTaskRequest),
        takeLatest("MOVE_ACTIVITY_REQUEST", moveActivityRequest),
        takeLatest("CREATE_TASK_REQUEST", createTaskRequest),
        takeLatest("CREATE_LIST_REQUEST", createListRequest),
        takeLatest("DELETE_LIST_REQUEST", deleteListRequest),
        takeLatest("CHANGE_LIST_NAME_REQUEST", changeListNameRequest),
    ]
)