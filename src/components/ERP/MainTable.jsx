import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';
import SubTable from './SubTable';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';

const TableSection = styled(Table)`
  margin-top: 40px;
  .ant-table-thead > tr > th {
    background-color: #f9fbff;
    color: #a9a9a9;
    border-bottom: 1px solid #a9a9a9;
    border-top: 1px solid #a9a9a9;
    text-align: center;
  }
  .ant-table-tbody > tr {
    text-align: center;
    font-weight: bold;
  }
`;
const BrandWrapper = styled.div`
  .brand {
    display: inline-block;
  }
  .brand::after {
    content: ', ';
    margin-right: 5px;
  }
  .brand:last-child::after {
    content: '';
    margin-right: 0;
  }
`;

function MainTable(props) {
  const list = props.data;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const handleChange = (pagination, filters) => {
    console.log('Various parameters', pagination, filters);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          검색
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          초기화
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: '',
      dataIndex: 'plus',
      key: 'plus',
    },
    {
      title: '품목그룹2명',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: '품목그룹2코드',
      dataIndex: 'code',
      key: 'code',
      ...getColumnSearchProps('code'),
    },
    {
      title: '품목그룹1명',
      dataIndex: 'brands',
      key: 'brands',
      filters: props.brandData.map((data) => {
        return { text: data.name, value: data.name };
      }),
      onFilter: (value, record) =>
        record.brands.map((brand) => brand.name).includes(value),
      render: (brands) => {
        return (
          <BrandWrapper>
            {brands.map((brand) => {
              return (
                <div key={brand.id} className="brand">
                  {brand.name}
                </div>
              );
            })}
          </BrandWrapper>
        );
      },
    },
    // {
    //   title: '품목그룹3명',
    //   dataIndex: 'representativeName',
    //   key: 'representativeName',
    //   ...getColumnSearchProps('representativeName'),
    // },
  ];

  return (
    <TableSection
      className="components-table-demo-nested"
      loading={props.loading}
      columns={columns}
      dataSource={list}
      expandedRowRender={(record, index) => (
        <SubTable
          record={record}
          index={index}
          list={list}
          sendData={props.sendData}
          setSendData={props.setSendData}
        />
      )}
      onChange={handleChange}
    />
  );
}

export default MainTable;
