import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from 'antd';

const BorderedButton = styled(Button)`
  all: unset;
  margin: 0 0 0 20px;
  position: relative;
  display: inline-block;
  font-weight: 600;
  width: 100px;
  text-align: center;
  color: #fff;
  border: 1px solid #d9d9d9;
  background-color: ${(props) => (props.disabled ? '#d9d9d9' : '#228be6')};
  padding: 0.5rem;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 2px;
  text-decoration: none;
  transition: 0.2s all;
`;

function CompleteButton(props) {
  const updateData = (row, category) => {
    props.enterLoading();

    const url = `${process.env.REACT_APP_URL}/${
      category.split('/')[0] +
      '/' +
      props.dataKey +
      '/' +
      category.split('/')[1]
    }/`;
    const data = {
      groupId: 1,
      data: row,
    };
    console.log(row);
    axios
      .put(url, data)
      .then((response) => {
        try {
          if (response.data.code === 201) {
            window.location.href = '/registitem';
            console.log(response.data);
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
        alert('error');
        // setErpLoading(false);
      });
  };
  const createData = (row, category) => {
    props.enterLoading();
    const url = `${process.env.REACT_APP_URL}/${category}/`;
    const data = {
      groupId: 1,
      data: row,
    };
    console.log(row);
    axios
      .post(url, data)
      .then((response) => {
        try {
          if (response.data.code === 201) {
            window.location.href = '/registitem';
            console.log(response.data);
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
        alert('error');
        // setErpLoading(false);
      });
  };
  function onClick() {
    if (!props.title) {
      alert('사은품 또는 인쇄물의 이름을 입력해주세요');
      return false;
    } else if (!props.category) {
      alert('분류를 선택해주세요');
      return false;
    } else if (!props.brand.length) {
      alert('브랜드를 선택해주세요');
      return false;
    } else if (!props.options.length) {
      alert('하나 이상의 옵션을 추가해주세요');
      return false;
    } else {
      for (let i = 0; i < props.options.length; i++) {
        let option = props.options[i];
        if (!option.image) {
          alert('옵션의 이미지를 등록해주세요');
          return false;
        }
        if (!option.name) {
          alert('옵션의 옵션명을 입력해주세요');
          return false;
        }
      }
    }

    let jsonData = {};
    jsonData.name = props.title;
    // jsonData.category = props.category;
    jsonData.brands = props.brand.map((brand) => brand.value);
    jsonData.items = props.options;
    jsonData.key = props.key;
    if (props.text === '등록') {
      createData(jsonData, props.category.value);
    } else {
      updateData(jsonData, props.category.value);
    }
  }
  return (
    <BorderedButton
      type="primary"
      loading={props.loading}
      onClick={() => onClick()}
    >
      {props.loading ? '' : props.text}
    </BorderedButton>
  );
}

export default CompleteButton;
