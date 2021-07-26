import React, { useState } from 'react';
import styled from 'styled-components';
import { MainTable, BackButton, CompleteButton } from 'components/ERP';
import excelIcon from 'assets/icon_excel.png';
import { ExcelRenderer } from 'react-excel-renderer';
import erpData from '../testData.json';
import { Button, Upload } from 'antd';

function ERP() {
  console.log(erpData);
  const [rows, setRows] = useState([]);
  // const [cols, setCols] = useState([]);
  // const [errorMessage, setErrorMessage] = useState(null);

  const fileHandler = (fileList) => {
    let fileObj = fileList;
    if (!fileObj) {
      // setErrorMessage('No file uploaded!');
      return false;
    }
    if (
      !(
        fileObj.type === 'application/vnd.ms-excel' ||
        fileObj.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
    ) {
      // setErrorMessage('Unknown file format. Only Excel files are uploaded!');

      return false;
    }
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== 'undefined') {
            newRows.push({
              key: index,
              code: row[0],
              name: row[1],
              type: row[2],
              size: row[3],
              brandName: row[4],
              brandCode: row[5],
              itemGroupName: row[6],
              itemGroupCode: row[7],
              representativeName: row[8],
              representativeCode: row[9],
              search: row[10],
              use: row[11],
            });
          }
          return newRows;
        });
        if (newRows.length === 0) {
          // setErrorMessage('No data found in file!');

          return false;
        } else {
          // setCols(resp.cols);
          setRows(newRows);
          // setErrorMessage(null);
        }
      }
    });
    return false;
  };
  console.log(rows);
  return (
    <Container>
      <Wrapper>
        <SubTitle>ERP 등록제품 이미지 등록(및 수정)</SubTitle>
        <br />
        <Description>
          이미지 항목에 있는 사각형을 누르면 제품 사진을 등록 및 수정 할 수
          있습니다.
        </Description>
        {/* <ImportExcelButton text="엑셀 파일 등록" fileHandler={fileHandler} /> */}
        <ExcelButtonWrapper>
          <Upload
            name="file"
            accept=".xlsx, .xls"
            beforeUpload={fileHandler}
            onRemove={() => setRows([])}
            multiple={false}
          >
            <ExcelButton>
              <ExcelIcon src={excelIcon} />
              엑셀 파일 등록
            </ExcelButton>
          </Upload>
        </ExcelButtonWrapper>
        <MainTable data={rows} />
        <FlexBox>
          <BackButton />
          <CompleteButton text="완료" />
        </FlexBox>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 56px);
  text-align: center;
  /* z-index: -1; */
`;
const Wrapper = styled.div`
  position: relative;
  top: 100px;
  display: inline-block;
  width: 60%;
  text-align: start;
  padding-bottom: 40px;
`;
const SubTitle = styled.h2`
  position: relative;
  display: inline-block;
`;
const Description = styled.div`
  position: relative;
  display: inline-block;
  color: #a9a9a9;
`;
const FlexBox = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;
const ExcelButtonWrapper = styled.div`
  float: right;
  .ant-upload-list {
    display: none;
  }
`;
const ExcelButton = styled(Button)`
  all: unset;
  border: 1px solid #d9d9d9;
  color: #000;
  background-color: #fff;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;
  text-decoration: none;
  transition: 0.2s all;
  line-height: 23px;

  &:active {
    transform: translateY(3px);
  }
`;
const ExcelIcon = styled.img`
  margin-right: 10px;
`;

export default ERP;
