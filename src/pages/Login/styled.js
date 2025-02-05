import styled from 'styled-components';

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
