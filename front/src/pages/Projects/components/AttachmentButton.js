import React, {Component} from 'react';
import {DeleteOutlined, DownloadOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {Button, Modal} from "antd";
import {StyledCheckList} from "../style";
import {deleteTaskRequest, removeAttachmentRequest} from "../../../store/modules/projects/action";
import {connect} from "react-redux";

class AttachmentButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hovering: false
        }
    }

    render() {
        return (
            <Button
                onMouseEnter={() => this.setState({hovering: true})}
                onMouseLeave={() => this.setState({hovering: false})}
                key={this.props.attachment.id}
                type="dashed"
                style={{
                    width: '104px',
                    height: '104px',
                    margin: '0 8px 8px 0',
                    backgroundColor: '#fafafa',
                }}
            >
                <div
                    onClick={() => this.clickOn(this.props.attachment)}
                >
                    <DownloadOutlined />
                    <div style={{whiteSpace: 'break-spaces'}}>{this.props.attachment.fileName}</div>
                </div>
                <Button
                    onClick={() => this.askDelete(this.props.attachment)}
                    style={{
                        backgroundColor: "#eee",
                        border: 0,
                        padding: '2px',
                        margin: '0 4px 0 0',
                        top: 0,
                        right: 0,
                        zIndex: 50,
                        position: "absolute",
                        display: this.state.hovering ? 'inherit' : 'none',
                    }}
                >
                    <DeleteOutlined/>
                </Button>
            </Button>
        );
    }

    askDelete = attachment => {
        const {dispatch} = this.props
        const task = this.props.activity
        Modal.confirm({
            title: "Você tem certeza?",
            icon: <ExclamationCircleOutlined />,
            content: "Você quer deletar o anexo " + attachment.fileName + "?",
            onOk() {
                dispatch(removeAttachmentRequest(task, attachment))
            },
            onCancel() {
            },
        })
    };
}

export default connect()(AttachmentButton);