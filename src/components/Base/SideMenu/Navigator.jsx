import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SideBarData } from './SidebarData';
import logo from 'assets/logo.png';
import styled from 'styled-components';

const Logo = styled.img`
  width: 166px;
  height: 73px;
  position: absolute;
  left: 50%;
`;

function Navigator() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <Navbar>
        <Menubars to="#">
          <FaIcons.FaBars onClick={showSidebar} />
        </Menubars>
        <Logo alt="셀러비" src={logo} />
      </Navbar>
      <NavMenuWrap>
        <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <NavMenuList>
            <NavMenu>
              <Menubars to="#">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </Menubars>
            </NavMenu>
            {SideBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <Icon>{item.icons}</Icon>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </NavMenuList>
        </div>
      </NavMenuWrap>
    </>
  );
}

export default Navigator;

const Navbar = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  z-index: 2;
`;

const Menubars = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  background-color: #fff;
  color: #9c9c9c;
`;

const NavMenuWrap = styled.nav`
  .nav-menu {
    background-color: #fff;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
    border: 1px solid #d9d9d9;
    border-top: 0;
    z-index: 4;
  }
  .nav-menu.active {
    left: 0;
    transition: 350ms;
  }
  span {
    margin-left: 16px;
  }
  .nav-text {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;
    &:last-of-type {
      border-top: 1px solid #d9d9d9;
    }
  }

  .nav-text a {
    text-decoration: none;
    font-weight: bold;
    color: #9c9c9c;
    font-size: 16px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
  }

  .nav-text a:hover {
    background-color: #1a83ff;
    color: #fff;
  }
`;

const NavMenuList = styled.ul`
  width: 100%;
`;

const NavMenu = styled.li`
  background-color: #fff;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Icon = styled.div`
  :hover {
    color: #fff;
  }
`;
