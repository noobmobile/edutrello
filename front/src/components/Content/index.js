import * as React from "react";
import GlobalStyle from "../../styles/global";
import Routes from "../../routes";
import {ToastContainer} from "react-toastify";
import {StyledContent} from "./style";

class Content extends React.Component {

    render(){
        return (
            <StyledContent>
                <GlobalStyle/>
                <Routes/>
                <ToastContainer autoClose={3000}/>
            </StyledContent>
        )
    }

}

export default Content;