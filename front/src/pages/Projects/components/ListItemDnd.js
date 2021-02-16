import {List, Modal} from "antd";
import {CheckOutlined, FileOutlined} from "@ant-design/icons";
import * as React from "react";
import {useDrag, useDrop} from "react-dnd";
import {DragTypes} from "../constants";
import {moveTaskRequest} from "../../../store/modules/projects/action";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {getEmptyImage} from "react-dnd-html5-backend";
import {StyledItem} from "../style";
import ListItemModal from "./ListItemModal";

function ListItemDnd(props) {
    const [visibleModal, setVisibleModal] = useState(null)
    function wasDropped(drop, activity, y) {
        const old = drop.oldActivity
        const item = drop.item
        const newActivity = activity
        const {dispatch} = props
        dispatch(moveTaskRequest(item, old, newActivity, y))
    }
    const [{isDragging}, drag, preview] = useDrag({
        item: {type: DragTypes.LIST_ITEM, item: props.item, props: props, oldActivity: props.activity},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [true, preview]);
    const [{ isOverBefore }, dropBefore] = useDrop({
        accept: DragTypes.LIST_ITEM,
        drop: (item) => wasDropped(item ,props.activity, props.item.position - 1),
        collect: (monitor) => ({
            isOverBefore: !!monitor.isOver()
        })
    })
    const [{ isOverAfter }, dropAfter] = useDrop({
        accept: DragTypes.LIST_ITEM,
        drop: (item) => wasDropped(item ,props.activity, props.item.position + 1),
        collect: (monitor) => ({
            isOverAfter: !!monitor.isOver()
        })
    })
    const createListItemModal = (activity) => (
        <Modal
            key={activity.id}
            visible={visibleModal === activity.id}
            onCancel={() => setVisibleModal(null)}
            footer={null}
            title={
                <div style={{display: 'flex', alignItems: 'end'}}>
                    <FileOutlined style={{fontSize: '20px', marginRight: '5px'}}/>
                    <div>
                       <span style={{fontSize: '18px'}}>
                        {activity.title}
                    </span>
                        <small style={{display: 'block', opacity: '0.80'}}>
                            Na lista <span style={{fontStyle: 'italic'}}>{activity.activityList.name}</span>
                        </small>
                    </div>

                </div>
            }
        >
            <ListItemModal activity={activity}/>
        </Modal>
    )
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
            {createListItemModal(props.item)}
            <StyledItem onClick={() => setVisibleModal(props.item.id)}>
                <List.Item.Meta
                    title={props.item.title}
                    description={props.description}
                />
            </StyledItem>
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