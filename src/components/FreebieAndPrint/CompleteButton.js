import React from 'react';
import styled from 'styled-components';

const BorderedButton = styled.button`
  all: unset;
  margin: 0 0 0 20px;
  position: relative;
  display: inline-block;
  font-weight: 600;
  width: 100px;
  text-align: center;
  color: #fff;
  background-color: ${(props) => (props.disabled ? '#d9d9d9' : '#228be6')};
  padding: 0.5rem;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 2px;
  text-decoration: none;
  transition: 0.2s all;
`;

function CompleteButton(props) {
  function onClick() {
    if (!props.title) {
      alert('사은품 또는 인쇄물의 이름을 입력해주세요');
      return false;
    } else if (!props.category) {
      alert('분류를 선택해주세요');
      return false;
    } else if (!props.brand.length) {
      alert('브랜드를 선택해주세요');
      return false;
    } else if (!props.options.length) {
      alert('하나 이상의 옵션을 추가해주세요');
      return false;
    } else {
      for (let i = 0; i < props.options.length; i++) {
        let option = props.options[i];
        if (!option.image) {
          alert('옵션의 이미지를 등록해주세요');
          return false;
        } else if (!option.optionName) {
          alert('옵션의 옵션명을 입력해주세요');
          return false;
        } else if (!option.mark) {
          alert('대표 이미지를 선택해주세요');
          return false;
        }
      }
    }
    console.log(props.options);

    let jsonData = {};
    jsonData.title = props.title;
    jsonData.category = props.category;
    jsonData.brand = props.brand;
    jsonData.options = props.options;
    localStorage.setItem('test', JSON.stringify(jsonData));
    // window.location.href = '/registitem';
  }
  return <BorderedButton onClick={() => onClick()}>완료</BorderedButton>;
}

export default CompleteButton;
