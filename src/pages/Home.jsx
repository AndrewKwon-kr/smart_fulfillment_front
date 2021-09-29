// import React from 'react';
import styled from 'styled-components';
import backgroundImg from '../assets/home_bg.png';
import { Login } from 'containers/Auth';

// require('../styles/home.css');
function Home() {
  const isLogined = localStorage.getItem('access_token');

  return (
    <Container>
      <BackgroundImage isLogined={isLogined} />
      {!isLogined && <Login />}
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