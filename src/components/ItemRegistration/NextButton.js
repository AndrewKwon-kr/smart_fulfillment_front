import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import swal from 'sweetalert';

const BorderedButton = styled.button`
  all: unset;
  margin-top: 80px;
  position: relative;
  display: inline-block;
  width: 10rem;
  font-weight: 600;
  color: #fff;
  background-color: ${(props) => (props.disabled ? '#d9d9d9' : '#228be6')};
  padding: 0.5rem;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 2px;
  text-decoration: none;
  transition: 0.2s all;
`;

function NextButton({ clickedFreebie, clickedERP }) {
  function onClick(clickedFreebie) {
    if (clickedFreebie) {
      getBrandData();
    } else window.location.href = '/erp';
  }
  function getBrandData() {
    const url = `${process.env.REACT_APP_URL}/brand/`;

    axios.get(url).then((response) => {
      if (response.data.length === 0) {
        swal('[ERP 등록제품] 단계를 먼저 해주세요');
        return false;
      } else {
        window.location.href = '/freebie';
      }
    });
  }
  return (
    <BorderedButton
      disabled={!(clickedFreebie || clickedERP)}
      onClick={() => onClick(clickedFreebie)}
    >
      다음 단계로
    </BorderedButton>
  );
}

export default NextButton;
