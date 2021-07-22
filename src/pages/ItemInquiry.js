import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  ERPMainTable,
  FreebieMainTable,
  ExportExcelButton,
} from 'components/ItemInquiry';
import erpData from '../erpData.json';
import freebieData from '../freebieData.json';
import exportFromJSON from 'export-from-json';

function ItemInquiry() {
  const [tabStatus, setTabStatus] = useState('freebie');
  const excelData = freebieData;

  useEffect(() => {
    if (tabStatus === 'freebie') {
      document.getElementById('freebie').style.background = '#f9fbff';
      document.getElementById('erp').style.background = '';
    } else if (tabStatus === 'erp') {
      setTabStatus('erp');
      document.getElementById('freebie').style.background = '';
      document.getElementById('erp').style.background = '#f9fbff';
    }
  }, [tabStatus]);

  return (
    <Container>
      <Wrapper>
        <SubTitle>등록한 아이템 조회하기</SubTitle>
        <br />
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
        <ExportExcelButton
          text="엑셀 파일 받기"
          exportFromJSON={exportFromJSON}
          excelData={excelData}
        />
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
