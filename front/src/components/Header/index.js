import * as React from "react";
import {Avatar, Badge, Calendar, ConfigProvider, Menu, Tooltip} from "antd";
import {
    StyledHeader,
    StyledMenu,
    StyledItem,
    StyledGroup,
    StyledSubMenu,
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
import {Link, withRouter} from "react-router-dom";
import {currentUser, getAbbreviation} from "../../utils/utils";
import locale from 'antd/lib/locale/pt_BR';
import 'moment/locale/pt-br';
import {logOut} from "../../services/auth";

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        document.title = "Grillo - Gerenciador de Atividades"
        moment.updateLocale('pt-br', {
            weekdaysMin : ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
        });
        const {pathname} = this.props.location;
        if (pathname.startsWith("/login")) return null
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
                    <StyledSubMenu style={{margin: "-2px 30px 5px 0"}} key="5" icon={<Avatar>{getAbbreviation(localStorage.currentUserName)}</Avatar>}>
                        <StyledGroup title="Conta">
                            <Menu.Item key="account">
                                <Avatar>{getAbbreviation(localStorage.currentUserName)}</Avatar>
                                <strong>{localStorage.currentUserName}</strong>
                            </Menu.Item>
                            <Menu.Item onClick={() => logOut()} key="logout">
                                <Link to="/login">
                                    <LogoutOutlined/>Logout
                                </Link>
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
                                <ConfigProvider locale={locale}>
                                    <Calendar
                                        locale={locale}
                                        headerRender={() => null}
                                        dateCellRender={this.dateCellRender}
                                        value={moment(new Date())}
                                    />
                                </ConfigProvider>

                            </div>

                        </StyledSubMenu>
                    }

                </StyledMenu>
            </StyledHeader>
        )
    }

    getListData = value => {
        return this.props.project.tasks
            .map(t => t.activities)
            .flat()
            .filter(a => a.responsibles.some(r => r.id === localStorage.currentUser))
            .filter(a => a.deadline !== null)
            .filter(a => moment(a.deadline).date() === value.date())
            .sort((a, b) => a.id - b.id)
            .map(a => (
                {
                    content: a.title,
                    type: new Date().getTime() > a.deadline ? 'error' : 'success',
                    list: a.activityList.name
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
                    <Tooltip key={item.content} title={
                        <div>
                            <span style={{display: 'block'}}>
                                {item.content}
                            </span>
                            <small>
                                Na lista <span style={{fontStyle: 'italic'}}>{item.list}</span>
                            </small>
                        </div>
                    }>
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