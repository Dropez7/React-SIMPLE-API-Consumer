import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
    text-align: center;
`;

export const Form = styled.form`

    label{
        width: 180px;
        height: 180px;
        display: flex;
        background: #eee;
        margin: 30px auto;
        border: 5px dashed ${colors.primary};
        cursor: pointer;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
    }

    img {
        width: 180px;
        height: 180px;
        border-radius: 50%;
    }
    
    input{ 
        display: none;
    }
`;
