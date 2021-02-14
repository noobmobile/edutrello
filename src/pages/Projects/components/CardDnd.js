import ListDnd from "./ListDnd";
import {StyledCard} from "../style";
import * as React from "react";
import {useDrag, useDrop} from "react-dnd";
import {DragTypes} from "../constants";
import {useEffect} from "react";
import {connect} from "react-redux";
import {moveActivityRequest} from "../../../store/modules/projects/action";
import {getEmptyImage} from "react-dnd-html5-backend";

function CardDnd(props){
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
    return (
        <div>
            <div
                ref={dropBefore}
                style={
                    {
                        height: '570px',
                        width: isOverBefore ? '5px' : '5px',
                        backgroundColor: '#006AA8',
                        marginRight: '5px',
                        borderRadius: '3px',
                        opacity: isOverBefore ? 0 : 0,
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
                </StyledCard>
            </div>
            {props.last ?
                <div
                    ref={dropAfter}
                    style={
                        {
                            height: '570px',
                            width: isOverAfter ? '5px' : '5px',
                            backgroundColor: '#006AA8',
                            marginLeft: '5px',
                            borderRadius: '3px',
                            opacity: isOverAfter ? 0 : 0,
                        }
                    }/>
                : null}
        </div>

)
}

export default connect()(CardDnd)