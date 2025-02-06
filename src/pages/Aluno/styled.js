import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
    text-align: center;
    padding-bottom: 10px
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    label{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    input{
        height: 40px;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 0 10px;
        margin-top: 5px;

        &:focus{
            border: 1px solid #222;
        }
    } 
`;

export const ProfilePicture = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0 20px; 
    position: relative;

    img{
        width: 180px;
        height: 180px;
        border-radius: 50%;
    }

    a {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        position: absolute;
        bottom: 0;
        color: #fff;
        background: ${colors.primary};
        height: 40px; 
        width: 40px;
        border-radius: 50%;
    }
`;
