import React from 'react';
import styled from 'styled-components';

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
`


function ImportModal(props) {
    return(
        <Modal>
            <ModalContainer>
                <h3>등록된 사은품 · 인쇄물 불러오기</h3>
                <button className="close" onClick={props.close}> close </button>
                <button className="close" onClick={props.importData}> 선택 </button>
            </ModalContainer>
        </Modal>
    )
}

export default ImportModal;