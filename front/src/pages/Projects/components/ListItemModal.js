import {Progress, Select, Tooltip} from "antd";
import * as React from "react";
import {
    AlignLeftOutlined,
    CheckOutlined, FileOutlined, PlusOutlined,
    TeamOutlined
} from "@ant-design/icons";
import {
    StyledDeleteButton,
    StyledInput,
    StyledPlusButton, StyledSelect,
    StyledTextArea
} from "../style";
import {
    addAttachmentRequest,
    addResponsibleRequest,
    changeTaskDescriptionRequest,
    createCheckRequest, removeResponsibleRequest
} from "../../../store/modules/projects/action";
import {connect} from "react-redux";
import {getAbbreviation} from "../../../utils/utils";
import Avatar from "antd/lib/avatar/avatar";
import {IoTrashOutline} from "react-icons/all";
import ChecklistItem from "./ChecklistItem";
import UploadButton from "../../../components/UploadButton";
import AttachmentButton from "./AttachmentButton";

class ListItemModal extends React.Component {

    constructor(props) {
        super(props);
        this.inputCheckRef = React.createRef()
        this.selectRespRef = React.createRef()
        this.state = {
            inputCheckVisible: false,
            selectRespVisible: false,
        }
    }

    render(){
        return (
            <div>
                {this.renderResponsibleDiv()}
                {this.renderDescriptionDiv()}
                {this.renderChecklistDiv()}
                {this.renderAttachmentsDiv()}
            </div>
        );
    }

    renderResponsibleDiv() {
        return (
            <div style={{alignItems: 'center'}}>
                <TeamOutlined style={{fontSize: '20px'}} />
                <span style={{fontSize: '16px', marginLeft: '10px', fontWeight: '500'}}>
                        Responsáveis
                    </span>
                <StyledPlusButton
                    onClick={() => {
                        this.setState({selectRespVisible: true})
                        setTimeout(() => this.selectRespRef.current.focus(), 200)
                    }}
                >
                    <PlusOutlined/>
                </StyledPlusButton>
                <div style={{display: 'block', margin: '10px 30px'}}>
                    {this.props.activity.responsibles.length === 0
                        ? <p style={{display: this.state.selectRespVisible ? 'none' : 'unset'}}>Nenhum</p>
                        : this.renderResponsibles()
                    }
                    <StyledSelect
                        ref={this.selectRespRef}
                        open={this.state.selectRespVisible}
                        style={{display: this.state.selectRespVisible ? 'inline-block' : 'none'}}
                        onChange={(e) => this.addResponsible(this.props.activity, e)}
                        bordered={false}
                        onBlur={() => this.setState({selectRespVisible: false})}
                    >
                        {this.getUsers(this.props.project.members)}
                    </StyledSelect>
                </div>

            </div>
        )
    }

    renderDescriptionDiv() {
        return (
            <div style={{alignItems: 'center'}}>
                <AlignLeftOutlined style={{fontSize: '20px'}} />
                <span style={{fontSize: '16px', marginLeft: '10px', fontWeight: '500'}}>
                        Descrição
                    </span>
                <div style={{display: 'block', margin: '10px 30px'}}>
                    <StyledTextArea
                        autoSize
                        onBlur={(e) => this.changeDescription(this.props.activity, e.target.value)}
                        placeholder="Nenhuma descrição."
                        defaultValue={this.props.activity.description}
                    />
                </div>
            </div>
        )
    }

