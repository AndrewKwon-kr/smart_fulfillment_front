import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';

const columns = [
  {
    title: '등록일',
    dataIndex: 'created',
  },
  {
    title: '이벤트명',
    dataIndex: 'title',
  },
];

function ImportModalTable(props) {
  const data = props.data.map((data) => {
    return {
      ...data,
      key: data.id,
      created: data.created.substring(0, 10).split('-').join('. '),
    };
  });
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
  return (
    <div style={{ marginTop: 20 }}>
      <Table
        loading={props.loading}
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default ImportModalTable;
