import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import * as colors from '../config/colors';

export default createGlobalStyle`
    margin:0;
    padding:0;
    outline:none;
    box-sizing:border-box;

    body {
        font-family: Arial, sans-serif;
        background: ${colors.primaryDark};
        color: ${colors.primaryDark};
    }

    html, body, #root {
        height:100%;
    }

    button {
        cursor:pointer;
        background: ${colors.primary};
        border: none;
        padding: 10px 20px;
        color: #fff;
        border-radius: 5px;
        font-weight: bold;
    }

    a {
        text-decoration:none;
        color: ${colors.primary}
    }
    
    ul {
        list-style:none;
    }

    body .Toastify .Toastify__toast-container .Toastify__toast--success {
        background: ${colors.success};
    }

    body .Toastify .Toastify__toast-container .Toastify__toast--error {
        background: ${colors.error};
    }

    `;

export const Container = styled.section`
    max-width: 360px;
    background-color: #fff;
    margin: 30px auto;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