    renderChecklistDiv() {
        return (
            <div style={{alignItems: 'center'}}>
                <CheckOutlined style={{fontSize: '20px'}} />
                <span style={{fontSize: '16px', marginLeft: '10px', fontWeight: '500'}}>
                        Tarefas
                        <StyledPlusButton
                            onClick={() => {
                                this.setState({inputCheckVisible: true})
                                setTimeout(() => this.inputCheckRef.current.focus(), 20)
                            }}
                        >
                            <PlusOutlined/>
                        </StyledPlusButton>
                    </span>
                <div style={{ margin: '10px 30px'}}>
                    {this.props.activity.checklists.length === 0
                        ? <p style={{display: this.state.inputCheckVisible ? 'none' : 'unset'}}>Nenhuma</p>
                        :
                        <>
                            <Progress percent={Math.ceil((this.props.activity.checklists.filter(c => c.done).length / this.props.activity.checklists.length) * 100)}/>
                            {this.createChecks()}
                        </>
                    }
                    <StyledInput
                        ref={this.inputCheckRef}
                        placeholder="Adicionar tarefa"
                        onBlur={() => this.setState({inputCheckVisible: false})}
                        onPressEnter={(e) => this.createCheckObj(this.props.activity, e.target.value)}
                        style={{marginTop: this.props.activity.checklists.length === 0 ? '' : '10px',
                            display: this.state.inputCheckVisible ? 'unset' : 'none'}}
                    />
                </div>
            </div>
        )
    }

    renderAttachmentsDiv() {
        return (
            <div style={{alignItems: 'center'}}>
                <FileOutlined style={{fontSize: '20px'}}/>
                <span style={{fontSize: '16px', marginLeft: '10px', fontWeight: '500'}}>
                    Anexos
                </span>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',margin: '10px 30px'}}>
                    {this.renderAttachments()}
                    <UploadButton
                        callback={(file) => this.addAttachment(this.props.activity, file)}
                    />
                </div>
            </div>
        )
    }

    createChecks = () => (
        [...this.props.activity.checklists]
            .sort((a, b) => a.id - b.id)
            .map(this.createCheck)
    )

    createCheck = check => {
        return (
            <ChecklistItem
                key={check.id}
                activity={this.props.activity}
                check={check}
            />
            )

    };

    renderAttachments = () => {
        return [...this.props.activity.attachments]
            .sort((a, b) => a.id - b.id)
            .map(attachment =>
                    <AttachmentButton
                        key={attachment.id}
                        attachment={attachment}
                        activity={this.props.activity}
                    />
            )
    };

    renderResponsibles = () => {
        return this.props.activity.responsibles
            .map(member => {
                return (
                    <Tooltip
                        key={member.id}
                        title={
                            <div>
                                {member.name}
                                <StyledDeleteButton onClick={() => this.removeResponsible(this.props.activity, member)}>
                                    <IoTrashOutline/>
                                </StyledDeleteButton>
                            </div>
                        }
                    >
                        <Avatar
                            style={{backgroundColor: member.color, margin: '2px'}}
                        >
                            {getAbbreviation(member.name)}
                        </Avatar>
                    </Tooltip>
                );
            })
    };

    getUsers = (members) => {
        return (
            members
                .filter(m => !this.props.activity.responsibles.some(mm => m.id === mm.id))
                .map(u => {
                    return (
                        <Select.Option value={u.id} label={u.name} key={u.id}>
                            <Avatar size={18} style={
                                {
                                    marginRight: "5px",
                                    marginBottom: '3px',
                                    backgroundColor: u.color,
                                }
                            }>
                                {getAbbreviation(u.name)}
                            </Avatar>
                            {u.name}
                        </Select.Option>
                    );
                }))
    };

    removeResponsible = (activity, member) => {
        const {dispatch} = this.props
        dispatch(removeResponsibleRequest(activity, member))
    }

    changeDescription = (activity, value) => {
        const {dispatch} = this.props
        dispatch(changeTaskDescriptionRequest(activity, value))
    };

    createCheckObj = (activity, value) => {
        //  this.setState({inputCheckVisible: false})
        const {dispatch} = this.props
        dispatch(createCheckRequest(activity, value))
    };

    addResponsible = (activity, member) => {
        this.setState({selectRespVisible: this.props.activity.responsibles.length + 1 !== this.props.project.members.length})
        const {dispatch} = this.props
        dispatch(addResponsibleRequest(activity, member))
    };

    addAttachment(activity, file) {
        const {dispatch} = this.props
        dispatch(addAttachmentRequest(activity, file))
    }

}
const mapToProps = state => ({
    project: state.projects.project
});
export default connect(mapToProps)(ListItemModal)