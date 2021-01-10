import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset}
    * {
       box-sizing: border-box; 
    }
    html, body {
        overflow: hidden;
        height: 100vh;
    }
    a {
        text-decoration:none;
    }
    input:focus {
        outline:none;
    }
    #root {
        height: 100%;
        display:flex;
        flex-direction: row;
    }
`;
