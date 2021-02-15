import ListItemDnd from "./ListItemDnd";
import {List} from "antd";
import * as React from "react";
import {colors} from "../../../styles/colors";
import {useDrop} from "react-dnd";
import {DragTypes} from "../constants";
import {moveTaskRequest} from "../../../store/modules/projects/action";
import {connect} from "react-redux";

const style = {
    backgroundColor: colors.check,
    color: 'white',
    borderRadius: '5px',
    padding: '3px 8px',
}
function ListDnd(props){
    function wasDropped(drop, activity) {
        const old = drop.oldActivity
        const item = drop.item
        const newActivity = activity
        const {dispatch} = props
        dispatch(moveTaskRequest(item, old, newActivity, 0))
    }

    const [{ isOver }, drop] = useDrop({
        accept: DragTypes.LIST_ITEM,
        drop: (item) => wasDropped(item ,props.activity),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    })
    const tasks = [...props.activity.activities]
        .sort((x, y) => x.position - y.position)
    return (
        <div ref={props.activity.activities.length === 0 ? drop : null}>
            <List
                itemLayout="horizontal"
                dataSource={tasks}
                renderItem={item => {
                    let description = null
                    let all = false
                    if (item.checklists && item.checklists.length !== 0) {
                        description = item.checklists.filter(c => c.done).length + "/" + item.checklists.length
                        all = item.checklists.filter(c => c.done).length === item.checklists.length
                    }
                    return (
                        <ListItemDnd
                            last={tasks.indexOf(item) === tasks.length - 1}
                            item={item}
                            activity={props.activity}
                            description={description}
                            style={all ? style : {}}
                        />
                    );
                }}
            />
        </div>


    )
}


export default connect()(ListDnd)