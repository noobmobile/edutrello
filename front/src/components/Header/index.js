import * as React from "react";
import {Avatar, Badge, Calendar, Menu, Tooltip} from "antd";
import {
    StyledHeader,
    StyledMenu,
    StyledItem,
    StyledGroup,
    StyledSubMenu, StyledCalendar,
} from "./style";
import {
    CalendarOutlined,
    EditOutlined,
    HomeOutlined, LogoutOutlined,
    PlusOutlined,
    ProjectOutlined,
    TeamOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";

import moment from "moment";
import {connect} from "react-redux";
import {useLocation} from "react-router";
import {withRouter} from "react-router-dom";
import {select} from "@redux-saga/core/effects";
import {currentUser} from "../../utils/utils";
class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        document.title = "Grillo - Gerenciador de Atividades"
        const {pathname} = this.props.location;
        return (
            <StyledHeader>
                <StyledMenu selectable={false} theme="dark" mode="horizontal">
                    <StyledItem key="/" icon={<HomeOutlined/>}>
                        <a href="/" rel="noopener noreferrer"/>
                    </StyledItem>
                    <StyledItem key="teams" icon={<TeamOutlined/>}>
                        <a>Times</a>
                    </StyledItem>
                    <StyledItem key="projects" icon={<ProjectOutlined/>}>
                        <a>Projetos</a>
                    </StyledItem>
                    <StyledSubMenu style={{margin: "-2px 30px 5px 0"}} key="5" icon={<Avatar>LE</Avatar>}>
                        <StyledGroup title="Conta">
                            <Menu.Item key="account">
                                <Avatar>LE</Avatar>
                                <strong>Luiz Eduardo</strong>
                            </Menu.Item>
                            <Menu.Item key="logout">
                                <LogoutOutlined/>Logout
                            </Menu.Item>
                        </StyledGroup>
                    </StyledSubMenu>
                    <StyledSubMenu key="4" icon={<PlusOutlined/>}>
                        <Menu.ItemGroup title="Criar">
                            <Menu.Item key="setting:1"><TeamOutlined/>Time</Menu.Item>
                            <Menu.Item key="setting:2"><ProjectOutlined/>Projeto</Menu.Item>
                            <Menu.Item key="setting:3"><UnorderedListOutlined/>Lista de Atividades</Menu.Item>
                            <Menu.Item key="setting:4"><EditOutlined/>Atividade</Menu.Item>
                        </Menu.ItemGroup>
                    </StyledSubMenu>
                    {pathname.startsWith("/project/") &&
                        <StyledSubMenu triggerSubMenuAction="click" key="3" icon={<CalendarOutlined/>}>
                            <div style={{width: '800px'}}>
                                <Calendar
                                    headerRender={() => null}
                                    dateCellRender={this.dateCellRender}
                                    value={moment(new Date())}
                                />
                            </div>

                        </StyledSubMenu>
                    }

                </StyledMenu>
            </StyledHeader>
        )
    }

    getListData = value => {
        return this.props.project.tasks.map(t => t.activities)
            .flat()
            .filter(a => a.responsibles.some(r => r.id === currentUser))
            .filter(a => a.deadline !== null)
            .filter(a => moment(a.deadline).date() === value.date())
            .map(a => (
                {
                    content: a.title,
                    type: new Date().getTime() > a.deadline ? 'error' : 'success'
                }
            )) || []
    };

    dateCellRender = value => {
        const listData = this.getListData(value);
        return (
            <ul style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
            }}>
                {listData.map(item => (
                    <Tooltip key={item.content} title={item.content}>
                        <li>
                            <Badge
                                style={{
                                    width: '100%',
                                    overflow: 'hidden',
                                    fontSize: '12px',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                }}
                                status={item.type} text={item.content} />
                        </li>
                    </Tooltip>

                ))}
            </ul>
        );
    };

}
const mapToProps = state => ({
    project: state?.projects?.project
});
export default connect(mapToProps)(withRouter(Header));