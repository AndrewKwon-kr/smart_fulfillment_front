import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  ERPMainTable,
  FreebieMainTable,
  ExportExcelButton,
  FreebieExcel,
  ERPExcel,
} from 'components/ItemInquiry';
import erpJson from '../erpData.json';
import freebieJson from '../freebieData.json';
import swal from 'sweetalert';
import axios from 'axios';

function ItemInquiry() {
  const [tabStatus, setTabStatus] = useState('freebie');
  const [isConfirm, setIsConfirm] = useState(false); // Excel 다운로드 Yes or No
  const freebieData = freebieJson;
  const [freebieDatas, setFreebieDatas] = useState([]);
  const erpData = erpJson;
  const [freebieExcelData, setFreebieExcelData] = useState([]);
  const [erpExcelData, setErpExcelData] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_URL}/freebiegroup/`;
    function getFreebiegroup(url) {
      return axios.get(url).then((response) => response.data);
    }
    setFreebieDatas(getFreebiegroup(url));
  }, []);
  useEffect(() => {
    if (tabStatus === 'freebie') {
      document.getElementById('freebie').style.background = '#f9fbff';
      document.getElementById('erp').style.background = '';
      setIsConfirm(false);
    } else if (tabStatus === 'erp') {
      setTabStatus('erp');
      document.getElementById('freebie').style.background = '';
      document.getElementById('erp').style.background = '#f9fbff';
      setIsConfirm(false);
    }
  }, [tabStatus]);

  useEffect(() => {
    function createExcelData(data) {
      let itemArray = [];
      for (let i = 0; i < data.length; i++) {
        let itemGroup = data[i];
        for (let j = 0; j < itemGroup.items.length; j++) {
          let item = itemGroup.items[j];
          let itemObject = {};
          itemObject.category = itemGroup.category;
          itemObject.brand = itemGroup.brand;
          itemObject.groupName = itemGroup.name;
          itemObject.code = itemGroup.code;
          itemObject.register = itemGroup.register;
          itemObject.optionName = item.name;
          itemObject.skuCode = item.code;
          itemArray.push(itemObject);
        }
      }
      return itemArray;
    }

    if (tabStatus === 'freebie') {
      setFreebieExcelData(createExcelData(freebieData));
    } else if (tabStatus === 'erp') {
      setErpExcelData(createExcelData(erpData));
    }
  }, [freebieData, erpData, tabStatus]);

  const onClickExcel = () => {
    let status = tabStatus === 'freebie' ? '사은품 · 인쇄물' : 'ERP 등록제품';
    swal({
      text: status + ' Excel 파일을 다운로드 하시겠습니까?',
      buttons: { confirm: '확인', cancel: '취소' },
    }).then((value) => {
      if (value === true) {
        setIsConfirm(true);
      } else if (value === null) {
        setIsConfirm(false);
      }
    });
  };

  return (
    <Container>
      <Wrapper>
        <SubTitle>등록한 아이템 조회하기</SubTitle>
        <br />
        <button onClick={() => console.log(freebieDatas)}>dfdfdfdf</button>
        <Description>
          아이템 등록 페이지에 입력한 아이템 정보를 조회할 수 있습니다.
        </Description>
        <br />
        <FreebieAndPrintTab
          id="freebie"
          onClick={() => {
            setTabStatus('freebie');
          }}
        >
          사은품 · 인쇄물
        </FreebieAndPrintTab>
        <ErpTab
          id="erp"
          onClick={() => {
            setTabStatus('erp');
          }}
        >
          ERP 등록제품
        </ErpTab>
        <ExportExcelButton text="엑셀 파일 받기" onClick={onClickExcel} />
        {isConfirm && tabStatus === 'freebie' && (
          <FreebieExcel
            data={freebieExcelData}
            setIsConfirm={() => {
              setIsConfirm(false);
            }}
          />
        )}
        {isConfirm && tabStatus === 'erp' && (
          <ERPExcel
            data={erpExcelData}
            setIsConfirm={() => {
              setIsConfirm(false);
            }}
          />
        )}
        {tabStatus === 'freebie' && <FreebieMainTable data={freebieData} />}
        {tabStatus === 'erp' && <ERPMainTable data={erpData} />}
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
const FreebieAndPrintTab = styled.div`
  position: absolute;
  display: inline-block;
  margin-top: 20px;
  width: 200px;
  height: 50px;
  border: 1px solid #a9a9a9;
  border-bottom: 0;
  color: #a9a9a9;
  line-height: 50px;
  text-align: center;
  z-index: 1;
  &:hover {
    font-weight: bold;
    color: #1a83ff;
    cursor: pointer;
  }
`;
const ErpTab = styled.div`
  position: absolute;
  display: inline-block;
  margin-top: 20px;
  left: 210px;
  width: 200px;
  height: 50px;
  border: 1px solid #a9a9a9;
  border-bottom: 0;
  color: #a9a9a9;
  line-height: 50px;
  text-align: center;
  z-index: 1;
  &:hover {
    font-weight: bold;
    color: #1a83ff;
    cursor: pointer;
  }
`;

export default ItemInquiry;
