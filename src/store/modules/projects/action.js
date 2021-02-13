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
export function moveActivityRequest(activity, to){
    return {
        type: "MOVE_ACTIVITY_REQUEST",
        activity,
        to,
    }
}
export function moveActivitySuccess(activity, to){
    return {
        type: "MOVE_ACTIVITY_SUCCESS",
        activity,
        to,
    }
}