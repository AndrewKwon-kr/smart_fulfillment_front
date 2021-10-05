import React, { useState } from 'react';
import { InputWithLabel, AuthButton, AddLoginMenu } from '.';
import styled from 'styled-components';
import logo from 'assets/logo.png';
import useForm from 'lib/useForm';
import validate from 'lib/validate';
import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useDispatch } from 'react-redux';
// import { login, setUserInfo } from 'redux/user';

function Login() {
  const [isAutoChecked, setIsAutoChecked] = useState(false);
  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', password: '' },
    onSubmit: (values) => {
      getLoginData(values);
    },
    validate,
  });
  const getLoginData = (row) => {
    const url = `${process.env.REACT_APP_URL}/auth/jwt/create/`;

    axios
      .post(url, row)
      .then((response) => {
        try {
          if (response.status === 200) {
            console.log(response);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            window.location.href = '/registitem';

            // setErpLoading(false);
          } else {
            console.log(response.status);
            alert('데이터를 등록해주세요');
            // setErpLoading(false);
          }
        } catch (err) {
          alert('데이터를 불러올 수 없습니다.');
        }
      })
      .catch(() => {
        alert('비밀번호 또는 이메일이 틀렸습니다.');
        // setErpLoading(false);
      });
  };
  // const dispatch = useDispatch();
  // const [LoginForm, setLoginForm] = useState({
  //   email: localStorage.getItem('email') || '',
  //   password: '',
  // });
  // const [IsAutoLogin, setIsAutoLogin] = useState(false);
  // const [loading, setLoading] = useState(true);
  // function localInfo(token) {
  //   if (!token) {
  //     throw new Error('no token');
  //   }

  //   return axios
  //     .get(`${process.env.REACT_APP_URL}/local-info`, {
  //       headers: { authorization: token },
  //     })
  //     .then((res) => res.data);
  // }
  // function localLogin(loginForm) {
  //   return axios
  //     .post(`${process.env.REACT_APP_URL}/local-login`, loginForm)
  //     .then((res) => res.data);
  // }
  // const handleLoginButton = useCallback(() => {
  //   const asyncLogin = async () => {
  //     try {
  //       const { accessToken, refreshToken } = await localLogin(LoginForm);

  //       if (IsAutoLogin) {
  //         localStorage.setItem('REFRESHTOKEN', refreshToken);
  //       }

  //       const info = await localInfo(accessToken).catch(() => null);

  //       dispatch(login(accessToken));
  //       dispatch(setUserInfo(info));

  //       window.location.href = '/';
  //     } catch (error) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: '로그인을 할 수 없습니다.',
  //         text: '정보를 다시 한번 확인해 주세요.',
  //         confirmButtonColor: 'red',
  //       });
  //     } finally {
  //       setLoading(true);
  //     }
  //   };
  //   setLoading(false);
  //   asyncLogin();
  // }, [LoginForm, IsAutoLogin, dispatch]);
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
        <AddLoginMenu autoLogin={() => setIsAutoChecked(!isAutoChecked)} />
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
