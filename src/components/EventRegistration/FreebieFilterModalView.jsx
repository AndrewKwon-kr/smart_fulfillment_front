import React, { useState } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import 'antd/dist/antd.css';

const columns = [
  {
    title: '옵션명',
    dataIndex: 'name',
  },
  {
    title: '이름',
    dataIndex: 'label',
  },
  {
    title: '브랜드',
    dataIndex: 'brands',
  },
];

function FreebieFilterModalView(props) {
  const [defaultRowKeys, setDefaultRowKeys] = useState(
    props.filteredFreebieItem.map((item) => item.id)
  );
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // props.setSelectedRow(selectedRows);
      console.log('selectedRows: ', selectedRows);
      console.log(selectedRowKeys);
      setDefaultRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
    selectedRowKeys: defaultRowKeys,
  };
  const setItems = () => {
    props.setFilteredFreebieItem(
      props.filteredFreebieItem.filter((item) =>
        defaultRowKeys.includes(item.id)
      )
    );

    props.setSelectedItems(
      props.selectedItems.map((item) => {
        if (item.id === props.filteredFreebieItem[0].groupId) {
          return {
            ...item,
            items: props.filteredFreebieItem.filter((item) =>
              defaultRowKeys.includes(item.id)
            ),
          };
        } else return { ...item };
      })
    );
    props.close();
  };

  return (
    <Modal>
      <ModalContainer>
        <Title>필터링</Title>
        <Table
          // loading={props.loading}
          pagination={false}
          scroll={{ y: 300 }}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={props.filteredFreebieItem}
        />
        <ButtonWrapper>
          <Button className="close" onClick={props.close}>
            취소
          </Button>
          <Button className="close" onClick={setItems}>
            선택
          </Button>
        </ButtonWrapper>
      </ModalContainer>
    </Modal>
  );
}
const Modal = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000080;
  align-items: center;
  z-index: 9999;
`;
const ModalContainer = styled.div`
  padding: 35px 25px;
  display: block;
  background-color: #fff;
  width: 700px;
  height: 600px;
  border-radius: 10px;
  .ant-table-thead > tr > th {
    text-align: center;
  }
  .ant-table-tbody > tr > td {
    text-align: center;
  }
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 40px;
`;
const ButtonWrapper = styled.div`
  margin-top: 35px;
  float: right;
`;
const Button = styled.button`
  all: unset;
  margin-left: 10px;
  display: inline-block;
  border: 1px solid #d9d9d9;
  color: #000;
  background-color: #fff;
  padding: 0.5rem 1.2rem;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 4px;
  text-decoration: none;
  font-size: 12px;
  transition: 0.2s all;

  &:hover {
    background: #228be6;
    color: white;
  }
`;
export default FreebieFilterModalView;
