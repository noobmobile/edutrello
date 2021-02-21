import React, {Component} from 'react';
import {DeleteOutlined, DownloadOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {Button, Empty, Input, Modal} from "antd";
import {removeAttachmentRequest} from "../../../store/modules/projects/action";
import {connect} from "react-redux";
import {downloadFile} from "../../../utils/utils";
import {  decode } from 'js-base64';

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
                    maxHeight: '104px',
                    margin: '0 8px 8px 0',
                    backgroundColor: '#fafafa',
                    whiteSpace: 'break-spaces',
                }}
            >
                <div
                    onClick={() => this.clickOn(this.props.attachment)}
                >
                    <DownloadOutlined />
                    <div>{this.props.attachment.fileName}</div>
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

    clickOn = (attachment) => {
        Modal.confirm({
            icon: null,
            closable: true,
            maskClosable: true,
            title: attachment.fileName,
            okText: "Baixar",
            cancelText: "Voltar",
            onOk: () => downloadFile(attachment.fileName, attachment.data),
            content:
                <div >
                    {attachment.dataType?.includes("image")
                        ? (
                            <img
                                style={{width: '100%'}}
                                src={attachment.data} alt={attachment.id}/>
                        )
                        : attachment.dataType?.includes("text/plain")
                            ? (
                                <Input.TextArea
                                    autoSize
                                    style={{backgroundColor: '#eee'}}
                                    readOnly
                                    defaultValue={decode(attachment.data.replace('data:text/plain;base64,', ''))}
                                />
                            )
                            : (
                                <Empty description="Arquivo sem preview."/>
                                )
                    }
                </div>
        })
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