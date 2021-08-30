import React, { useState } from 'react';
import styled from 'styled-components';
import * as GoIcons from 'react-icons/go';

function ModalOrderView(props) {
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);

  const clickCheckedIcon = (type) => {
    if (type === 'one') {
      setCheckedOne(!checkedOne);
    } else if (type === 'two') {
      setCheckedTwo(!checkedTwo);
    }
  };
  return (
    <Modal>
      <ModalContainer>
        <Title>모두 체크해야 변환된 주문서를 받을 수 있습니다</Title>
        <ContentWrapper>
          <Content>
            <CheckedIcon
              size="20"
              className="one"
              onClick={() => clickCheckedIcon('one')}
              checked={checkedOne}
            />
            사방넷에서 주문서를 수집했나요?
          </Content>
          <Content>
            <CheckedIcon
              size="20"
              className="two"
              onClick={() => clickCheckedIcon('two')}
              checked={checkedTwo}
            />
            모든 주문이 매핑되어 있나요?
          </Content>
        </ContentWrapper>
        <TransformButton disabled={checkedOne & checkedTwo}>
          변환하기
        </TransformButton>
        <ButtonWrapper>
          <Button className="close" onClick={props.closeModal}>
            취소
          </Button>
        </ButtonWrapper>
      </ModalContainer>
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
`;
const ModalContainer = styled.div`
  padding: 35px 25px;
  display: block;
  background-color: #fff;
  width: 500px;
  height: 300px;
  border-radius: 10px;
  text-align: center;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 40px;
`;
const ContentWrapper = styled.div`
  margin: 20px auto;
  padding: 0 40px;
`;
const Content = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;
const ButtonWrapper = styled.div`
  margin-top: 20px;
  float: right;
`;
const Button = styled.button`
  all: unset;
  margin-left: 10px;
  display: inline-block;
  color: #a1a1a1;
  background-color: #fff;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  border-radius: 4px;
  text-decoration: none;
  font-size: 12px;
  transition: 0.2s all;

  &:hover {
    color: #228be6;
  }
`;
const TransformButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 5px 30px;
  border-radius: 5px;
  border: ${(props) =>
    props.disabled ? '1px solid #228be6' : '1px solid #e1e1e1'};
  cursor: ${(props) => (props.disabled ? 'pointer' : 'default')};
  color: ${(props) => (props.disabled ? '#fff' : '#a1a1a1')};
  background-color: ${(props) => (props.disabled ? '#228be6' : '#fff')};
`;
const CheckedIcon = styled(GoIcons.GoCheck)`
  margin-right: 20px;

  cursor: pointer;
  &.one {
    color: ${(props) => (props.checked ? '#228be6' : '#e1e1e1')};
  }
  &.two {
    color: ${(props) => (props.checked ? '#228be6' : '#e1e1e1')};
  }
`;
export default ModalOrderView;
