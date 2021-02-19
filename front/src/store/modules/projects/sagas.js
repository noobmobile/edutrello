import {all, call, put, select, takeLatest} from "@redux-saga/core/effects";
import {
    addAttachmentSuccess,
    addResponsibleSuccess,
    changeCheckSuccess,
    changeListNameSuccess,
    changeTaskDeadlineSuccess,
    changeTaskDescriptionSuccess,
    changeTaskTitleSuccess,
    createCheckSuccess,
    createListSuccess,
    createTaskSuccess,
    deleteCheckSuccess,
    deleteListSuccess,
    deleteTaskSuccess,
    getProjectSuccess,
    moveActivitySuccess,
    moveTaskSuccess, removeAttachmentSuccess,
    removeResponsibleSuccess
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
    }


}

function* deleteListRequest({activity}){
    try {
        const response = yield call(api.delete, "/activityList/delete/"+activity.id)
        yield put(deleteListSuccess(activity.id))
    } catch (error){
        toast.error("Não foi possível deletar a lista.")
        console.log(error)
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
        console.log(error)
    }
}

function* changeTaskDescriptionRequest({task, description}){
    try {
        if (task.description === description) return
        const toSend = {
            description: description
        }
        const response = yield call(api.put, "/activity/update/" + task.id, toSend)
        yield put(changeTaskDescriptionSuccess(task.id, description, task.activityList.id))
    } catch (error){
        toast.error("Não foi possível renomear a descrição da tarefa.")
        console.log(error)
    }
}

function* changeCheckRequest({check, task, value}){
    try {
        const toSend = {
            done: value
        }
        const response = yield call(api.put, "/checklistitem/update/" + check.id, toSend)
        yield put(changeCheckSuccess(check.id, task.id, task.activityList.id, value))
    } catch (error){
        toast.error("Não foi possível marcar a tarefa como concluido.")
        console.log(error)
    }
}

function* createCheckRequest({task, value}){
    try {
        const toSend = {
            title: value,
            done: false,
            activity: {
                id: task.id
            }
        }
        const response = yield call(api.post, "/checklistitem/save/", toSend)
        const check = response.data
        yield put(createCheckSuccess(task.id, task.activityList.id, check))
    } catch (error){
        toast.error("Não foi criar o checklist.")
        console.log(error)
    }
}
function* removeResponsibleRequest({task, member}){
    try {
        const newResponsibles = task.responsibles.filter(r => r.id !== member.id)
        const toSend = {
            responsibles: newResponsibles
        }
        const response = yield call(api.put, "/activity/update/"+task.id, toSend)
        yield put(removeResponsibleSuccess(task.id, task.activityList.id, member.id))
    } catch (error){
        toast.error("Não foi remover o responsável.")
        console.log(error)
    }
}
function* addResponsibleRequest({task, member}){
    try {
        const project = yield select(state => state.projects.project)
        const responsible =  project.members.find(m => m.id === member)
        const newResponsibles = [...task.responsibles]
        newResponsibles.push(responsible)
        const toSend = {
            responsibles: newResponsibles
        }
        const response = yield call(api.put, "/activity/update/"+task.id, toSend)
        yield put(addResponsibleSuccess(task.id, task.activityList.id, responsible))
    } catch (error){
        toast.error("Não foi adicionar o responsável.")
        console.log(error)
    }
}

function* changeTaskTitleRequest({task, title}){
    try {
        const toSend = {
            title: title
        }
        const response = yield call(api.put, "/activity/update/"+task.id, toSend)
        yield put(changeTaskTitleSuccess(task.id, task.activityList.id, title))
    } catch (error){
        toast.error("Não foi possível alterar o título da tarefa.")
        console.log(error)
    }
}

function* deleteTaskRequest({task}){
    try {
        const response = yield call(api.delete, "/activity/delete/"+task.id)
        yield put(deleteTaskSuccess(task.id, task.activityList.id))
    } catch (error){
        toast.error("Não foi possível deletar a tarefa.")
        console.log(error)
    }
}

function* deleteCheckRequest({check, task}){
    try {
        const response = yield call(api.delete, "/checklistitem/delete/"+check.id)
        yield put(deleteCheckSuccess(check.id, task.id, task.activityList.id))
    } catch (error){
        toast.error("Não foi possível deletar esse checklist.")
        console.log(error)
    }
}

function* changeTaskDeadlineRequest({task, deadline}){
    try {
        const toSend = {
            deadline: deadline
        }
        const response = yield call(api.put, "/activity/update/"+task.id, toSend)
        yield put(changeTaskDeadlineSuccess(task.id, task.activityList.id, deadline))
    } catch (error){
        toast.error("Não foi possível alterar o prazo dessa tarefa.")
        console.log(error)
    }
}

function* addAttachmentRequest({task, attachment}){
    try {
        const toSend = {
            ...attachment,
            activity: {
                id: task.id,
            }
        }
        console.log(toSend)
        const response = yield call(api.post, "/attachment/save/", toSend)
        yield put(addAttachmentSuccess(task.id, task.activityList.id, response.data))
    } catch (error){
        toast.error("Não foi possível adicionar o anexo.")
        console.log(error.stack)
    }
}
function* removeAttachmentRequest({task, attachment}){
    try {
        const response = yield call(api.delete, "/attachment/delete/" + attachment.id)
        yield put(removeAttachmentSuccess(task.id, task.activityList.id, attachment.id))
    } catch (error){
        toast.error("Não foi possível remover o anexo.")
        console.log(error)
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
        takeLatest("CHANGE_TASK_DESCRIPTION_REQUEST", changeTaskDescriptionRequest),
        takeLatest("CHANGE_CHECK_REQUEST", changeCheckRequest),
        takeLatest("CREATE_CHECK_REQUEST", createCheckRequest),
        takeLatest("REMOVE_RESPONSIBLE_REQUEST", removeResponsibleRequest),
        takeLatest("ADD_RESPONSIBLE_REQUEST", addResponsibleRequest),
        takeLatest("CHANGE_TASK_TITLE_REQUEST", changeTaskTitleRequest),
        takeLatest("DELETE_TASK_REQUEST", deleteTaskRequest),
        takeLatest("DELETE_CHECK_REQUEST", deleteCheckRequest),
        takeLatest("CHANGE_TASK_DEADLINE_REQUEST", changeTaskDeadlineRequest),
        takeLatest("ADD_ATTACHMENT_REQUEST", addAttachmentRequest),
        takeLatest("REMOVE_ATTACHMENT_REQUEST", removeAttachmentRequest),
    ]
)