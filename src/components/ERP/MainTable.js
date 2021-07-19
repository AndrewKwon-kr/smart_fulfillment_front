import React, { useState } from 'react';
import { Table } from 'antd';
import SubTable from './SubTable';
import Icon from '@ant-design/icons';
import styled from 'styled-components';
import 'antd/dist/antd.css';

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
    const columns = [
        {
            title: '',
            dataIndex: 'plus',
            key: 'plus'
        },
        {
            title: '품목그룹2명',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '품목그룹2코드',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: '품목그룹1명',
            dataIndex: 'brand',
            key: 'brand'
        },
        {
            title: '품목그룹3명',
            dataIndex: 'register',
            key: 'register'
        },
    ];
    const list = props.data;

    return (
        <TableSection
            className="components-table-demo-nested"
            columns={columns}
            dataSource={list}
            expandedRowRender={(record, index) => (
                <SubTable
                    record={record}
                    index={index}
                    list={list}
                />
            )}
        />
    )
}

export default MainTable;