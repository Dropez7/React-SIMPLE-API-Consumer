import styled from 'styled-components';
import { primary } from '../../config/colors';

export const Nav = styled.nav`
    background-color: ${primary};
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    a{
        color: #fff;
        margin: 0 10px;
        text-decoration: none;
        font-weight: bold;
    }
`;
