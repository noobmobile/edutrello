import * as React from "react";
import {Button, Form, Input} from "antd";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {StyledButton, StyledForm} from "../style";
import {createListRequest} from "../../../store/modules/projects/action";
import {connect} from "react-redux";

class CreateListButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 'button'
        }
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = event => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (this.state.current === 'form'){
                this.setVisible('button')
            }
        }
    };

    render(){
        return (
            <div
                ref={this.wrapperRef}
                style=
                     {
                         {
                             width: '270px',
                             height: this.state.current === 'button' ? '40px' : '90px',
                             transition: 'all .1s'
                         }
                     }
            >
                <div style={{height: '560px',}}/>
                {this.state.current === 'button'
                    ? (
                        <StyledButton onClick={() => this.setVisible('form')}>
                            <PlusOutlined/>Criar lista
                        </StyledButton>
                    ) : (
                        <StyledForm
                            onFinish={this.createList}
                        >
                            <Form.Item
                                name='title'
                                rules={[
                                    {
                                        required: true
                                    }
                                ]}
                            >
                                <Input autoFocus placeholder="Nome da lista"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Criar
                                </Button>
                                <Button
                                    onClick={() => this.setVisible('button')}
                                    style={{backgroundColor: 'unset', border: '0'}}>
                                    <CloseOutlined/>
                                </Button>
                            </Form.Item>
                        </StyledForm>
                    )
                }

            </div>
        )
    }


    setVisible = (arg) => {
        this.setState({
            current: arg
        })
    };

    createList = args => {
        console.log(args)
        const {dispatch} = this.props
        dispatch(createListRequest(args.title))
    };
}

export default connect()(CreateListButton)