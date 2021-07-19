import React, { useState } from 'react';
import { Table, Radio, Divider } from 'antd';
import 'antd/dist/antd.css';
import Search from "./Search";

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
const data = [
    {
        key: '1',
        name: '농장 시리즈 파우치',
        category: '사은품 (비매품)'
    },
    {
        key: '2',
        name: '마스크',
        category: '사은품 (비매품)'
    },
    {
        key: '3',
        name: '농장 시리즈 파우치',
        category: '사은품 (비매품)'
    },
    {
        key: '4',
        name: '농장 시리즈 파우치',
        category: '인쇄물'
    },
    {
        key: '5',
        name: '아기욕조 전단지',
        category: '인쇄물'
    },
    {
        key: '6',
        name: '루미레브 브로슈어',
        category: '인쇄물'
    },
    {
        key: '7',
        name: '하니박스 전단지',
        category: '인쇄물'
    },
    {
        key: '8',
        name: '하니박스 전단지',
        category: '인쇄물'
    },
    {
        key: '9',
        name: '하니박스 전단지',
        category: '인쇄물'
    },
    {
        key: '10',
        name: '하니박스 전단지',
        category: '인쇄물'
    },
    {
        key: '11',
        name: '하니박스 전단지',
        category: '인쇄물'
    },
]; // rowSelection object indicates the need for row selection

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};

const ImportTable = () => {
    return (
        <div>
            <Search />
            <Table
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
        </div>
    );
};

export default ImportTable;