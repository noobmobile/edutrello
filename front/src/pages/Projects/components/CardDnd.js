import ListDnd from "./ListDnd";
import {StyledCard} from "../style";
import * as React from "react";
import {useDrag, useDrop} from "react-dnd";
import {DragTypes} from "../constants";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    changeListNameRequest,
    createTaskRequest,
    deleteListRequest,
    moveActivityRequest
} from "../../../store/modules/projects/action";
import {getEmptyImage} from "react-dnd-html5-backend";
import {Button, Input, Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {IoTrashOutline} from "react-icons/all";

function CardDnd(props){
    const [text, setText] = useState('')
    const [hovering, setHovering] = useState(false)
    const [{isDragging}, drag, preview] = useDrag({
        item: {type: DragTypes.LIST, activity: props.activity},
        end: (item) => wasDropped(item, props.activity.position - 1, false),
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    useEffect(() => {
            preview(getEmptyImage(), { captureDraggingState: true });
    }, [true, preview]);

    function wasDropped(item, x, preview){
        const {dispatch} = props
        dispatch(moveActivityRequest(item.activity, x, preview))
    }
    const [{ isOverBefore }, dropBefore] = useDrop({
        accept: DragTypes.LIST,
       // drop: (item) => wasDropped(item, props.activity.position - 1, false),
        hover: (item) => wasDropped(item, props.activity.position - 1, true),
        collect: (monitor) => ({
            isOverBefore: !!monitor.isOver() ,
        })
    })
    const [{ isOverAfter }, dropAfter] = useDrop({
        accept: DragTypes.LIST,
       // drop: (item) => wasDropped(item, props.activity.position + 1, false),
        hover: (item) => wasDropped(item, props.activity.position + 1, true),
        collect: (monitor) => ({
            isOverAfter: !!monitor.isOver() ,
        })
    })
    const createTask = function (e, activity) {
        const title = text
        if (!title) return
        setText('')
        const {dispatch} = props
        dispatch(createTaskRequest(activity, title))
    }
    const handleTextArea = (e) =>{
        let lineCount = 0;
        if (e.keyCode === 13) {
            lineCount++;
        }
        if (lineCount >= 1) { // set here how may lines you want
            e.preventDefault();
            return false;
        }
    }
    const handleTextChange = (e) =>{
        setText(e.target.value)
    }

    const deleteActivity = (activity) => {
        const {dispatch} = props
        dispatch(deleteListRequest(activity))
    }

    const askDelete = (activity) => (
        Modal.confirm({
            title: "Você tem certeza?",
            icon: <ExclamationCircleOutlined />,
            content: "Você quer deletar a lista " + activity.name + "?",
            onOk() {
                deleteActivity(activity)
            },
            onCancel() {
            },
        })
    )

    const changeListName = (activity, name) => {
        const {dispatch} = props
        dispatch(changeListNameRequest(activity, name))
    }

    return (
        <div>
            <div
                ref={dropBefore}
                style={
                    {
                        height: '570px',
                        width: '5px',
                        marginRight: '5px',
                        borderRadius: '3px',
                        opacity: 0,
                    }
                }/>
            <div
                ref={drag}
                style={
                    {
                        opacity: isDragging ? 0 : 1,
                    }
                }
            >
                <StyledCard
                    bordered={false}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    title={
                        <div>
                            <Input
                                onPressEnter={(e) => changeListName(props.activity, e.target.value)}
                                onBlur={(e) => changeListName(props.activity, e.target.value)}
                                defaultValue={props.activity.name}
                            />
                            <Button
                                style={{opacity: hovering ? 1 : 0}}
                                onClick={() => askDelete(props.activity)}
                            >
                                <IoTrashOutline/>
                            </Button>
                        </div>
                    }>
                        <ListDnd activity={props.activity}/>
                        <Input.TextArea
                            value={text}
                            onKeyDown={handleTextArea}
                            onChange={handleTextChange}
                            onPressEnter={(args) => createTask(args, props.activity)}
                            placeholder="Adicionar card"
                        />
                </StyledCard>
            </div>
            {props.last ?
                <div
                    ref={dropAfter}
                    style={
                        {
                            height: '570px',
                            width: '5px',
                            marginLeft: '5px',
                            borderRadius: '3px',
                            opacity: 0,
                        }
                    }/>
                : null}
        </div>

)
}

export default connect()(CardDnd)