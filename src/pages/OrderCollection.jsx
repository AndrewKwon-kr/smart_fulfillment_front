import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalOrderView, OrderExcel } from 'components/OrderCollection';
import { ExcelRenderer } from 'react-excel-renderer';
import { Button, Upload } from 'antd';
// import axios from 'axios';
// import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import axios from 'axios';

function OrderCollection() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false); // Excel 다운로드 Yes or No

  const [jsonFile, setJsonFile] = useState();
  const [step, setStep] = useState(0);

  const [orderExcelData, setOrderExcelData] = useState([]);
  const [progressStep, setProgressStep] = useState(0);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setStep(0);
    setProgressStep(0);
  };

  // const intervalId = useRef(null);

  // const startCounter = () => {
  //   intervalId.current = setInterval(
  //     () => setProgressStep((count) => count + 1),
  //     2500
  //   );
  // };

  // const downloadOrder = async () => {
  //   setIsConfirm(true);
  // };

  // const uploadExcel = () => {
  //   swal({
  //     text: 'Excel 파일을 등록 하시겠습니까?',
  //     buttons: { confirm: '확인', cancel: '취소' },
  //   }).then((value) => {
  //     if (value === true) {
  //       document.getElementById('upload').click();
  //     }
  //   });
  // };
  const transformOrder = async () => {
    const url = `${process.env.REACT_APP_URL}/1/order/check-sabangnet/`;
    setStep(1);
    setProgressStep(1);
    console.log('transformOrder_before');
    await axios.get(url).then((response) => {
      console.log('transformOrder_after');
      if (response.data.result) {
        setProgressStep(2);
        eventMapping();
      } else {
        setStep(2);
      }
    });
  };

  const eventMapping = async () => {
    const url = `${process.env.REACT_APP_URL}/order/map-event/`;
    setProgressStep(3);
    console.log('eventMapping_before');
    await axios.get(url).then((response) => {
      console.log('eventMapping_after');
      setOrderExcelData(response.data.result);
      setProgressStep(4);
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
        console.log(fileObj);
        resp.rows.map((row, index) => {
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
          // setExcelRows(newRows);
          console.log(newRows);
          // createErpData(newRows);

          // setErrorMessage(null);
        }
      }
    });
    return false;
  };

  const filePathset = (e) => {
    console.log(e.file);
    console.log(e.fileList);
    // var file = e.target.files[0];
    // setFile(e.file);
    readFile(e.file);
    setStep(1);
    // startCounter();
    // setTimeout(() => {
    //   clearInterval(intervalId.current);
    // }, 10000);
  };
  const readFile = (file) => {
    var f = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[6];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      setJsonFile(convertToJson(data)); // shows data in json format
    };
    reader.readAsBinaryString(f);

    console.log(jsonFile);
  };
  const convertToJson = (csv) => {
    var lines = csv.split('\n');

    var result = [];

    var headers = lines[0].split(',');

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(',');

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  };

  // const orderDownload = () => {
  //   Swal.fire({
  //     icon: 'success',
  //     title: '주문서를 다운로드 하시겠습니까?',
  //     showCancelButton: true,
  //   }).then((value) => {
  //     if (value === true) {
  //       downloadOrder();
  //     }
  //   });
  // };
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
          {isConfirm && (
            <OrderExcel
              data={orderExcelData}
              setIsConfirm={() => {
                setIsConfirm(false);
              }}
            />
          )}
          <Upload
            name="file"
            id="upload"
            accept=".xlsx, .xls"
            beforeUpload={fileHandler}
            onChange={filePathset.bind(this)}
            // onRemove={() => setRows([])}
            multiple={false}
          >
            <button></button>
          </Upload>
          <InvoiceUploadButton>송장 업로드</InvoiceUploadButton>
        </ExcelButtonWrapper>
        {modalVisible && (
          <ModalOrderView
            transformOrder={transformOrder}
            closeModal={closeModal}
            step={step}
            orderDownload={() => setIsConfirm(true)}
            progressStep={progressStep}
          />
        )}
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
