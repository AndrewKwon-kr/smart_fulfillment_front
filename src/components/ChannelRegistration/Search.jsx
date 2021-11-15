import React from 'react';
import styled from 'styled-components';
import * as BiIcons from 'react-icons/bi';
// import { Input } from 'antd';

const InputWrap = styled.div`
  margin-bottom: 20px;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  width: 100%;
  display: flex;
`;
const Input = styled.input`
  width: 90%;
  display: inline-block;
  border: none;
  outline: none;
  border-radius: 4px;
  line-height: 2.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  box-sizing: border-box;
`;
const SearchButton = styled(BiIcons.BiSearch)`
  all: unset;
  cursor: pointer;
  display: inline-block;
  position: relative;
`;

function Search(props) {
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
      ></Input>
      <SearchButton size="24" onClick={props.handleClick} />
    </InputWrap>
  );
}

export default Search;
