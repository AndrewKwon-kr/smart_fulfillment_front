import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const BorderedButton = styled(Link)`
    all: unset;
    margin: 0 0 0 auto;
    position: relative;
    display: inline-block;
    border: 1px solid #d9d9d9;
    color: #000;
    background-color: #fff;
    padding: 0.5rem;
    width: 100px;
    text-align: center;
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
    border-radius: 4px;
    text-decoration: none;
    transition: .2s all;

    &:hover {
        background: #228be6;
        color: white;
    }

    &:active {
        transform: translateY(3px);
    }
    
`;

const BackButton = () => (
    <BorderedButton to="/registitem">
        이전
    </BorderedButton>
);

export default BackButton;