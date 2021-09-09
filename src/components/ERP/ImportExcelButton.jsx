import React from 'react';
import styled from 'styled-components';
import excelIcon from 'assets/icon_excel.png';

const BorderedButton = styled.button`
  all: unset;
  position: relative;
  float: right;
  display: block;
  border: 1px solid #d9d9d9;
  color: #000;
  background-color: #fff;
  padding: 5px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 4px;
  text-decoration: none;
  transition: 0.2s all;
  line-height: 23px;

  &:active {
    transform: translateY(3px);
  }
`;
const ExcelIcon = styled.img`
  margin-right: 10px;
`;

function ImportExcelButton(props) {
  return (
    <BorderedButton onClick={props.onClick}>
      <ExcelIcon src={excelIcon} />
      {props.text}
    </BorderedButton>
  );
}

export default ImportExcelButton;
