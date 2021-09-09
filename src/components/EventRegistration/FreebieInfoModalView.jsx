import React, { useState } from 'react';
import styled from 'styled-components';

function FreebieInfoModalView(props) {
  return (
    <Modal>
      <ModalContainer>
        <Title>사은품 정보</Title>
        <ContentWrapper>
          <div className="Title">증정 범위</div>
          <div className="Content">
            <input
              type="radio"
              name="range"
              value={true}
              checked={props.freebieRange === true}
              onChange={() => {
                props.setFreebieRange(true);
                props.setRangeNumber(0);
              }}
            />
            <div className="Text">모두 증정</div>
          </div>
          <div className="Content">
            <input
              type="radio"
              name="range"
              value={false}
              checked={props.freebieRange === false}
              onChange={() => {
                props.setFreebieRange(false);
              }}
            />
            <div className="Text">전체 중</div>
            <input
              type="text"
              className="RangeInput"
              onChange={(e) => props.onChangeNumber(e, 'range')}
              value={props.rangeNumber}
              style={{ textAlign: 'right', paddingRight: 5 }}
              disabled={props.freebieRange}
            />
            <div className="Text">개만 증정</div>
          </div>
          <div className="Description">
            - 모두 증정 : 사은품 영역에 넣은 모든 제품 증정
          </div>
          <div className="Description">
            - 전체 중 n개만 증정 : 사은품 영역에 넣은 모든 제품 중 n개만 증정
          </div>
        </ContentWrapper>
        <ContentWrapper>
          <div className="Title">증정 방식</div>
          <div className="Content">
            <input
              type="radio"
              name="type"
              value=""
              onChange={(e) => props.setFreebieType(e.target.value)}
              checked={props.freebieType === ''}
            />
            <div className="Text">해당없음</div>
          </div>
          <div className="Content">
            <input
              type="radio"
              name="type"
              value="random"
              onChange={(e) => props.setFreebieType(e.target.value)}
              checked={props.freebieType === 'random'}
            />
            <div className="Text">랜덤지급형</div>
          </div>
          <div className="Content">
            <input
              type="radio"
              name="type"
              value="choice"
              onChange={(e) => props.setFreebieType(e.target.value)}
              checked={props.freebieType === 'choice'}
            />
            <div className="Text">고객선택형</div>
          </div>
        </ContentWrapper>
        <ButtonWrapper>
          <Button className="close" onClick={props.close}>
            취소
          </Button>
          <Button
            className="close"
            onClick={() => props.setFreebieInfoModalVisible(false)}
          >
            선택
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
  height: 400px;
  border-radius: 10px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
const ContentWrapper = styled.div`
  margin: 20px 10px 0;
  .Title {
    font-size: 16px;
    font-weight: bold;
  }
  .Content {
    display: inline-block;
    margin: 10px 20px;
    .Text {
      margin-left: 10px;
      display: inline-block;
    }
    .RangeInput {
      all: unset;
      margin-left: 10px;
      display: inline-block;
      width: 50px;
      background-color: #e1e1e1;
    }
  }
  .Description {
    margin-top: 5px;
    padding-left: 10px;
    color: #a1a1a1;
  }
`;
const ButtonWrapper = styled.div`
  margin-top: 35px;
  float: right;
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
export default FreebieInfoModalView;
