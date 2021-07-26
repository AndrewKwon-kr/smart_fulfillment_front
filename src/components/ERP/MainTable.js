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

function MainTable(props) {
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
      dataIndex: 'itemGroupName',
      key: 'itemGroupName',
      ...getColumnSearchProps('itemGroupName'),
    },
    {
      title: '품목그룹2코드',
      dataIndex: 'itemGroupCode',
      key: 'itemGroupCode',
      ...getColumnSearchProps('itemGroupCode'),
    },
    {
      title: '품목그룹1명',
      dataIndex: 'brandName',
      key: 'brandName',
      filters: [
        { text: '말랑하니', value: '말랑하니' },
        { text: '루미레브', value: '루미레브' },
        { text: '모우모우', value: '모우모우' },
        { text: '아이블린', value: '아이블린' },
      ],
      onFilter: (value, record) => record.brandName.includes(value),
    },
    {
      title: '품목그룹3명',
      dataIndex: 'representativeName',
      key: 'representativeName',
      ...getColumnSearchProps('representativeName'),
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

export default MainTable;
