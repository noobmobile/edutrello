import ListDnd from "./ListDnd";
import {StyledCard} from "../style";
import * as React from "react";
import {useDrag, useDrop} from "react-dnd";
import {DragTypes} from "../constants";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {createTaskRequest, moveActivityRequest} from "../../../store/modules/projects/action";
import {getEmptyImage} from "react-dnd-html5-backend";
import {Button, Input} from "antd";
import {PlusOutlined} from "@ant-design/icons";

function CardDnd(props){
    const [text, setText] = useState('')
    const [{isDragging}, drag, preview] = useDrag({
        item: {type: DragTypes.LIST, activity: props.activity},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    useEffect(() => {
            preview(getEmptyImage(), { captureDraggingState: true });
    }, [true, preview]);

    function wasDropped(item, x){
        const {dispatch} = props
        dispatch(moveActivityRequest(item.activity, x))
    }
    const [{ isOverBefore }, dropBefore] = useDrop({
        accept: DragTypes.LIST,
        hover: (item) => wasDropped(item, props.activity.order - 1),
        collect: (monitor) => ({
            isOverBefore: !!monitor.isOver() ,
        })
    })
    const [{ isOverAfter }, dropAfter] = useDrop({
        accept: DragTypes.LIST,
        hover: (item) => wasDropped(item, props.activity.order + 1),
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
                <StyledCard bordered={false} title={props.activity.name}>
                    <ListDnd activity={props.activity}/>
                    <Input.TextArea
                        value={text}
                        onKeyDown={handleTextArea}
                        onChange={handleTextChange}
                        onPressEnter={(args) => createTask(args, props.activity)}
                        placeholder="Adicionar card"/>
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