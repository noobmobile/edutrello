import produce from "immer";

export default function test(state = {}, action){
    switch (action.type){
        case "ADD_SUCCESS":
            return produce(state, draft => {

            })
        default:
            return state
    }
}