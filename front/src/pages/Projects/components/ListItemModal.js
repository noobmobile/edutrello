import {Button, Checkbox, Input, Modal} from "antd";
import * as React from "react";
import {AlignLeftOutlined, CheckOutlined, PlusOutlined} from "@ant-design/icons";
import {StyledCheckList, StyledInput, StyledTextArea} from "../style";
import {changeCheckRequest, changeTaskDescriptionRequest} from "../../../store/modules/projects/action";
import {connect} from "react-redux";

class ListItemModal extends React.Component {

    render(){
        return (
            <div>
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
                <div style={{alignItems: 'center'}}>
                    <CheckOutlined style={{fontSize: '20px'}} />
                    <span style={{fontSize: '16px', marginLeft: '10px', fontWeight: '500'}}>
                        Tarefas
                        <Button style={{
                            backgroundColor: 'inherit',
                            border: 0,
                            padding: 0,
                            marginLeft: '3px',
                            opacity: '.6',
                            float: "right",
                        }}>
                            <PlusOutlined/>
                        </Button>
                    </span>
                    <div style={{ margin: '10px 30px'}}>
                        {this.createChecks()}
                    </div>
                </div>
            </div>
        );
    }

    createChecks = () => (
        [...this.props.activity.checklists]
            .sort((a, b) => a.id - b.id)
            .map(this.createCheck)
    )

    createCheck = check => {
        return (
            <StyledCheckList key={check.id}>
                <Checkbox
                    style={{width: "100%"}}
                    defaultChecked={check.done}
                    onChange={(e) => this.changeCheck(check, this.props.activity, e.target.checked)}
                >
                    {check.title}
                </Checkbox>
            </StyledCheckList>
        )
    };

    changeCheck = (check, activity, checked) => {
        const {dispatch} = this.props
        dispatch(changeCheckRequest(check, activity, checked))
    };

    changeDescription = (activity, value) => {
        const {dispatch} = this.props
        dispatch(changeTaskDescriptionRequest(activity, value))
    };
}

export default connect()(ListItemModal)