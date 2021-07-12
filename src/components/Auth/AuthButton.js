import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'lib/styleUtils';

const Wrapper = styled.button`
    all: unset;
    margin-top: 1rem;
    padding: 0.8rem 0;

    background: ${oc.blue[6]};
    color: white;
    width: 100%;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;

    cursor: pointer;
    user-select: none;
    transition: .2s all;

    &:hover {
        background: ${oc.blue[5]};
        ${shadow(0)}
    }

    &:active {
        background: ${oc.blue[7]};
    }

`;

const AuthButton = ({children, ...rest}) => (
    <Wrapper {...rest}>
        {children}
    </Wrapper>
);

export default AuthButton;