export function getProjectRequest(id){
    return {
        type: "GET_PROJECT_REQUEST",
        id,
    }
}

export function getProjectSuccess(project){
    return {
        type: "GET_PROJECT_SUCCESS",
        project,
    }
}

export function moveTaskRequest(task, from, to, y){
    return {
        type: "MOVE_TASK_REQUEST",
        task,
        from,
        to,
        y,
    }
}
export function moveTaskSuccess(task, from, to, y){
    return {
        type: "MOVE_TASK_SUCCESS",
        task,
        from,
        to,
        y,
    }
}
export function moveActivityRequest(activity, to, preview){
    return {
        type: "MOVE_ACTIVITY_REQUEST",
        activity,
        to,
        preview,
    }
}
export function moveActivitySuccess(activity, to, preview){
    return {
        type: "MOVE_ACTIVITY_SUCCESS",
        activity,
        to,
        preview,
    }
}
export function createTaskRequest(activity, title){
    return {
        type: "CREATE_TASK_REQUEST",
        activity,
        title,
    }
}
export function createTaskSuccess(activity, task){
    return {
        type: "CREATE_TASK_SUCCESS",
        activity,
        task,
    }
}
export function createListRequest(title){
    return {
        type: "CREATE_LIST_REQUEST",
        title,
    }
}
export function createListSuccess(list){
    return {
        type: "CREATE_LIST_SUCCESS",
        list,
    }
}

export function deleteListRequest(activity){
    return {
        type: "DELETE_LIST_REQUEST",
        activity,
    }
}

export function deleteListSuccess(activity){
    return {
        type: "DELETE_LIST_SUCCESS",
        activity,
    }
}
export function changeListNameRequest(activity, name){
    return {
        type: "CHANGE_LIST_NAME_REQUEST",
        activity,
        name,
    }
}

export function changeListNameSuccess(activity, name){
    return {
        type: "CHANGE_LIST_NAME_SUCCESS",
        activity,
        name,
    }
}
export function changeTaskDescriptionRequest(task, description){
    return {
        type: "CHANGE_TASK_DESCRIPTION_REQUEST",
        task,
        description,
    }
}
export function changeTaskDescriptionSuccess(task, description, activity){
    return {
        type: "CHANGE_TASK_DESCRIPTION_SUCCESS",
        task,
        activity,
        description,
    }
}

export function changeCheckRequest(check, task, value){
    return {
        type: "CHANGE_CHECK_REQUEST",
        check,
        task,
        value,
    }
}
export function changeCheckSuccess(check, task, activity, value){
    return {
        type: "CHANGE_CHECK_SUCCESS",
        check,
        task,
        activity,
        value,
    }
}