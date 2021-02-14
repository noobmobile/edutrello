import * as React from "react";
import {Button, Col, Collapse, Empty, Form, Input, Modal, Row, Select, Tooltip} from "antd";
import {StyledCard, TPCards} from "./style";
import {ExclamationCircleOutlined, EyeOutlined, SettingOutlined, TeamOutlined} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import Avatar from "antd/lib/avatar/avatar";
import {defaultRule, getAbbreviation, getRandomColor} from "../../utils/utils";
import api from "../../services/api";
import {toast} from "react-toastify";

const currentUser = 2
class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleModal: null,
            loading: false,
        }
    }


    render(){
        return (
            <TPCards>
                    {this.props.teams
                        ? this.renderCards()
                        : this.renderLoadingCards()
                    }
            </TPCards>
        )
    }

    renderCards() {
        const projects = this.props.teams.map(t => t.projects).flat()
        const isProjects = this.props.type === 'projects'
        const isEmpty = this.props.teams.length === 0  || (isProjects && projects.length === 0)
        return isEmpty
            ? this.renderEmpty(isProjects)
            : isProjects
                ? this.renderProjects()
                : this.renderTeams()
    }

    renderEmpty(isProjects){
        return (
            <Empty
                description={
                    <span>Você não tem nenhum {isProjects ? "projeto" : "time"}!</span>
                }
                style=
                    {
                        {
                            margin: "auto"
                        }
                    }
            />
        )
    }

    renderLoadingCards(){
        let list = []
        for (let i = 0; i < 12; i++){
            list.push(
                <Col key={i} span={6}>
                    <StyledCard
                        bordered={false}
                        loading={true}
                    />
                </Col>
            )
        }
        return (
            <Row gutter={16}>
                {list}
            </Row>
        )
    }

    renderTeams = () => (
        <Row gutter={16}>
            {this.props.teams.map(this.renderTeam)}
        </Row>
    );

    renderTeam = c => {
        if (!c.color) c.color = getRandomColor()
        return (
            <Col key={c.id} span={6}>
                <StyledCard
                    bordered={false}
                    cover={
                        <div style={
                            {
                                width: "100%",
                                height: "100px",
                                background: c.color,
                            }
                        }/>

                    }
                    actions={[
                        <SettingOutlined onClick={() => this.openModal(c.id)} key="setting"/>,
                        <Tooltip title={
                            c.members.map(this.renderAvatar)
                        }>
                            <TeamOutlined key="team"/>
                        </Tooltip>
                    ]}
                >
                    <Meta
                        avatar={
                            <Tooltip title="Líder do projeto" placement="top">
                                <Avatar>{getAbbreviation(c.leader.name)}</Avatar>
                            </Tooltip>
                        }
                        title={c.name}
                        description={"Esse time tem " + c.projects.length + " projetos."}
                    />
                </StyledCard>
                {this.createTeamModal(c)}
            </Col>
        )
    };

    renderProjects = () => {
        return <Collapse
            ghost
            defaultActiveKey={this.props.teams
                .filter(t => t.projects.length !== 0).map(t => t.id)}
        >
            {
                this.props.teams
                    .sort((a, b) => b.projects.length - a.projects.length)
                    .map(t => (
                    <Collapse.Panel header={t.name} key={t.id} style={
                        {
                            marginTop: '5px'
                        }
                    } showArrow={true}>
                        <Row gutter={16}>
                            {t.projects.length === 0 ? this.renderEmpty(true) : this.renderProject(t)}
                        </Row>
                    </Collapse.Panel>

                ))
            }
        </Collapse>
    };

    renderProject(c) {
        return c.projects.map(p => {
            if (!p.color) p.color = getRandomColor()
            return (
                <Col key={p.id} span={6}>
                    <StyledCard
                        bordered={false}
                        cover={
                            <div style={
                                {
                                    width: "100%",
                                    height: "100px",
                                    background: p.color,
                                }
                            }/>

                        }
                        actions={[
                            <SettingOutlined key="setting"/>,
                            <EyeOutlined key="view"/>,
                        ]}
                    >
                        <Meta
                            avatar={
                                <Tooltip title={c.name} placement="top">
                                    <Avatar>{getAbbreviation(c.name)}</Avatar>
                                </Tooltip>
                            }
                            title={p.name}
                            description={"Esse projeto tem " + p.tasks.length + " tarefas."}
                        />
                    </StyledCard>
                </Col>

            )
        })
    }

    renderAvatar = (member) => (
        <Tooltip title={member.name}>
            <Avatar
                style={{backgroundColor: getRandomColor(), margin: '2px'}}
            >
                {getAbbreviation(member.name)}
            </Avatar>
        </Tooltip>
    )

    openModal = c => {
        this.setState({
            visibleModal: c,
        })
    };

    createTeamModal = c => {
        const isLeader = c.leader.id === currentUser
        return (
            <Modal
            visible={this.state.visibleModal === c.id}
            onCancel={() => this.setState({visibleModal: null})}
            title={c.name}
            footer={[
                <div>
                    <Button
                        loading={this.state.loading}
                        disabled={!isLeader}
                        type="danger"
                        onClick={() => this.deleteTeamRequest(c)}
                        >
                        Deletar
                    </Button>
                    <Button
                        loading={this.state.loading}
                        disabled={!isLeader}
                        type="primary"
                        form={"teamform"+c.id}
                        key="submit"
                        htmlType="submit">
                        Editar
                    </Button>
                </div>

            ]}
        >
                <Form
                    id={"teamform"+c.id}
                    onFinish={(values) => this.editTeamRequest(c, values)}
                    requiredMark={false}
                    initialValues={
                        {
                            name: c.name,
                            leader: c.leader.name,
                            members: c.members.map(m => m.name)
                        }
                    }
                >
                    <Form.Item
                        name="name"
                        label="Nome"
                        rules={defaultRule}
                    >
                        <Input
                            disabled={!isLeader}/>
                    </Form.Item>
                    <Form.Item
                        name="leader"
                        label="Líder"
                        rules={defaultRule}
                    >
                        <Select
                            disabled={!isLeader}
                        >
                            {this.getUsers(c.members, false)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="members"
                        label="Membros"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            disabled={!isLeader}

                        >
                            {this.getUsers(c.members, true)}
                        </Select>
                    </Form.Item>
                    Projetos:
                    {c.projects.length !== 0 ? c.projects.map(p => (
                        <Tooltip title={p.name}>
                            <Avatar
                                style={{backgroundColor: getRandomColor(), margin: '2px'}}>
                                {getAbbreviation(p.name)}
                            </Avatar>
                        </Tooltip>
                    )) : <> Nenhum</>}
                </Form>

        </Modal>
        )
    };

    deleteTeam = async c => {
        const response = await api.delete("team/delete/" + c.id)
        this.setState({visibleModal: null})
        this.props.updateTeams()
        toast.info("Deletado com sucesso.")
    };

    deleteTeamRequest(c) {
        const gamb = this.deleteTeam
        Modal.confirm({
            title: "Você tem certeza?",
            icon: <ExclamationCircleOutlined />,
            content: "Você quer deletar seu time " + c.name + "?",
            onOk() {
                gamb(c)
            },
            onCancel() {
            },
        })
    }

    getUsers = (members, all) => {
        return (
            members
                .map(u => (
                <Select.Option value={u.name} key={u.id}>
                    <Avatar size={18} style={
                        {
                            marginRight: "5px",
                            marginBottom: '3px',
                            backgroundColor: getRandomColor(),
                        }
                    } >
                        {getAbbreviation(u.name)}
                    </Avatar>
                    {u.name}
                </Select.Option>
            )))
    };

    editTeam = async (team, values) => {
        this.setState({loading: true})
        const response = await api.put("team/update/" + team.id, values)
        this.setState({visibleModal: null, loading: false})
        this.props.updateTeams()
        toast.info("Editado com sucesso.")
    }

    editTeamRequest = (team, values) => {
        const gamb = this.editTeam
        values = {
            name: values.name,
            members: values.members.map(m => team.members.find(m2 => m2.name === m).id),
            leader: team.members.find(m => m.name === values.leader).id
        }
        if (values.leader != currentUser){
            Modal.confirm({
                title: "Você tem certeza?",
                icon: <ExclamationCircleOutlined />,
                content: 'Você quer transferir a liderança para ' + team.members.find(m => m.id == values.leader).name  + "?",
                onOk() {
                    gamb(team, values)
                },
                onCancel() {
                },
            })
        } else {
            this.editTeam(team, values)
        }
    };

}

export default Board