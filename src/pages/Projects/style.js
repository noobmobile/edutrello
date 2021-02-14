import 'antd/dist/antd.css';
import styled from "styled-components";
import {Button, Card, Form, List} from "antd";
import {colors} from "../../styles/colors";
import {darken, lighten} from "polished";
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
  background-color: ${colors.card};

  TextArea {
    width: 100%;
    height: 30px;
    resize: none;
    overflow-y: hidden;
    margin-top: 3px;
    background-color: inherit;
    border: none;
    transition: height 0.3s;
    &::placeholder{
      color: rgba(0, 0, 0, 0.45);
    }
    &:hover {
      background-color: ${darken(0.05, colors.card)};
    }
    &:focus {
      background-color: white;
      height: 60px;
    }
  }


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

  .ant-card-body {
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

export const StyledButton = styled(Button)`
  width: 100%;
  height: 100%;
  border: 0;
  background-color: ${colors.card};
  opacity: 0.75;
  text-align: left;
  float: top;
  &:hover {
    background-color: ${darken(0.15, colors.card)};
    color: inherit;
  }
  &:focus{
    background-color: ${colors.card};
    color: inherit;
  }
`
export const StyledForm = styled(Form)`
  width: 100%;
  height: 100%;
  background-color: ${colors.card};
  border-radius: 3px;
  .ant-form-item-explain-error {
    display: none;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
  Input {
    width: 95%;
    margin: 5px;
  }
  Button {
    margin: 5px;
  }
`