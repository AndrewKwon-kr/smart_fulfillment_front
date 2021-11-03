import React, { useState } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { getBrandData } from 'http-api';

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
  const [pageUrl, setPageUrl] = useState('');

  async function onClick() {
    await checkUrl(clickedFreebie);
    document.getElementById('nextPage').click();
  }

  const checkUrl = async (clickedFreebie) => {
    if (clickedFreebie) {
      const result = await getBrandData();
      if (result.data.length === 0) {
        swal('[ERP 등록제품] 단계를 먼저 해주세요');
      } else {
        setPageUrl('/freebie');
      }
    } else {
      setPageUrl('/erp');
    }
  };

  return (
    <>
      <BorderedButton
        disabled={!(clickedFreebie || clickedERP)}
        onClick={() => onClick(clickedFreebie)}
      >
        다음 단계로
      </BorderedButton>
      <Link to={pageUrl}>
        <div style={{ display: 'none' }} id="nextPage"></div>
      </Link>
    </>
  );
}

export default NextButton;
