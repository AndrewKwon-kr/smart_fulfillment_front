import React, { useState } from 'react';
import { InputWithLabel, AuthButton, AddLoginMenu } from '.';
import styled from 'styled-components';
import logo from 'assets/logo.png';
import useForm from 'lib/useForm';
import validate from 'lib/validate';
import { createJwt } from '../../http-api';
import Swal from 'sweetalert2';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function Login(props) {
  const [loginLoading, setLoginLoading] = useState(false);
  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', password: '' },
    onSubmit: (values) => {
      getLoginData(values);
    },
    validate,
  });
  const getLoginData = async (row) => {
    setLoginLoading(true);
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
        {loginLoading ? (
          <SpinnerWrap>
            <Spinner size="large" indicator={antIcon} />
          </SpinnerWrap>
        ) : (
          <AuthButton children="로그인" type="submit" disabled={submitting} />
        )}

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
const Spinner = styled(Spin)`
  margin: 0 auto;
`;
const SpinnerWrap = styled.div`
  margin-top: 1rem;
  display: flex;
`;

export default Login;
