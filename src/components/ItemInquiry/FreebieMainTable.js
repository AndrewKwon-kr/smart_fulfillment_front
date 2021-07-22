import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';
import SubTable from './FreebieSubTable';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';

const TableSection = styled(Table)`
  margin-top: 69px;
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

function FreebieMainTable(props) {
  const list = props.data;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredInfo, setFilteredInfo] = useState(null);

  const handleChange = (pagination, filters) => {
    console.log('Various parameters', pagination, filters);
    setFilteredInfo(filters);
    localStorage.setItem('testFilter', filteredInfo);
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
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: '분류',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: '사은품(비매품)', value: '사은품(비매품)' },
        { text: '인쇄물', value: '인쇄물' },
      ],
      onFilter: (value, record) => record.category.includes(value),
    },
    {
      title: '브랜드',
      dataIndex: 'brand',
      key: 'brand',
      filters: [
        { text: '말랑하니', value: '말랑하니' },
        { text: '루미레브', value: '루미레브' },
        { text: '모우모우', value: '모우모우' },
        { text: '아이블린', value: '아이블린' },
      ],
      onFilter: (value, record) => record.brand.includes(value),
    },
  ];

  return (
    <TableSection
      className="components-table-demo-nested"
      columns={columns}
      dataSource={list}
      expandedRowRender={(record, index) => (
        <SubTable record={record} index={index} list={list} />
      )}
      onChange={handleChange}
    />
  );
}

export default FreebieMainTable;
