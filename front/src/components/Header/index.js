import * as React from "react";
import {Avatar, Menu} from "antd";
import {
    StyledHeader,
    StyledMenu,
    StyledItem,
    StyledGroup,
    StyledSubMenu,
} from "./style";
import {
    EditOutlined,
    HomeOutlined, LogoutOutlined,
    PlusOutlined,
    ProjectOutlined,
    TeamOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";

class Header extends React.Component {

    render(){
        document.title = "Grillo - Gerenciador de Atividades"
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
                    <StyledSubMenu style=
                                       {
                                           {
                                               margin: "0 30px 5px 0"
                                           }
                                       } key="5" icon={<Avatar>LE</Avatar>}>
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
                </StyledMenu>
            </StyledHeader>
        )
    }

}

export default Header;