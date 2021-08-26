import React from 'react';
import styled from 'styled-components';
import * as AiIcons from 'react-icons/ai';

function SelectChannelButton({ icon, label, show, setChannelData }) {
  return (
    <Wrapper onClick={setChannelData} show={show}>
      <CheckedIcon show={show}>
        <AiIcons.AiFillCheckCircle size="24" color="#228be6" />
      </CheckedIcon>
      <Icon src={icon} />
      <Label>{label}</Label>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
  text-align: center;
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
  margin-top: 30px;
  font-size: 1rem;
  font-weight: bold;
`;

export default SelectChannelButton;
