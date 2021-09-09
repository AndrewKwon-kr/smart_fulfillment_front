import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const BorderedButton = styled(Button)`
  all: unset;
  position: relative;
  float: right;
  display: block;
  border: 1px solid #d9d9d9;
  color: #000;
  background-color: #fff;
  padding: 0.5rem 1.2rem;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 4px;
  text-decoration: none;
  transition: 0.2s all;

  &:hover {
    background: #228be6;
    color: white;
  }

  &:active {
    transform: translateY(3px);
  }
`;

function ImportButton(props) {
  return (
    <BorderedButton
      onClick={() => {
        props.getBothData();
      }}
    >
      {props.text}
    </BorderedButton>
  );
}

export default ImportButton;
