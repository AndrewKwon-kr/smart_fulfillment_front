import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const BorderedButton = styled(Button)`
  all: unset;
  margin: 0 0 0 20px;
  position: relative;
  display: inline-block;
  font-weight: 600;
  width: 100px;
  text-align: center;
  color: #fff;
  border: 1px solid #d9d9d9;
  background-color: ${(props) => (props.disabled ? '#d9d9d9' : '#228be6')};
  padding: 0.5rem;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 2px;
  text-decoration: none;
  transition: 0.2s all;
`;

function CompleteButton(props) {
  return (
    <BorderedButton
      // disabled={!props.complete}
      loading={props.sendLoading}
      onClick={() => props.complete()}
    >
      {props.sendLoading ? '' : '수정'}
    </BorderedButton>
  );
}

export default CompleteButton;
