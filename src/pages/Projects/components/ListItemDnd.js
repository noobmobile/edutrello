import {List} from "antd";
import {CheckOutlined} from "@ant-design/icons";
import * as React from "react";
import {useDrag, useDrop} from "react-dnd";
import {DragTypes} from "../constants";
import {moveTaskRequest} from "../../../store/modules/projects/action";
import {connect} from "react-redux";

function ListItemDnd(props) {
    function wasDropped(drop, activity, y) {
        const old = drop.oldActivity
        const item = drop.item
        const newActivity = activity
        const {dispatch} = props
        dispatch(moveTaskRequest(item, old, newActivity, y))
    }
    const [{isDragging}, drag] = useDrag({
        item: {type: DragTypes.LIST_ITEM, item: props.item, oldActivity: props.activity},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    const [{ isOverBefore }, dropBefore] = useDrop({
        accept: DragTypes.LIST_ITEM,
        drop: (item) => wasDropped(item ,props.activity, props.item.order - 1),
        collect: (monitor) => ({
            isOverBefore: !!monitor.isOver()
        })
    })
    const [{ isOverAfter }, dropAfter] = useDrop({
        accept: DragTypes.LIST_ITEM,
        drop: (item) => wasDropped(item ,props.activity, props.item.order + 1),
        collect: (monitor) => ({
            isOverAfter: !!monitor.isOver()
        })
    })
    return (
        <div
            ref={drag}
            style={
                {
                    opacity: isDragging ? 0.5 : 1,
                }
            }
        >
            <div
                ref={dropBefore}
                style={
                {
                    width: '250px',
                    height: isOverBefore ? '40px' : '5px',
                    backgroundColor: '#ddd',
                    marginBottom: '3px',
                    borderRadius: '3px',
                    opacity: isOverBefore ? 1 : 0,
                }
            }/>
            <List.Item>
                <List.Item.Meta
                    title={props.item.name}
                    description={props.description ?
                        <span style={props.style}>
                        <CheckOutlined style={{marginRight: '5px'}}/>{props.description}
                    </span>
                        : null}
                />
            </List.Item>
            {props.last
                ?
                <div
                    ref={dropAfter}
                    style={
                    {
                        width: '250px',
                        height: isOverAfter ? '40px' : '3px',
                        marginTop: '3px',
                        backgroundColor: '#ddd',
                        opacity: isOverAfter ? 1 : 0,
                    }
                }/>
                : null}
        </div>

    )
}

export default connect()(ListItemDnd)