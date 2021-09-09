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
`;
const ModalContainer = styled.div`
  margin: 0 auto;
  padding: 35px 25px;
  display: block;
  background-color: #fff;
  width: 450px;
  height: 550px;
  border-radius: 10px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
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
  &.left {
    float: left;
  }
`;
const ChannelWrapper = styled.div`
  position: relative;
  /* display: flex; */
  align-items: center;
  margin-bottom: 40px;
`;
const Channel = styled.div`
  position: relative;
  display: inline-block;
  padding: 10px 30px;
  width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  input[type='checkbox'] {
    margin-right: 5px;
  }
`;

function BesideStoreModalView(props) {
  return (
    <Modal>
      <ModalContainer>
        <h3>기타 채널</h3>
        <br />
        <ChannelWrapper>
          {props.besideStoreList.map((store, index) => (
            <Channel key={index}>
              <input
                type="checkbox"
                checked={store.checked}
                onChange={(e) => props.onChange(e, store.id)}
              />
              {store.name}
            </Channel>
          ))}
        </ChannelWrapper>
        <ButtonWrapper className="left">
          <Button onClick={() => props.allSelectedBesideStore(false)}>
            전체 해제
          </Button>
          <Button onClick={() => props.allSelectedBesideStore(true)}>
            전체 선택
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button onClick={props.close}>취소</Button>
          <Button onClick={props.selectedBesideStore}>선택</Button>
        </ButtonWrapper>
      </ModalContainer>
    </Modal>
  );
}

export default BesideStoreModalView;
