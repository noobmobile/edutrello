import ListItemDnd from "./ListItemDnd";
import {List, Tooltip} from "antd";
import * as React from "react";
import {colors} from "../../../styles/colors";
import {useDrop} from "react-dnd";
import {DragTypes} from "../constants";
import {moveTaskRequest} from "../../../store/modules/projects/action";
import {connect} from "react-redux";
import {CheckOutlined, ClockCircleOutlined, CommentOutlined, TeamOutlined} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import {getAbbreviation} from "../../../utils/utils";
import moment from 'moment';

function ListDnd(props) {
    function wasDropped(drop, activity) {
        const old = drop.oldActivity
        const item = drop.item
        const newActivity = activity
        const {dispatch} = props
        dispatch(moveTaskRequest(item, old, newActivity, 0))
    }

    const [{isOver}, drop] = useDrop({
        accept: DragTypes.LIST_ITEM,
        drop: (item) => wasDropped(item, props.activity),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    })
    const renderResponsibles = (members) => {
        return members
            .map(member => {
                return (
                    <Tooltip
                        key={member.id}
                        title={member.name}
                        placement="bottomRight"
                    >
                        <Avatar
                            size="small"
                            style={{backgroundColor: member.color, margin: '2px'}}
                        >
                            {getAbbreviation(member.name)}
                        </Avatar>
                    </Tooltip>
                );
            })
    };
    const tasks = [...props.activity.activities]
        .sort((x, y) => x.position - y.position)
    return (
        <div ref={props.activity.activities.length === 0 ? drop : null}>
            <List
                itemLayout="horizontal"
                locale={{ emptyText: <div/> }}
                dataSource={tasks}
                renderItem={item => {
                    const description =
                        <div>
                            <div style={{display: 'flex', paddingLeft: '3px'}}>
                                {item.checklists.length !== 0
                                    ? (
                                        <div style={{paddingRight: '4px'}}>
                                        <span style={item.checklists.every(c => c.done) ? {
                                            backgroundColor: colors.check,
                                            color: 'white',
                                            borderRadius: '5px',
                                            padding: '3px 8px',
                                        } : {}}>
                                            <CheckOutlined
                                                style={{marginRight: '5px'}}/>{item.checklists.filter(c => c.done).length + "/" + item.checklists.length}
                                        </span>
                                        </div>
                                    ) : null
                                }
                                {item.description
                                    ? (
                                        <div style={{paddingRight: '4px'}}>
                                            <CommentOutlined style={{fontSize: '16px'}}/>
                                        </div>
                                    )
                                    : null
                                }
                                {item.responsibles.length !== 0
                                    ? (
                                        <div style={{paddingRight: '4px'}}>
                                            <Tooltip
                                                title={renderResponsibles(item.responsibles)}
                                            >
                                                <TeamOutlined style={{fontSize: '16px'}}/>
                                            </Tooltip>
                                        </div>
                                    )
                                    : null
                                }
                                {item.deadline
                                    ? (
                                        <div style={{paddingRight: '4px'}}>
                                            <Tooltip
                                                title={"Prazo: "+ moment(item.deadline).format("DD/MM/yyyy")}
                                            >
                                                <ClockCircleOutlined style={
                                                    {
                                                        fontSize: '16px',
                                                        color: new Date().getTime() > item.deadline ? 'red' : 'inherit'
                                                    }
                                                }/>
                                            </Tooltip>
                                        </div>
                                    )
                                    : null
                                }
                            </div>
                        </div>

                    return (
                        <ListItemDnd
                            last={tasks.indexOf(item) === tasks.length - 1}
                            item={item}
                            activity={props.activity}
                            description={description}
                        />
                    );
                }}
            />
        </div>


    )

}

export default connect()(ListDnd)