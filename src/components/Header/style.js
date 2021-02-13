import {Layout, Menu} from "antd";
import styled from 'styled-components';
import {colors} from "../../styles/colors";


export const StyledHeader = styled(Layout.Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 40px;
  line-height: normal;
  padding: 0;
`

export const StyledMenu = styled(Menu)`
  height: 100%;

`
export const StyledItem = styled(Menu.Item)`
  line-height: 40px;
  margin: 3px;
`
export const StyledSubMenu = styled(Menu.SubMenu)`
  height: 100%;
  line-height: 40px;
  margin: 3px;
  float: right;
  padding: 0 3px !important;
`
export const StyledGroup = styled(Menu.ItemGroup)`
    strong {
      margin-left: 10px;
      color: ${colors.text}
    }
`