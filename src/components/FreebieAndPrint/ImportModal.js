import React, { useMemo } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import faker from "faker/locale/ko";
import ImportTable from "./ImportTable";


faker.seed(5);

const Modal = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #00000080;
    align-items: center;
    z-index: 9999;
`
const ModalContainer = styled.div`
    margin: 0 auto;
    padding: 35px 25px;
    display: block;
    background-color: #fff;
    width: 450px;
    height: 550px;
    border-radius: 10px;
    overflow: scroll;
    ::-webkit-scrollbar { display: none; }
`

const Button = styled.button`
    all: unset;
    margin-left: 10px;
    display: inline-block;
    border: 1px solid #d9d9d9;
    color: #000;
    background-color: #fff;
    padding: 0.5rem 1.2rem;
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
    border-radius: 4px;
    text-decoration: none;
    font-size: 12px;
    transition: .2s all;

    &:hover {
        background: #228be6;
        color: white;
    }
`;
const ButtonWrapper = styled.div`
    padding-bottom: 35px;
    float: right;
`;

function ImportModal(props) {

    return (
        <Modal>
            <ModalContainer>
                <h3>등록된 사은품 · 인쇄물 불러오기</h3>
                <ImportTable />
                <br />
                <ButtonWrapper>
                    <Button className="close" onClick={props.close}> 취소 </Button>
                    <Button className="close" onClick={props.importData}> 선택 </Button>
                </ButtonWrapper>
            </ModalContainer>
        </Modal>
    )
}

export default ImportModal;