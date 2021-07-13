import React from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import Search from "./Search";
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  th, td {
  padding: 0.5rem;
  border-bottom: 1px solid #edf1ff;
  }
  tbody > tr {
    &:hover {
      background-color: #edf1ff;
    }
  }
`;

function ImportTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <>
      <Search onSubmit={setGlobalFilter} />
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default ImportTable;
