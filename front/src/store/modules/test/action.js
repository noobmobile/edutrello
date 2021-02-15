export function addRequest(request){
    return {
        type: "ADD_REQUEST",
        request,
    }
}

export function addSuccess(request){
    return {
        type: "ADD_SUCCESS",
        request,
    }
}