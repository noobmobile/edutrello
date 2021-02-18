import {ClockCircleOutlined, DeleteOutlined, ExclamationCircleOutlined, FileOutlined} from "@ant-design/icons";
import {Avatar, Button, Input, Modal, Tooltip} from "antd";
import {getAbbreviation} from "../../../utils/utils";
import moment from "moment";
import * as React from "react";
import {changeTaskTitleRequest, deleteTaskRequest} from "../../../store/modules/projects/action";
import {connect} from "react-redux";

class ListItemModalTitle extends React.Component{

    render(){
        return (
            <div style={{display: 'flex', alignItems: 'end'}}>
                <FileOutlined style={{fontSize: '20px', marginRight: '5px', marginTop: '5px'}}/>
                <div>
                    <Input
                        defaultValue={this.props.activity.title}
                        onBlur={(e) => this.changeTaskTitle(this.props.activity, e.target.value)}
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
                        Na lista <span style={{fontStyle: 'italic'}}>{this.props.activity.activityList.name}</span>
                    </small>
                </div>
                <div style={{position: 'absolute',  right: '60px', top: '13px'}}>
                    <Tooltip
                        key={this.props.activity.creator.id}
                        title={"Criador: " + this.props.activity.creator.name}
                    >
                        <Avatar
                            size="small"
                            style={{backgroundColor: this.props.activity.creator.color}}
                        >
                            {getAbbreviation(this.props.activity.creator.name)}
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
                            this.props.activity.deadline === null ? "Sem prazo" : "Prazo: "+moment(this.props.activity.deadline).format("DD/MM/yyyy")
                        }>
                            <ClockCircleOutlined style={{
                                color: this.props.activity.deadline && new Date().getTime() > this.props.activity.deadline ? 'red' : 'inherit'
                            }}/>
                        </Tooltip>
                    </Button>
                    <Button
                        onClick={() => this.deleteTask(this.props.activity)}
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
        )
    }

    changeTaskTitle = (activity, value) => {
        const {dispatch} = this.props
        dispatch(changeTaskTitleRequest(activity, value))
    }
    deleteTask = (activity) => {
        const {dispatch} = this.props
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

}

export default connect()(ListItemModalTitle)