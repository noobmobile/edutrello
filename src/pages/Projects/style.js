import 'antd/dist/antd.css';
import styled from "styled-components";
import {Card, List} from "antd";
import {colors} from "../../styles/colors";

export const Container = styled.div`
  padding: 20px 40px;
  background: linear-gradient(180deg, ${colors.secondary} 0%, ${colors.primary} 100%);
  min-height: 150vh;
  > div {
    display: inline-flex;
  }
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
`

export const StyledCard = styled(Card)`
  margin-right: 10px;
  display: inline-grid;
  width: 270px;
  border-radius: 3px;
  background-color: #EBECF0;
  .ant-card-head {
    height: 100%;
    min-height: unset;
    padding: 3px;
  }
  .ant-card-head-title {
    font-weight: bold;
    padding: 10px;
    font-size: 15px;
  }
  .ant-card-body{
    padding: 10px;
  }
  .ant-list-item {

  }
`

export const StyledItem = styled(List.Item)`
  background-color: white;
  height: 100%;
  border-radius: 3px;
  padding: 6px 8px;
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
`