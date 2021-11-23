import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import backgroundImg from '../assets/home_bg.png';
import dashboardImage from '../assets/dashboard.png';
import { Login } from 'components/Auth/';
import Swal from 'sweetalert2';
import { checkVerify, checkRefresh } from '../http-api';

function Home() {
  const isLogined = localStorage.getItem('access_token');
  const [IsAutoLogin, setIsAutoLogin] = useState(false);

  useEffect(() => {
    const accessToken = { token: localStorage.getItem('access_token') };
    const refreshToken = { refresh: localStorage.getItem('refresh_token') };

    const verifyLogin = async () => {
      try {
        const res = await checkVerify(accessToken);

        if (IsAutoLogin) {
          localStorage.setItem('refresh_token', refreshToken);
        }
        if (res.status === 200) {
          console.log('checkVerify', res);
        }
      } catch (error) {
        console.log(error.response);
        if (error.response?.status === 401) {
          try {
            const res = await checkRefresh(refreshToken);
            if (res.status === 200) {
              console.log('success_checkRefresh', res);
              localStorage.setItem('access_token', res.data.access);
              window.location.reload();
            }
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: '로그인에 실패하습니다',
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
    if (refreshToken.refresh && accessToken.token) {
      verifyLogin();
    }
  }, [IsAutoLogin]);

  return (
    <Container>
      {!isLogined ? (
        <>
          <BackgroundImage isLogined={isLogined} />
          <Login IsAutoLogin={IsAutoLogin} setIsAutoLogin={setIsAutoLogin} />
        </>
      ) : (
        <DashboardImageWrapper>
          <DashboardImage />
        </DashboardImageWrapper>
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
const DashboardImageWrapper = styled.div`
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
`;
const DashboardImage = styled.div`
  width: 90%;
  height: 4000px;
  background-image: url(${dashboardImage});
  background-repeat: no-repeat;
  background-size: contain;
`;

export default Home;
