import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const SubTableSection = styled(Table)`
  .ant-table-tbody > tr > td {
    font-weight: normal;
  }
`;
const OptionTwoWrapper = styled.div`
  display: inline-block;
  position: relative;
`;
const ItemPreviewImage = styled.img`
  position: relative;
  display: inline-block;
  border-radius: 5px;
  width: 60px;
  height: 60px;
  &.full-image {
    width: 100%;
    height: 100%;
    border-radius: 3px;
  }
`;
const AddOptionImage = styled.label`
  all: unset;
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  border: 1px solid #a9a9a9;
  border-radius: 5px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  &.mark {
    border: 2px solid #228be6;
  }
`;
const Register = styled.div`
  line-height: 80px;
`;
const Mark = styled.div`
  position: absolute;
  margin: 5px;
  width: 24px;
  background: #228be6;
  border-radius: 2px;
  color: #fff;
  font-size: 10px;
  text-align: center;
  z-index: 1;
`;

function SubTable({ record, index, sendData, setSendData }) {
  const [items, setItems] = useState(record.items);
  // const [sendData, setSendData] = useState([]);

  useEffect(() => {
    console.log('sendData -------->', sendData);
  }, [sendData]);

  const data = [];
  for (let i = 0; i < items.length; i++) {
    data.push({
      key: items[i].id,
      name: items[i].name,
      code: items[i].code,
      image: items[i].image,
      mainImage: items[i].main_image,
    });
  }

  const columns = [
    {
      title: '이미지',
      key: 'image',
      render: (option) => (
        <OptionTwoWrapper>
          <input
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            id={'markImage' + index + option.key}
            name="image"
            onChange={(e) => {
              handleFileOnChange(e, option.key);
            }}
            style={{ display: 'none' }}
          ></input>
          {option.mainImage && <Mark>대표</Mark>}
          <AddOptionImage
            className={option.mainImage && 'mark'}
            htmlFor={'markImage' + index + option.key}
          >
            {option.image ? (
              <ItemPreviewImage className="full-image" src={option.image} />
            ) : (
              <Register>등록</Register>
            )}
          </AddOptionImage>
        </OptionTwoWrapper>
      ),
    },
    {
      title: 'SKU명',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'SKU코드',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: '대표',
      key: 'mainImage',
      render: (item) => (
        <input
          type="checkbox"
          name={'mainImage' + index}
          id={'mainImage' + index}
          checked={item.mainImage}
          onChange={(e) => {
            handleRadioChange(e, item.key, item);
          }}
        />
      ),
    },
  ];

  function handleFileOnChange(event, id) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      setItems(
        items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.image = reader.result;
            let imageUpdated = false;
            setSendData(
              sendData.map((data) => {
                if (data.id === item.id) {
                  imageUpdated = true;
                  return item;
                }
                return data;
              })
            );
            if (!imageUpdated) setSendData([...sendData, item]);
            return { ...item };
          }
        })
      );
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function handleRadioChange(e, id) {
    setItems(
      items.map((item) => {
        if (item.id !== id) {
          return { ...item, main_image: false };
        } else {
          item.main_image = true;
          let mainUpdated = false;
          setSendData(
            sendData.map((data) => {
              if (data.id === item.id) {
                mainUpdated = true;
                return item;
              } else {
                return { ...data, main_image: false };
              }
            })
          );
          if (!mainUpdated) setSendData([...sendData, item]);
          return { ...item, main_image: true };
        }
      })
    );
  }
  // function handleRadioChange(e, id) {
  //   setItems(
  //     items.map((item) => {
  //       if (item.id !== id) {
  //         return { ...item, main_image: false };
  //       } else {
  //         item.main_image = true;
  //         setSendData(
  //           sendData.map((data) => {
  //             if (data.id === item.id) {
  //               return item;
  //             } else {
  //               return { ...data, main_image: false };
  //             }
  //           })
  //         );
  //         return { ...item, main_image: true };
  //       }
  //     })
  //   );
  // }
  // console.log('setItems -------->', items);
  return (
    <SubTableSection columns={columns} dataSource={data} pagination={false} />
  );
}

export default SubTable;
