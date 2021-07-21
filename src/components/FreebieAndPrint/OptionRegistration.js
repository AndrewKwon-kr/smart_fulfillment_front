import React from 'react';
import styled from 'styled-components';
import Option from './Option';

const Wrapper = styled.div`
  margin: 20px 0 0 20px;
  table {
    border: 1px solid;
  }
`;
const OptionHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #a9a9a9;
  padding: 10px;
  color: #a9a9a9;
`;
const OptionOneWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 20%;
`;
const OptionTwoWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 30%;
`;
const OptionThreeWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 40%;
`;
const OptionFourWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 10%;
  text-align: center;
`;
const OptionButton = styled.button`
  all: unset;
  margin: 10px 10px 0 0;
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

function OptionRegistration({
  options,
  onCreate,
  onChecked,
  onMarked,
  allChecked,
  onChangeOptionName,
  handleFileOnChange,
  onRemoveOption,
}) {
  return (
    <>
      <Wrapper>
        <OptionHeader>
          <OptionOneWrapper>
            <input
              type="checkbox"
              name="option"
              value="all"
              onChange={() => {
                allChecked();
              }}
            ></input>
          </OptionOneWrapper>
          <OptionTwoWrapper>이미지</OptionTwoWrapper>
          <OptionThreeWrapper>옵션명</OptionThreeWrapper>
          <OptionFourWrapper>대표</OptionFourWrapper>
        </OptionHeader>
        {options.map((option) => (
          <Option
            option={option}
            key={option.id}
            handleFileOnChange={handleFileOnChange}
            onChangeOptionName={onChangeOptionName}
            onChecked={onChecked}
            onMarked={onMarked}
          />
        ))}
        <OptionButton
          onClick={() => {
            onCreate();
          }}
        >
          옵션 추가
        </OptionButton>
        <OptionButton
          onClick={() => {
            onRemoveOption();
          }}
        >
          선택 삭제
        </OptionButton>
      </Wrapper>
    </>
  );
}

export default OptionRegistration;
