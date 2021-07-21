import React from 'react';
import styled from 'styled-components';

const OptionBody = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #a9a9a9;
  padding: 10px;
  color: #a9a9a9;
  align-items: center;
`;
const AddOptionImage = styled.label`
  all: unset;
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  border: 1px solid #a9a9a9;
  border-radius: 5px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  &.mark {
    border: 2px solid #228be6;
  }
`;
const Register = styled.div`
  line-height: 80px;
`;
const Mark = styled.div`
  position: absolute;
  margin: 5px;
  width: 24px;
  background: #228be6;
  border-radius: 2px;
  color: #fff;
  font-size: 10px;
  text-align: center;
  z-index: 1;
`;
const InputOptionName = styled.input`
  all: unset;
  width: 80%;
  padding: 5px;
  border-bottom: 1px solid #d9d9d9;
  color: #000;
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
const ItemPreviewImage = styled.img`
  position: relative;
  display: inline-block;
  border-radius: 5px;
  width: 60px;
  height: 60px;
  &.full-image {
    width: 100%;
    height: 100%;
    border-radius: 3px;
  }
`;

function Option({
  option,
  handleFileOnChange,
  onChangeOptionName,
  onChecked,
  onMarked,
}) {
  return (
    <OptionBody>
      <OptionOneWrapper>
        <input
          type="checkbox"
          name="mark"
          checked={option.checked}
          onChange={(e) => onChecked(e, option.id)}
        ></input>
      </OptionOneWrapper>
      <OptionTwoWrapper>
        <input
          type="file"
          accept="image/jpg, image/png, image/jpeg"
          id={'markImage' + option.id}
          name="image"
          onChange={(e) => {
            handleFileOnChange(e, option.id);
          }}
          style={{ display: 'none' }}
        ></input>
        {option.mark && <Mark>대표</Mark>}
        <AddOptionImage
          className={option.mark && 'mark'}
          htmlFor={'markImage' + option.id}
        >
          {option.image ? (
            <ItemPreviewImage className="full-image" src={option.image} />
          ) : (
            <Register>등록</Register>
          )}
        </AddOptionImage>
      </OptionTwoWrapper>
      <OptionThreeWrapper>
        <InputOptionName
          type="text"
          name="optionName"
          id={option.id}
          value={option.optionName}
          onChange={(e) => onChangeOptionName(e, option.id)}
        />
      </OptionThreeWrapper>
      <OptionFourWrapper>
        <input
          type="checkbox"
          name="mark"
          checked={option.mark}
          onChange={(e) => onMarked(e, option.id)}
        ></input>
      </OptionFourWrapper>
    </OptionBody>
  );
}

export default Option;
