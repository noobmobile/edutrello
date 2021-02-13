import ListDnd from "./ListDnd";
import {StyledCard} from "../style";
import * as React from "react";
import {useDrag, useDrop} from "react-dnd";
import {DragTypes} from "../constants";
import {colors} from "../../../styles/colors";
import {useRef} from "react";
import {connect} from "react-redux";
import {moveActivityRequest} from "../../../store/modules/projects/action";

function CardDnd(props){
    const [{isDragging}, drag] = useDrag({
        item: {type: DragTypes.LIST, activity: props.activity},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    function wasDropped(item, x){
        const {dispatch} = props
        dispatch(moveActivityRequest(item.activity, x))
    }
    const [{ isOverBefore }, dropBefore] = useDrop({
        accept: DragTypes.LIST,
        drop: (item) => wasDropped(item, props.activity.order - 1),
        collect: (monitor) => ({
            isOverBefore: !!monitor.isOver() ,
        })
    })
    const [{ isOverAfter }, dropAfter] = useDrop({
        accept: DragTypes.LIST,
        drop: (item) => wasDropped(item, props.activity.order + 1),
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
                        height: '270px',
                        width: isOverBefore ? '270px' : '5px',
                        backgroundColor: '#006AA8',
                        marginRight: '5px',
                        borderRadius: '3px',
                        opacity: isOverBefore ? 0.5 : 0,
                    }
                }/>
            <div
                ref={drag}
                style={
                    {
                        opacity: isDragging ? 0.5 : 1,
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
                            height: '270px',
                            width: isOverAfter ? '270px' : '5px',
                            backgroundColor: '#006AA8',
                            marginLeft: '5px',
                            borderRadius: '3px',
                            opacity: isOverAfter ? 0.5 : 0,
                        }
                    }/>
                : null}
        </div>

)
}

export default connect()(CardDnd)