import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';

export const SideBarData = [
  {
    title: '홈화면',
    path: '/',
    icons: <AiIcons.AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: '아이템 등록',
    path: '/registitem',
    icons: <HiIcons.HiOutlineViewGridAdd />,
    cName: 'nav-text',
  },
  {
    title: '아이템 조회',
    path: '/inquiryitem',
    icons: <MdIcons.MdPlaylistAddCheck />,
    cName: 'nav-text',
  },
  {
    title: '판매채널 등록',
    path: '/registchannel',
    icons: <AiIcons.AiOutlineShop />,
    cName: 'nav-text',
  },
  {
    title: '이벤트 등록',
    path: '/registevent',
    icons: <MdIcons.MdEventAvailable />,
    cName: 'nav-text',
  },
  {
    title: '이벤트 내역',
    path: '/historyevent',
    icons: <MdIcons.MdEventNote />,
    cName: 'nav-text',
  },
  {
    title: '주문정보 확인',
    path: '/support',
    icons: <FaIcons.FaMoneyCheck />,
    cName: 'nav-text',
  },
];
