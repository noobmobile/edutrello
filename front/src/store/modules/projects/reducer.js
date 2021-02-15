import produce from "immer";

export default function test(state = {}, action){
    switch (action.type){
        case "GET_PROJECT_SUCCESS":
            return produce(state, draft => {
                draft.project = action.project
            })
        case "MOVE_TASK_SUCCESS":
            return produce(state, draft => {
                const from = draft.project.tasks.find(a => a.id === action.from)
                const to = draft.project.tasks.find(a => a.id === action.to)
                const task = from.activities.find(t => t.id === action.task.id)
                const index = from.activities.indexOf(task)
                task.position = action.y
                from.activities.splice(index, 1)
                to.activities.push(task)
            })
        case "MOVE_ACTIVITY_SUCCESS":
            return produce(state, draft => {
                const activity = draft.project.tasks.find(a => a.id === action.activity)

                let before = draft.project.tasks.find(a => a.position === action.to)
                while (before) {
                    before.position--
                    before = draft.project.tasks.find(a => a.position === before.position && a !== before)
                }

                activity.position = action.to
            })
        case "CREATE_TASK_SUCCESS":
            return produce(state, draft => {
                const activity = draft.project.tasks.find(a => a.id === action.activity)
                activity.activities.push(action.task)
            })
        case "CREATE_LIST_SUCCESS":
            return produce(state, draft => {
                draft.project.tasks.push(action.list)
            })
        default:
            return state
    }
}