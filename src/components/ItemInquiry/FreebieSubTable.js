import React from 'react';
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

function FreebieSubTable({ record, index }) {
  const items = record.items;

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
          {option.mainImage === 1 && <Mark>대표</Mark>}
          <AddOptionImage
            className={option.mainImage === 1 && 'mark'}
            htmlFor={'markImage' + index + option.key}
          >
            {option.image ? (
              <ItemPreviewImage
                className="full-image"
                src={items[option.key - 1].image}
              />
            ) : (
              <Register>이미지 없음</Register>
            )}
          </AddOptionImage>
        </OptionTwoWrapper>
      ),
    },
    {
      title: '옵션명',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'SKU코드',
      key: 'code',
      dataIndex: 'code',
    },
  ];

  return (
    <SubTableSection columns={columns} dataSource={data} pagination={false} />
  );
}

export default FreebieSubTable;
