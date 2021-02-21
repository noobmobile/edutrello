import * as React from 'react'
import {Upload} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";

class UploadButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            file: null,
        }
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    onChange = (info) => {
        switch (info.file.status) {
            case "uploading":
                this.setState({loading: true, file: null})
                break;
            case "done":
                console.log(info)
                this.getBase64(info.file.originFileObj, base64 => {
                    this.setState({loading: false, file: {
                            fileName: info.file.name,
                            dataType: info.file.type,
                            data: base64
                        }})
                    this.props.callback(this.state.file)
                })
                break;
            default:
                this.setState({loading: false, file: null})
        }
    }


    dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    render(){
        return (
            <div
                style={{
                    width: 'unset',
                    display: 'inline-block'
                }}
            >
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    customRequest={this.dummyRequest}
                    onChange={this.onChange}
                >
                    <div>
                        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                </Upload>
            </div>

        )
    }

}

export default UploadButton