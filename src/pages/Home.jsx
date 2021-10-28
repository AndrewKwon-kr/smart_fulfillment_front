import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import backgroundImg from '../assets/home_bg.png';
import { Login } from 'components/Auth/';
import Swal from 'sweetalert2';
import { checkVerify, checkRefresh } from '../http-api';

function Home() {
  const isLogined = localStorage.getItem('access_token');
  const [IsAutoLogin, setIsAutoLogin] = useState(false);

  useEffect(() => {
    const accessToken = { token: localStorage.getItem('access_token') };
    const refreshToken = { token: localStorage.getItem('refresh_token') };

    const verifyLogin = async () => {
      try {
        const res = await checkVerify(accessToken);

        if (IsAutoLogin) {
          localStorage.setItem('refresh_token', refreshToken);
        }
        if (res.status === 200) {
          console.log(res);
        }
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 401) {
          try {
            const res = await checkRefresh(refreshToken);
            if (res.status === 200) {
              console.log('success_checkRefresh');
            }
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: '세션이 만료되었습니다',
              text: '새로 로그인 해주세요',
              confirmButtonColor: '#228be6',
            }).then((result) => {
              console.log(result);
              if (result.isConfirmed) {
                localStorage.removeItem('access_token');
                window.location.reload();
              }
            });
          }
        }
      }
    };
    if (refreshToken.token && accessToken.token) {
      verifyLogin();
    }
  }, [IsAutoLogin]);

  return (
    <Container>
      <BackgroundImage isLogined={isLogined} />
      {!isLogined && (
        <Login IsAutoLogin={IsAutoLogin} setIsAutoLogin={setIsAutoLogin} />
      )}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 79px;
  left: 0;
  width: 100%;
  height: calc(100% - 80px);
  /* z-index: -1; */
`;
const BackgroundImage = styled.div`
  position: relative;
  display: inline-block;
  top: 1px;
  left: 0;
  width: ${(props) => (props.isLogined ? '100%' : '65%')};
  height: 100%;
  background: url(${backgroundImg});
  background-position: center;
  background-size: cover;
`;

export default Home;
