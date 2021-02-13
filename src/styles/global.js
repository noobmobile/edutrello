import {createGlobalStyle} from "styled-components";
import 'react-toastify/dist/ReactToastify.css'
import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

    main {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        font: 14px 'Open Sans', sans-serif;
    }

`

export default GlobalStyle