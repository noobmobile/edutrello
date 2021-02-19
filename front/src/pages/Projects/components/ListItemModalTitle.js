import {ClockCircleOutlined, DeleteOutlined, ExclamationCircleOutlined, FileOutlined} from "@ant-design/icons";
import {Avatar, Button, Input, Modal, Tooltip} from "antd";
import {getAbbreviation} from "../../../utils/utils";
import moment from "moment";
import * as React from "react";
import {
    changeTaskDeadlineRequest,
    changeTaskTitleRequest,
    deleteTaskRequest
} from "../../../store/modules/projects/action";
import {connect} from "react-redux";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";

class ListItemModalTitle extends React.Component{

    componentDidMount() {
        registerLocale("pt-BR", ptBR);
    }

    render(){
        return (
            <div style={{display: 'flex', alignItems: 'end'}}>
                <FileOutlined style={{fontSize: '20px', marginRight: '5px', marginTop: '5px'}}/>
                <div>
                    <Input.TextArea
                        autoSize
                        defaultValue={this.props.activity.title}
                        onBlur={(e) => this.changeTaskTitle(this.props.activity, e.target.value)}
                        style={
                            {
                                fontSize: '18px',
                                margin: 0,
                                padding: 0,
                                fontWeight: 500,
                                border: 0,
                                whiteSpace: 'normal',
                                width: '330px',
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
                        title={
                            <div>
                                <span style={{display: 'block'}}>
                                    Criador: {this.props.activity.creator.name}
                                </span>
                                <small>
                                    Criado em <span style={{fontStyle: 'italic'}}>{moment(this.props.activity.dateCreated).format("DD/MM/yyyy")}</span>
                                </small>
                            </div>
                        }
                    >
                        <Avatar
                            size={20}
                            style={{backgroundColor: this.props.activity.creator.color}}
                        >
                            {getAbbreviation(this.props.activity.creator.name)}
                        </Avatar>
                    </Tooltip>
                    <Tooltip title="Deletar tarefa">
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
                    </Tooltip>
                    <DatePicker
                        onChange={(date) => this.changeTaskDeadline(this.props.activity, date)}
                        locale="pt-BR"
                        customInput={
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
                        }
                    />
                </div>
            </div>
        )
    }

    changeTaskDeadline = (activity, date) => {
        const {dispatch} = this.props
        dispatch(changeTaskDeadlineRequest(activity, date.getTime()))
    };

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