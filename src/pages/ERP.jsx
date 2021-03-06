import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MainTable, BackButton, CompleteButton } from 'components/ERP';
import excelIcon from 'assets/icon_excel.png';
import { ExcelRenderer } from 'react-excel-renderer';
import { Button, Upload } from 'antd';
import swal from 'sweetalert';
import {
  createItemgroups,
  updateItemGroups,
  getItemGroups,
  getBrandData,
  updateItemgroupsImage,
} from '../http-api';

function ERP() {
  const [rows, setRows] = useState([]);
  const isErpData = false;
  const [brandData, setBrandData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendData, setSendData] = useState([]);
  const [sendLoading, setSendLoading] = useState();

  const createErpData = async (row) => {
    const data = {
      messageType: 'create',
      groupId: 1,
      erpDatas: row,
    };
    setLoading(true);

    const response = await createItemgroups(data);

    if (row.length !== 0) {
      if (response.data.code === 201) {
        console.log('create', response);
        setLoading(false);
      }
    }
  };
  const updateErpData = async (row) => {
    const data = {
      messageType: 'update',
      groupId: 1,
      erpDatas: row,
    };
    setLoading(true);

    const response = await updateItemGroups(data);

    if (row.length !== 0) {
      if (response.data.code === 201) {
        console.log('update', response);
        setLoading(false);
      }
    }
  };

  const getErpData = async () => {
    const response = await getItemGroups();

    try {
      if (response.data.result.length !== 0) {
        setRows(response.data.result);
        setLoading(false);
      } else {
        swal({
          text: 'Excel 파일을 등록 해주세요',
          buttons: { confirm: '등록', cancel: '취소' },
        }).then((value) => {
          if (value === true) {
            document.getElementById('upload').click();
          }
        });
        setLoading(false);
      }
    } catch (err) {
      alert('데이터를 불러올 수 없습니다.');
      setLoading(false);
    }
  };
  const getBrandDatas = async () => {
    const response = await getBrandData();

    setBrandData(response.data);
  };
  useEffect(() => {
    getErpData();
    getBrandDatas();
  }, []);

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
  const complete = async () => {
    const data = {
      groupId: 1,
      data: sendData,
    };
    setSendLoading(true);
    await updateItemgroupsImage(data);
    enterLoading();
  };
  const enterLoading = () => {
    setSendLoading(false);
    swal({
      title: '수정 완료',
      text: '다른 아이템을 수정하시겠습니까?',
      icon: 'success',
      buttons: { confirm: '예', cancel: '아니오' },
    }).then((value) => {
      if (value) {
        window.location.reload();
      } else {
        window.location.href = '/registitem';
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
          return false;
        } else {
          isErpData ? updateErpData(newRows) : createErpData(newRows);
        }
      }
    });
    return false;
  };
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
          <ExcelButton onClick={() => uploadExcel()}>
            <ExcelIcon src={excelIcon} />
            엑셀 파일 등록
          </ExcelButton>
          <Upload
            name="file"
            id="upload"
            accept=".xlsx, .xls"
            beforeUpload={fileHandler}
            onRemove={() => setRows([])}
            multiple={false}
          >
            <button style={{ display: 'none' }}></button>
          </Upload>
        </ExcelButtonWrapper>
        <MainTable
          data={rows}
          loading={loading}
          sendData={sendData}
          setSendData={setSendData}
          brandData={brandData || []}
        />
        <FlexBox>
          <BackButton />
          <CompleteButton
            text="완료"
            complete={complete}
            sendLoading={sendLoading}
          />
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
