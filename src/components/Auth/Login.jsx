import React from 'react';
import { InputWithLabel, AuthButton, AddLoginMenu } from '.';
import styled from 'styled-components';
import logo from 'assets/logo.png';
import useForm from 'lib/useForm';
import validate from 'lib/validate';
// import axios from 'axios';
import { createJwt } from '../../http-api';
// import Swal from 'sweetalert2';
// import { useDispatch } from 'react-redux';
// import { login, setUserInfo } from 'redux/user';
import Swal from 'sweetalert2';

function Login(props) {
  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', password: '' },
    onSubmit: (values) => {
      getLoginData(values);
    },
    validate,
  });
  const getLoginData = async (row) => {
    try {
      const response = await createJwt(row);
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      window.location.reload();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: '로그인을 할 수 없습니다.',
        text: '정보를 다시 한번 확인해 주세요.',
      });
    }
  };
  return (
    <LoginWrap>
      <LogoWrap>
        <Logo alt="로고" src={logo} />
      </LogoWrap>
      <form onSubmit={handleSubmit} noValidate>
        <InputWithLabel
          type="email"
          label="이메일"
          name="email"
          placeholder="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span className="errorMessage">{errors.email}</span>}
        <InputWithLabel
          type="password"
          label="비밀번호"
          name="password"
          placeholder="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="errorMessage">{errors.password}</span>
        )}
        <AuthButton children="Sign in" type="submit" disabled={submitting} />
        <AddLoginMenu
          autoLogin={() => props.setIsAutoLogin(!props.IsAutoLogin)}
        />
      </form>
    </LoginWrap>
  );
}

const LoginWrap = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: top;
  top: 30%;
  left: 5%;
  width: 25%;
  .errorMessage {
    color: red;
    font-size: 0.75rem;
  }
`;
const LogoWrap = styled.div`
  margin-bottom: 10px;
  width: 100%;
  text-align: center;
`;
const Logo = styled.img`
  width: 70%;
`;

export default Login;
