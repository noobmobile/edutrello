import * as React from 'react'
import {StyledCheckList} from "../style";
import {Button, Checkbox} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {changeCheckRequest, deleteCheckRequest} from "../../../store/modules/projects/action";
import {connect} from "react-redux";

class ChecklistItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hovering: false
        }
    }


    render(){
        return (
            <StyledCheckList
                onMouseEnter={() => this.setState({hovering: true})}
                onMouseLeave={() => this.setState({hovering: false})}
                key={this.props.check.id}
            >
                <Checkbox
                    style={{width: '100%'}}
                    defaultChecked={this.props.check.done}
                    onChange={(e) => this.changeCheck(this.props.check, this.props.activity, e.target.checked)}
                >
                    <span style={{textDecoration: this.props.check.done ? 'line-through' : 'inherit'}}>
                        {this.props.check.title}
                    </span>
                    <Button
                        onClick={() => this.deleteCheck(this.props.check, this.props.activity)}
                        style={{display: this.state.hovering ? 'inherit' : 'none'}}
                    >
                        <DeleteOutlined/>
                    </Button>
                </Checkbox>
            </StyledCheckList>
        )
    }

    changeCheck = (check, activity, checked) => {
        const {dispatch} = this.props
        dispatch(changeCheckRequest(check, activity, checked))
    };

    deleteCheck(check, activity) {
        const {dispatch} = this.props
        dispatch(deleteCheckRequest(check, activity))
    }
}

export default connect()(ChecklistItem)