import React from 'react';
import styled from 'styled-components';
import * as BiIcons from 'react-icons/bi';

const InputWrap = styled.div`
  margin: 20px 10px;
  width: 30%;
`;
const Input = styled.input`
  width: 90%;
  display: inline-block;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  outline: none;
  border-radius: 4px;
  line-height: 2.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  box-sizing: border-box;
`;
const Button = styled.button`
  all: unset;
  cursor: pointer;
  display: inline-block;
`;

function PromotionSearch(props) {
  return (
    <InputWrap>
      <Input
        onChange={props.handleChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            props.handleClick();
          }
        }}
        name="filter"
        placeholder="검색어를 입력하세요"
      />
      <Button onClick={props.handleClick}>
        <BiIcons.BiSearch />
      </Button>
    </InputWrap>
  );
}

export default PromotionSearch;
