import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

const AutoLogin = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 10px;
  font-size: 0.8rem;
  color: ${oc.gray[6]};
`;
const FindPasswordAndJoinWrap = styled.div`
  margin-top: 10px;
  float: right;
`;

const LinkMenu = styled(Link)`
  margin-left: 20px;
  position: relative;
  display: inline-block;
  font-size: 0.8rem;
  color: ${oc.gray[6]};
  text-decoration: none;
`;

const AddLoginMenu = ({ autoLogin }) => (
  <div>
    <AutoLogin>
      <input type="checkbox" onChange={autoLogin} /> 자동로그인
    </AutoLogin>
    <FindPasswordAndJoinWrap>
      <LinkMenu to="/">비밀번호 찾기</LinkMenu>
      <LinkMenu to="/">회원가입</LinkMenu>
    </FindPasswordAndJoinWrap>
  </div>
);

export default AddLoginMenu;
