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
    let jsonData = {};
    jsonData.title = props.title;
    jsonData.category = props.category;
    jsonData.brand = props.brand;
    jsonData.image = props.image;
    console.log(jsonData);
    localStorage.setItem('test', JSON.stringify(jsonData));
    // window.location.href = '/registitem';
  }
  return (
    <BorderedButton disabled={!props.complete} onClick={() => onClick()}>
      완료
    </BorderedButton>
  );
}

export default CompleteButton;
