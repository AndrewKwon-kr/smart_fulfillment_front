import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import * as AiIcons from 'react-icons/ai';

function SelectItemButton({ icon, label, description, test, show }) {
  return (
    <Wrapper onClick={test} show={show}>
      <CheckedIcon show={show}>
        <AiIcons.AiFillCheckCircle size="24" color="#228be6" />
      </CheckedIcon>
      <Icon src={icon} />
      <Label>{label}</Label>
      <Description>{description}</Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 80px;
  padding: 20px;
  position: relative;
  display: inline-block;
  width: 200px;
  height: 200px;
  border: ${(props) =>
    props.show ? '2px solid #228be6' : '2px solid #d9d9d9'};
  border-radius: 15px;
  cursor: pointer;
  box-sizing: border-box;

  &:last-of-type {
    margin-left: 60px;
  }
`;
const CheckedIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: ${(props) => (props.show ? 'inline-block' : 'none')};
`;
const Icon = styled.img`
  margin-top: 20px;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
`;
const Label = styled.div`
  margin-top: 10px;
  font-size: 1rem;
  font-weight: bold;
`;
const Description = styled.div`
  margin-top: 5px;
  font-size: 0.7rem;
  color: ${oc.gray[6]};
`;

export default SelectItemButton;
