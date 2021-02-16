import 'antd/dist/antd.css';
import styled from "styled-components";
import {Button, Card, Form, Input, List} from "antd";
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
    border-bottom: 0;
  }

  .ant-card-head-title {
    padding: 10px 10px 2px 10px;
    font-size: 15px;
  }

  .ant-card-head-title Input {
    background-color: inherit;
    border: 0;
    padding: 3px;
    width: 95%;
    font-weight: bold;
    &:focus {
      background-color: white;
    }
    transition: all .3s;
  }
  .ant-card-head-title Button {
    background-color: inherit;
    border: 0;
    padding: 3px;
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
  white-space: normal;
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
`

export const StyledButton = styled(Button)`
  width: 100%;
  height: 100%;
  border: 0;
  background-color: ${colors.card};
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

export const StyledLoading = styled(Card)`
  margin-right: 10px;
  display: inline-grid;
  width: 270px;
  .ant-card-body {
    width: 100%;
  }
`

export const StyledTextArea = styled(Input.TextArea)`
  min-height: 50px;
  overflow: hidden;
  background-color: ${darken(0.03, '#fff')};
  border: 0;
  resize: none;
  &:hover {
    background-color: ${darken(0.05, '#fff')};
  }
`
export const StyledCheckList = styled.div`
  display: block;
  margin-top: 5px;
  &:hover {
    background-color: ${darken(0.05, '#fff')};
  }
`
