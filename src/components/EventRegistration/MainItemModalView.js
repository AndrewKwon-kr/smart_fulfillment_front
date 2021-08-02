import React, { useState } from 'react';
import styled from 'styled-components';
import { MainItemSearch, Board, Card } from 'components/EventRegistration';
import Select from 'react-select';

const Modal = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000080;
  align-items: center;
  z-index: 9999;

  .flexbox {
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 75%;

    /* overflow: hidden; */

    margin: 10px auto;
  }
  .flexbox .board {
    display: flex;
    flex-direction: column;

    width: 100%;
    /* background-color: #313131; */
    padding: 15px 0;
  }
  .flexbox .board .card {
    padding: 10px 25px;
    border: 1px solid #f3f3f3;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 0px;

    cursor: pointer;
    margin-bottom: 15px;
    font-weight: bold;
    text-align: center;
  }
  .flexbox2 {
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 90%;

    overflow: hidden;

    margin: 10px auto;
  }
  .flexbox2 .board {
    display: flex;
    flex-direction: column;

    width: 100%;
    background-color: #eff3ff;
    padding: 15px;
  }
  .flexbox2 .board .card {
    padding: 10px 25px;
    border: 1px solid #f3f3f3;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 0px;
    background-color: #fff;

    cursor: pointer;
    margin-bottom: 15px;
    font-weight: bold;
    text-align: center;
  }
`;
const ModalContainer = styled.div`
  padding: 35px 25px;
  display: block;
  background-color: #fff;
  width: 400px;
  height: 700px;
  border-radius: 10px;
`;
const BoardContainer = styled.div`
  padding: 35px 25px;
  display: block;
  background-color: #fff;
  width: 400px;
  height: 700px;
  border-radius: 10px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
const Button = styled.button`
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
const InputWrap = styled.div`
  position: relative;
  display: inline-block;
  width: 100px;
`;

function MainItemModalView(props) {
  const [categoryValue, setCategoryValue] = useState('group');
  const categoryOptions = [
    { value: 'group', label: '그룹별' },
    { value: 'product', label: '제품별' },
  ];

  console.log(categoryValue);

  return (
    <Modal>
      <ModalContainer>
        <Title>본품 찾기</Title>
        <MainItemSearch />
        <InputWrap>
          <Select
            options={categoryOptions}
            defaultValue={categoryOptions[0]}
            onChange={setCategoryValue}
          />
        </InputWrap>
        <div className="flexbox">
          <Board id="board-1" className="board">
            <Card id="card-1" className="card" draggable="true">
              전체 제품
            </Card>
            <Card id="card-2" className="card" draggable="true">
              말랑하니 전체 제품
            </Card>
            <Card id="card-3" className="card" draggable="true">
              모우모우 전체 제품
            </Card>
            <Card id="card-4" className="card" draggable="true">
              루미레브 전체 제품
            </Card>
            <Card id="card-5" className="card" draggable="true">
              마지마켓 전체 제품
            </Card>
            <Card id="card-6" className="card" draggable="true">
              아이블린 전체 제품
            </Card>
            <Card id="card-7" className="card" draggable="true">
              본분 전체 제품
            </Card>
          </Board>
        </div>
      </ModalContainer>
      <BoardContainer>
        <div className="flexbox2">
          <Board id="board-2" className="board"></Board>
        </div>
        <ButtonWrapper>
          <Button className="close" onClick={props.close}>
            취소
          </Button>
          <Button className="close">선택</Button>
        </ButtonWrapper>
      </BoardContainer>
    </Modal>
  );
}

export default MainItemModalView;
