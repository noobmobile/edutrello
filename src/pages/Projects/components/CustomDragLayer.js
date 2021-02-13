import { DragLayer } from 'react-dnd';
import {DragTypes} from "../constants";
import ListDnd from "./ListDnd";
import {StyledCard} from "../style";
import * as React from "react";
import ListItemDnd from "./ListItemDnd";
import {List} from "antd";
import {CheckOutlined} from "@ant-design/icons";
const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
};
const styles = {
    display: 'inline-block',
    transform: 'rotate(5deg)',
    WebkitTransform: 'rotate(5deg)',
};
function getItemStyles(props) {
    const { initialOffset, currentOffset } = props;
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    }
    let { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform,
    };
}
const CustomDragLayer = (props) => {
    const { item, itemType, isDragging } = props;
    function renderItem() {
        switch (itemType) {
            case DragTypes.LIST:
                return (
                    <div style={styles}>
                        <StyledCard bordered={false} title={item.activity.name}>
                            <ListDnd activity={item.activity}/>
                        </StyledCard>
                    </div>
                )
            case DragTypes.LIST_ITEM:
                console.log(item)
               return (
                   <div style={styles}>
                       <ListItemDnd
                           last={false}
                           item={item.item}
                           activity={item.props.activity}
                           description={item.props.description}
                           style={{...item.props.style}}
                       />
                   </div>)
            default:
                return null;
        }
    }
    if (!isDragging) {
        return null;
    }
    return (<div style={layerStyles}>
        <div style={getItemStyles(props)}>{renderItem()}</div>
    </div>);
};
export default DragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
}))(CustomDragLayer);
