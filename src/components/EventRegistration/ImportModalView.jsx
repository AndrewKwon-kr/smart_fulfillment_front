import React, { useState } from 'react';
import styled from 'styled-components';
import ImportModalTable from './ImportModalTable';
import MainItemSearch from './MainItemSearch';
import { Button } from 'antd';

function ImportModalView(props) {
  const [userInput, setUserInput] = useState();
  const [searchedEvent, setSearchedEvent] = useState(props.eventData);
  const eventData = props.eventData;

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
  };
  const handleClick = () => {
    setSearchedEvent(
      eventData.filter((item) => item.title.includes(userInput))
    );
  };
  return (
    <Modal>
      <ModalContainer>
        <h3>등록된 이벤트 불러오기</h3>
        <MainItemSearch handleChange={handleChange} handleClick={handleClick} />
        <ImportModalTable
          data={searchedEvent}
          loading={props.loading}
          setSelectedRow={props.setSelectedRow}
        />
        <br />
        <ButtonWrapper>
          <AntdButton className="close" onClick={props.close}>
            취소
          </AntdButton>
          <AntdButton
            className="close"
            onClick={props.getEventData}
            loading={props.selectedRowLoading}
          >
            선택
          </AntdButton>
        </ButtonWrapper>
      </ModalContainer>
    </Modal>
  );
}

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
`;
const ModalContainer = styled.div`
  margin: 0 auto;
  padding: 35px 25px;
  display: block;
  background-color: #fff;
  width: 450px;
  height: 630px;
  border-radius: 10px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const AntdButton = styled(Button)`
  all: unset;
  margin-left: 10px;
  display: inline-block;
  border: 1px solid #d9d9d9;
  color: #000;
  background-color: #fff;
  padding: 0.5rem 1.2rem;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 4px;
  text-decoration: none;
  font-size: 12px;
  transition: 0.2s all;

  &:hover {
    background: #228be6;
    color: white;
  }
`;
const ButtonWrapper = styled.div`
  padding-bottom: 35px;
  float: right;
`;

export default ImportModalView;
