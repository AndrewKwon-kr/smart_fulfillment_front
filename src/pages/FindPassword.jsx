import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { sendFindPassword } from '../http-api';

export default function FindPassword() {
  const [Form, setForm] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = useCallback(() => {
    sendFindPassword(Form.name, Form.email)
      .then(() =>
        alert('비밀번호 찾기 메일이 발송되었습니다. 메일을 확인하여주세요.')
      )
      .catch(() => alert('비밀번호 찾기 실패'));
  }, [Form]);

  return (
    <Container>
      {/* <IntroDiv>똑똑한 셀러들이 찾는 아이템 분석 플랫폼</IntroDiv> */}
      {/* <Link to="/">
        <img src={SellhaLogo} alt="셀러하이" width="230px" />
      </Link> */}
      <TitleDiv>비밀번호 찾기</TitleDiv>
      <InputDiv>
        <SInput
          name="name"
          placeholder="이름"
          onChange={(e) => {
            setForm((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        <SInput
          name="email"
          placeholder="이메일"
          onChange={(e) => {
            setForm((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <SubmitButton onClick={handleSubmit}>비밀번호 찾기</SubmitButton>
      </InputDiv>
      <Link to="/">
        <ToLoginDiv>로그인 하러 돌아가기</ToLoginDiv>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: auto;
  margin-top: 12em;
`;

// const IntroDiv = styled.div`
//   margin: 0.5em 1em;
//   width: fit-content;
//   font-size: 1.1em;
// `;

const TitleDiv = styled.div`
  margin-top: 1em;

  font-size: 1.3em;
  font-weight: bold;
`;

const InputDiv = styled.div`
  width: 300px;
  padding: 0.8em;
  margin-top: 3em;
`;

const SInput = styled(Input)`
  height: auto;
  padding: 0.8em;
  margin-bottom: 1em;
  border: none;

  border-bottom: 2px solid #000;

  :focus {
    border-bottom: 2px solid #000;
  }
  :hover {
    border-bottom: 2px solid #000;
  }

  font-size: 1em;
`;

const SubmitButton = styled(Button)`
  background-color: #000000;
  padding: 0.7em;
  width: 100%;
  height: 3em;

  color: #fff;
  font-size: 1.1em;
  letter-spacing: 1px;
  :hover {
    background-color: #7f7f7f;
    border: none;
    color: #fff;
  }
  :focus {
    background-color: #7f7f7f;
    border: none;
    color: #fff;
  }
`;
const ToLoginDiv = styled.div`
  margin-top: 3em;
  margin-bottom: 7em;

  color: #7f7f7f;
`;
