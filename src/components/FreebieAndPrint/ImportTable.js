import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';

const columns = [
  {
    title: '분류',
    dataIndex: 'category',
  },
  {
    title: '이름',
    dataIndex: 'name',
  },
];

function ImportTable(props) {
  const data = props.data;
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      props.setSelectedRow(selectedRows);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  console.log(props.loading);
  return (
    <div>
      <Table
        loading={props.loading}
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
}

export default ImportTable;
