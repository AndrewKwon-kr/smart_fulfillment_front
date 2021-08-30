import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ModalOrderView } from 'components/OrderCollection';
import excelIcon from 'assets/icon_excel.png';
import { ExcelRenderer } from 'react-excel-renderer';
import { Button, Upload } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';

function OrderCollection() {
  // console.log(erpData);
  const [rows, setRows] = useState([]);
  const [excelRows, setExcelRows] = useState([]);
  const [isErpData, setIsErpData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const createErpData = (row) => {
    console.log(row);
    console.log('create---> ', row);
    setLoading(true);
    const url = `${process.env.REACT_APP_URL}/brand/itemgroups/items/`;
    const data = {
      messageType: 'create',
      groupId: 1,
      erpDatas: row,
    };
    if (row.length !== 0) {
      axios.post(url, data).then((response) => {
        if (response.data.code === 201) {
          window.location.href = '/erp';
        }
      });
    }
  };
  const updateErpData = (row) => {
    console.log('update ---> ', row);
    const url = `${process.env.REACT_APP_URL}/brand/itemgroups/items/`;
    const data = {
      messageType: 'update',
      groupId: 1,
      erpDatas: row,
    };
    if (row.length !== 0) {
      console.log(row);
      axios
        .post(url, data)
        .then((response) => console.log(response.data.result));
    }
  };

  const uploadExcel = () => {
    swal({
      text: 'Excel 파일을 등록 하시겠습니까?',
      buttons: { confirm: '확인', cancel: '취소' },
    }).then((value) => {
      if (value === true) {
        document.getElementById('upload').click();
      }
    });
  };

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
        resp.rows.slice(2, -1).map((row, index) => {
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
          // console.log(isErpData);
          setExcelRows(newRows);
          isErpData ? updateErpData(newRows) : createErpData(newRows);

          // setErrorMessage(null);
        }
      }
    });
    return false;
  };
  return (
    <Container>
      <Wrapper>
        <Description>
          현재 진행중인 프로모션을 반영해서 주문서를 변환합니다.
        </Description>
        <ExcelButtonWrapper>
          <ExcelButton onClick={() => openModal()}>
            주문서 변환 및 다운로드
          </ExcelButton>
          <Upload
            name="file"
            id="upload"
            accept=".xlsx, .xls"
            beforeUpload={fileHandler}
            onRemove={() => setRows([])}
            multiple={false}
          >
            <button></button>
          </Upload>
          <InvoiceUploadButton>송장 업로드</InvoiceUploadButton>
        </ExcelButtonWrapper>
        {modalVisible && <ModalOrderView closeModal={closeModal} />}
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

const Description = styled.div`
  position: relative;
  display: inline-block;
  color: #a9a9a9;
`;

const ExcelButtonWrapper = styled.div`
  margin-top: 20px;
  .ant-upload-list {
    display: none;
  }
`;
const ExcelButton = styled(Button)`
  all: unset;
  border: 1px solid #d9d9d9;
  color: #000;
  background-color: #fff;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
  text-decoration: none;
  transition: 0.2s all;
  line-height: 23px;
  font-size: 18px;

  &:active {
    transform: translateY(3px);
  }
`;
const InvoiceUploadButton = styled(Button)`
  all: unset;
  margin-left: 20px;
  border: 1px solid #d9d9d9;
  color: #000;
  background-color: #fff;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
  text-decoration: none;
  transition: 0.2s all;
  line-height: 23px;
  font-size: 18px;

  &:active {
    transform: translateY(3px);
  }
`;

export default OrderCollection;
