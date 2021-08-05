import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MainItemSearch, Board, Card } from 'components/EventRegistration';
import Select from 'react-select';

function FreebieModalView(props) {
  const [categoryValue, setCategoryValue] = useState({ value: 'group' });
  const [selectedItems, setSelectedItems] = useState([]);
  const categoryOptions = [
    { value: 'group', label: '그룹별' },
    { value: 'product', label: '제품별' },
  ];
  const [groupList, setGroupList] = useState([
    { key: 'all', label: '전체 제품' },
    { key: 'malanghoney', label: '말랑하니 전체 제품' },
    { key: 'mowmow', label: '모우모우 전체 제품' },
    { key: 'roomireve', label: '루미레브 전체 제품' },
    { key: 'margemarket', label: '마지마켓 전체 제품' },
    { key: 'iblyn', label: '아이블린 전체 제품' },
    { key: 'bonboon', label: '본분 전체 제품' },
  ]);
  const [productList, setProductList] = useState([
    { key: 'a', label: '방수매트' },
    { key: 'b', label: '스와들속싸개' },
    { key: 'c', label: '원형러그' },
    { key: 'd', label: '수면조끼' },
    { key: 'd', label: '수유등' },
    { key: 'e', label: '자석받침대' },
    { key: 'f', label: '키즈빈백' },
    { key: 'g', label: '연필꽂이' },
    { key: 'h', label: '색연필' },
  ]);

  // const resetGroupList = () => {
  //   const cards = document.getElementById('board-3').childNodes;
  //   console.log(cards);

  //   // cards.forEach((card) => card.remove());

  //   for (let i = 0; i < cards.length; i++) {
  //     const card = cards[i];
  //     console.log('cards.length ---> ', cards.length, i);
  //     card.parentElement.removeChild(card);
  //   }
  // };
  console.log(selectedItems);
  const setFreebies = () => {
    props.setFreebies(selectedItems);
    props.close();
  };
  return (
    <Modal>
      <ModalContainer>
        <Title>사은품 찾기</Title>
        <MainItemSearch />
        <InputWrap>
          <Select
            options={categoryOptions}
            defaultValue={categoryOptions[0]}
            onChange={setCategoryValue}
          />
        </InputWrap>
        {categoryValue.value === 'group' && (
          <div className="flexbox">
            <Board id="board-1" className="board">
              {groupList.map((group) => (
                <Card
                  key={group.key}
                  id={group.key}
                  className="card"
                  draggable="true"
                >
                  {group.label}
                </Card>
              ))}
            </Board>
          </div>
        )}
        {categoryValue.value === 'product' && (
          <div className="flexbox">
            <Board id="board-2" className="board">
              {productList.map((group) => (
                <Card
                  // key={group.key}
                  id={group.key}
                  className="card"
                  draggable="true"
                >
                  {group.label}
                </Card>
              ))}
            </Board>
          </div>
        )}
      </ModalContainer>
      <BoardContainer>
        <div className="flexbox2">
          {categoryValue.value === 'group' && (
            <Board
              id="board-3"
              className="board"
              setSelectedItems={setSelectedItems}
            ></Board>
          )}
          {categoryValue.value === 'product' && (
            <Board
              id="board-4"
              className="board"
              setSelectedItems={setSelectedItems}
            ></Board>
          )}
        </div>
        <ButtonWrapper>
          <Button className="close" onClick={props.close}>
            취소
          </Button>
          <Button className="close" onClick={setFreebies}>
            선택
          </Button>
        </ButtonWrapper>
      </BoardContainer>
    </Modal>
  );
}

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

    overflow: scroll;

    margin: 10px auto;

    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #a9a9a9;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      /* background-color: grey; */
      border-radius: 10px;
      box-shadow: inset 0px 0px 5px white;
    }
  }
  .flexbox .board {
    display: flex;
    flex-direction: column;

    width: 90%;
    padding: 15px 0;
  }
  .flexbox .board .card {
    padding: 10px 25px;
    border: 1px solid #f3f3f3;
    border-radius: 5px;
    box-shadow: rgb(235 235 235) 3px 3px 5px;

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
    box-shadow: rgb(235 235 235) 3px 3px 5px;
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

export default FreebieModalView;
