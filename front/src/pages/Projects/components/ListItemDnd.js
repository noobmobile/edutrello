import {Avatar, Button, Input, List, Modal, TimePicker, Tooltip} from "antd";
import {
    CheckOutlined,
    ClockCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    FileOutlined
} from "@ant-design/icons";
import * as React from "react";
import {useDrag, useDrop} from "react-dnd";
import {DragTypes} from "../constants";
import {changeTaskTitleRequest, deleteTaskRequest, moveTaskRequest} from "../../../store/modules/projects/action";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {getEmptyImage} from "react-dnd-html5-backend";
import {StyledItem} from "../style";
import ListItemModal from "./ListItemModal";
import {getAbbreviation} from "../../../utils/utils";
import moment from "moment";
import ButtonTransformer from "../../../components/ButtonTransformer";
import {IoTrashOutline} from "react-icons/all";

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
    const changeTaskTitle = (activity, value) => {
        const {dispatch} = props
        dispatch(changeTaskTitleRequest(activity, value))
    }
    const deleteTask = (activity) => {
        const {dispatch} = props
        Modal.confirm({
            title: "Você tem certeza?",
            icon: <ExclamationCircleOutlined />,
            content: "Você quer deletar a tarefa " + activity.title + "?",
            onOk() {
                dispatch(deleteTaskRequest(activity))
            },
            onCancel() {
            },
        })
    }
    const createListItemModal = (activity) => (
        <Modal
            key={activity.id}
            visible={visibleModal === activity.id}
            onCancel={() => setVisibleModal(null)}
            footer={null}
            title={
                <div style={{display: 'flex', alignItems: 'end'}}>
                    <FileOutlined style={{fontSize: '20px', marginRight: '5px', marginTop: '5px'}}/>
                    <div>
                        <Input
                            defaultValue={activity.title}
                            onBlur={(e) => changeTaskTitle(activity, e.target.value)}
                            style={
                                {
                                    fontSize: '18px',
                                    margin: 0,
                                    padding: 0,
                                    fontWeight: 500,
                                    border: 0,
                                }
                            }
                        />
                        <small style={{display: 'block', opacity: '0.80'}}>
                            Na lista <span style={{fontStyle: 'italic'}}>{activity.activityList.name}</span>
                        </small>
                    </div>
                    <div style={{position: 'absolute',  right: '60px', top: '13px'}}>
                        <Tooltip
                            key={activity.creator.id}
                            title={"Criador: " + activity.creator.name}
                        >
                            <Avatar
                                size="small"
                                style={{backgroundColor: activity.creator.color}}
                            >
                                {getAbbreviation(activity.creator.name)}
                            </Avatar>
                        </Tooltip>
                        <Button
                            style={{
                                border: 0,
                                padding: 0,
                                marginLeft: '10px'
                            }}
                        >
                            <Tooltip title={
                                activity.deadline === null ? "Sem prazo" : "Prazo: "+moment(activity.deadline).format("DD/MM/yyyy")
                            }>
                                <ClockCircleOutlined style={{
                                    color: activity.deadline && new Date().getTime() > activity.deadline ? 'red' : 'inherit'
                                }}/>
                            </Tooltip>
                        </Button>
                        <Button
                            onClick={() => deleteTask(activity)}
                            style={{
                                border: 0,
                                padding: 0,
                                marginLeft: '10px'
                            }}
                        >
                            <DeleteOutlined/>
                        </Button>
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