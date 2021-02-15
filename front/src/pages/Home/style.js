import styled from "styled-components";
import {Card, Menu} from "antd";
import {darken} from "polished";
import {colors} from "../../styles/colors";
import 'antd/dist/antd.css';

export const Container = styled.div`
  padding: 40px 60px;
  display: flex;
`

export const StyledMenu = styled(Menu)`
  width: 200px;
  background: inherit;
  .ant-menu-item-selected {
    background-color: ${darken(0.05, colors.primary)} !important;
    border-radius: 4px;
  }
`

export const StyledItem = styled(Menu.Item)`
  margin-top: 3px;
`

export const TPCards = styled.div `
  padding: 20px;
  width: 100%;
`

export const StyledCard = styled(Card)`
    margin-top: 15px;
`