import * as React from "react";
import {Button, Divider, Form, Input, Modal, Select, Tooltip} from "antd";
import {toast} from "react-toastify";
import {Container, StyledItem, StyledMenu} from "./style";
import {PlusOutlined, ProjectOutlined, TeamOutlined} from "@ant-design/icons";
import Board from "./Board";
import api from "../../services/api";
import {defaultRule} from "../../utils/utils";

const currentUser = 2

class Home extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            option: "teams",
            teams: null,
            visibleModal: null,
            loading: false,
            users: null,
        }
        this.updateTeams = this.updateTeams.bind(this)
    }

    async componentDidMount() {
        const teamsResponse = await api.get("user/teams/" + currentUser)
        const usersResponse = await api.get("user")
        this.setState({
            teams: teamsResponse.data,
            users: usersResponse.data,
        })
        console.log(this.state.users)
    }

    render(){
        if (!this.state) return <p>loading</p>
        return (
            <Container>
                <StyledMenu
                    onSelect={({key}) => this.setState({option: key})}
                    selectedKeys={this.state.option}
                >
                    <StyledItem key="teams">
                        <TeamOutlined/>Times
                    </StyledItem>
                    <StyledItem key="projects">
                        <ProjectOutlined/>Projetos
                    </StyledItem>
                    <Divider/>
                    <Button
                        type="ghost"
                        loading={!this.state.teams}
                        onClick={() => this.showForm()}
                        style={{width: "100%",}}
                        >
                        <PlusOutlined/>
                        Criar um {this.state.option === 'teams' ? "time" : "projeto"}
                    </Button>
                    {this.createTeamForm()}
                    {this.createProjectForm()}
                </StyledMenu>
                <Board
                    users={this.state.users}
                    updateTeams={this.updateTeams}
                    teams={this.state.teams}
                    type={this.state.option}/>
            </Container>
        )
    }

    showForm = () => {
        this.setState({visibleModal: this.state.option})
    };

    createTeamForm = () => {
        return (
            <Modal
                visible={this.state.visibleModal === 'teams'}
                onCancel={() => this.setState({visibleModal: null})}
                confirmLoading={this.state.loading}
                title="Criar Time"
                footer={[
                    <Button loading={this.state.loading} type="primary" form="teamform" key="submit" htmlType="submit">
                        Criar
                    </Button>
                ]}
            >
                <Form
                    id="teamform"
                    onFinish={this.createTeam}
                    requiredMark={false}
                >
                    <Form.Item
                        name="name"
                        rules={defaultRule}
                        label="Nome"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="members"
                        label="Membros"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                        >
                            {this.getUsers()}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    };

    createTeam = async (values) => {
        this.setState({loading: true})
        const team = {
            name: values.name,
            leader: {
                id: currentUser
            },
            members: []
        };
        if (values.members) {
            values.members.forEach(m => team.members.push({
                id: m
            }))
        }
        const response = await api.post("team/save", team)
        const teamResponse = response.data
        const newState = this.state.teams.concat(teamResponse)
        this.setState({
            loading: false,
            teams: newState,
            visibleModal: null,
        })
        toast.info("Time criado com sucesso.")
    }

    createProjectForm = () => {
        return (
            <Modal
                visible={this.state.visibleModal === 'projects'}
                onCancel={() => this.setState({visibleModal: null})}
                confirmLoading={this.state.loading}
                title="Criar Projeto"
                footer={[
                    <Button loading={this.state.loading} type="primary" form="projectform" key="submit" htmlType="submit">
                        Criar
                    </Button>
                ]}
            >
                <Form
                    id="projectform"
                    onFinish={this.createProject}
                    requiredMark={false}
                >
                    <Form.Item
                        name="name"
                        label="Nome"
                        rules={defaultRule}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="team"
                        label="Time"
                        rules={defaultRule}
                    >
                        <Select
                            style={{ width: '100%' }}
                        >
                            {this.getTeamsLeader()}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    };

    createProject = async (values) => {
        this.setState({loading: true})
        const project = {
            name: values.name,
            team: {
                id: values.team
            },
            tasks: []
        }
        const projectResponse = await api.post("project/save", project)
        const teamsResponse = await api.get("user/teams/" + currentUser)
        this.setState({
            loading: false,
            teams: teamsResponse.data,
            visibleModal: null
        })
        toast.info("Projeto criado com sucesso.")
    }

    getTeamsLeader = () => {
        if (!this.state.teams) return []
        return (
            this.state.teams
                .sort((a, b) => {
                    const aLeader = a.leader.id === currentUser
                    const bLeader = b.leader.id === currentUser
                    return bLeader - aLeader
                })
                .map(u => (
                <Select.Option key={u.id} disabled={u.leader.id !== currentUser}>
                    <Tooltip
                        placement="left"
                        title={u.leader.id === currentUser ? "" : "Você precisa ser o líder do time."}
                    >
                        {u.name}
                    </Tooltip>
                </Select.Option>
            )))
    };

    getUsers = () => {
        if (!this.state.users) return []
        return (
            this.state.users.map(u => (
                <Select.Option key={u.id}>
                    {u.name}
                </Select.Option>
            )))
    };

    updateTeams = async () => {
        const teamsResponse = await api.get("user/teams/" + currentUser)
        this.setState({
            teams: teamsResponse.data,
        })
    };

}

export default Home;