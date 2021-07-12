import React from 'react';
import styled from 'styled-components';

const BorderedButton = styled.button`
    all: unset;
    margin-top: 80px;
    position: relative;
    display: inline-block;
    width: 10rem;
    font-weight: 600;
    color: #fff;
    background-color: ${props => (props.disabled ? '#d9d9d9' : '#228be6')};
    padding: 0.5rem;
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
    border-radius: 2px;
    text-decoration: none;
    transition: .2s all;
`;

function NextButton({ clickedFreebie, clickedERP }) {
    function onClick(clickedFreebie) {
        if (clickedFreebie) {
            window.location.href = "/freebie"
        }
        else
            window.location.href = "/erp"
    }
    return (
        <BorderedButton
            disabled={!(clickedFreebie || clickedERP)}
            onClick={() => onClick(clickedFreebie)}>
            다음 단계로
        </BorderedButton>
    )
}


export default NextButton;