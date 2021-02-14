import produce from "immer";

export default function test(state = {}, action){
    switch (action.type){
        case "GET_PROJECT_SUCCESS":
            return produce(state, draft => {
                draft.project = action.project
            })
        case "MOVE_TASK_SUCCESS":
            return produce(state, draft => {
                const from = draft.project.activities.find(a => a.id === action.from)
                const to = draft.project.activities.find(a => a.id === action.to)
                const task = from.tasks.find(t => t.name === action.task.name)
                const index = from.tasks.indexOf(task)
                task.order = action.y
                from.tasks.splice(index, 1)
                to.tasks.push(task)
            })
        case "MOVE_ACTIVITY_SUCCESS":
            return produce(state, draft => {
                const activity = draft.project.activities.find(a => a.id === action.activity)

                let before = draft.project.activities.find(a => a.order === action.to)
                while (before) {
                    before.order--
                    before = draft.project.activities.find(a => a.order === before.order && a !== before)
                }

                activity.order = action.to
            })
        default:
            return state
    }
}