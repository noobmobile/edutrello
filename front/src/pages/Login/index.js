import {Container} from "./style";
import * as React from 'react'
import {Button, Form, Input} from "antd";
import {defaultRule} from "../../utils/utils";
import {EditOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import logo from '../../assets/images/logo.png'
import {isLogged, logIn} from "../../services/auth";
import {toast} from "react-toastify";
import {withRouter} from "react-router-dom";
import api from "../../services/api";
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: 'login'
        }
    }


    render(){
        return (
            <Container>
                <img alt="logo" src={logo}/>
                {this.state.form === 'login'
                    ? this.renderLoginForm()
                    : this.renderRegisterForm()}
            </Container>
        )
    }

    renderLoginForm() {
        return (
            <Form
                name="login"
                onFinish={this.onFinishLogin}
            >
                <Form.Item
                    name="username"
                    rules={defaultRule}
                >
                    <Input
                        prefix={<UserOutlined/>}
                        placeholder="Usuário"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={defaultRule}
                >
                    <Input
                        prefix={<LockOutlined/>}
                        placeholder="Senha"
                        type="password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Login
                    </Button>
                    <span style={{float: "right", marginTop: '5px'}}>
                        Ou <a onClick={() => this.setState({form: "register"})}>registre-se</a>
                    </span>
                </Form.Item>
            </Form>
        );
    }

    renderRegisterForm() {
        return (
            <Form
                name="login"
                onFinish={this.onFinishRegister}
            >
                <Form.Item
                    name="name"
                    rules={defaultRule}
                >
                    <Input
                        prefix={<EditOutlined/>}
                        placeholder="Nome"
                    />
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={defaultRule}
                >
                    <Input
                        prefix={<UserOutlined/>}
                        placeholder="Usuário"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={defaultRule}
                >
                    <Input.Password
                        prefix={<LockOutlined/>}
                        placeholder="Senha"
                        type="password"
                    />
                </Form.Item>
                <Form.Item
                    name="cpassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        ...defaultRule,
                        ({getFieldValue}) => ({
                            validator(_, value){
                                if (!value || getFieldValue('password') === value){
                                    return Promise.resolve()
                                }
                                return Promise.reject("As senhas precisam ser iguais.")
                            }
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined/>}
                        placeholder="Confirmar senha"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Cadastrar
                    </Button>
                    <span style={{float: "right", marginTop: '5px'}}>
                        Ou <a onClick={() => this.setState({form: "login"})}>fazer login.</a>
                    </span>
                </Form.Item>
            </Form>
        );
    }

    onFinishLogin = async values => {
        try {
            await logIn(values.username, values.password)
            toast.success("Bem vindo...")
            const { history } = this.props;
            history.push("/");
        } catch (e){
            toast.error(e.message)
        }
    };
    onFinishRegister = async values => {
        console.log("adaw")
        try {
            const response = await api.post("/user/save", values)
            await this.onFinishLogin(values)
        } catch (e) {
            for (let error of e.response.data.errors) {
                toast.error(error.message)
            }
        }
    };

}

export default withRouter(Login)