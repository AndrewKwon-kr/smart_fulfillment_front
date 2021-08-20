import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  ERPMainTable,
  FreebieMainTable,
  ExportExcelButton,
  FreebieExcel,
  ERPExcel,
} from 'components/ItemInquiry';
// import erpJson from '../erpData.json';
import swal from 'sweetalert';
import axios from 'axios';

function ItemInquiry() {
  const [tabStatus, setTabStatus] = useState('freebie');
  const [isConfirm, setIsConfirm] = useState(false); // Excel 다운로드 Yes or No

  const [freebieData, setFreebieData] = useState([]);
  const [printData, setPrintData] = useState([]);
  const [freebieAndPrintData, setFreebieAndPrintData] = useState([]);

  const [erpData, setErpData] = useState([]);
  // const erpData = erpJson;
  const [freebieExcelData, setFreebieExcelData] = useState([]);
  const [erpExcelData, setErpExcelData] = useState([]);
  const [brandData, setBrandData] = useState([]);

  const [freebieAndPrintLoading, setFreebieAndPrintLoading] = useState(true);
  const [erpLoading, setErpLoading] = useState(true);

  const getFreebieData = () => {
    const url = `${process.env.REACT_APP_URL}/freebiegroup/freebies/`;
    axios
      .get(url)
      .then((response) => {
        try {
          if (response.data) {
            setFreebieData(
              response.data.result.map((data) => {
                return { ...data, category: response.data.category };
              })
            );
            setFreebieAndPrintLoading(false);
          } else {
            console.log(response.status);
            alert('데이터를 등록해주세요');
            setFreebieAndPrintLoading(false);
          }
        } catch (err) {
          alert('데이터를 불러올 수 없습니다.');
        }
      })
      .catch(() => {
        alert('error');
        setFreebieAndPrintLoading(false);
      });
  };
  const getPrintData = () => {
    const url = `${process.env.REACT_APP_URL}/printgroup/prints/`;
    axios.get(url).then((response) =>
      setPrintData(
        response.data.result.map((data) => {
          return { ...data, category: response.data.category };
        })
      )
    );
  };
  const getErpDatas = () => {
    const url = `${process.env.REACT_APP_URL}/itemgroup/items/`;
    axios
      .get(url)
      .then((response) => {
        try {
          if (response.data) {
            setErpData(response.data.result);
            setErpLoading(false);
          } else {
            console.log(response.status);
            alert('데이터를 등록해주세요');
            setErpLoading(false);
          }
        } catch (err) {
          alert('데이터를 불러올 수 없습니다.');
        }
      })
      .catch(() => {
        alert('error');
        setErpLoading(false);
      });
  };
  const getBrandData = () => {
    const url = `${process.env.REACT_APP_URL}/brand/`;
    axios.get(url).then((response) => {
      setBrandData(response.data);
    });
  };

  useEffect(() => {
    getFreebieData();
    getPrintData();
    getErpDatas();
    getBrandData();
  }, []);

  useEffect(() => {
    setFreebieAndPrintData(
      [...freebieData, ...printData].map((data, index) => {
        return { ...data, key: index };
      })
    );
  }, [freebieData, printData]);

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
    function createExcelData(data, type) {
      console.log(data);
      let itemArray = [];
      for (let i = 0; i < data.length; i++) {
        let itemGroup = data[i];
        for (let j = 0; j < itemGroup.items.length; j++) {
          let item = itemGroup.items[j];
          let itemObject = {};
          itemObject.category = itemGroup.category;
          if (type === 'freebie') {
            itemObject.brands = itemGroup.brands
              .map((brand) => brand.name)
              .join(', ');
          } else if (type === 'erp') {
            itemObject.brand = itemGroup.brands;
          }

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
      setFreebieExcelData(createExcelData(freebieAndPrintData, 'freebie'));
    } else if (tabStatus === 'erp') {
      setErpExcelData(createExcelData(erpData, 'erp'));
    }
  }, [freebieAndPrintData, erpData, tabStatus]);

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
        {tabStatus === 'freebie' && (
          <FreebieMainTable
            data={freebieAndPrintData}
            loading={freebieAndPrintLoading}
            brandData={brandData}
          />
        )}
        {tabStatus === 'erp' && (
          <ERPMainTable
            data={erpData}
            loading={erpLoading}
            brandData={brandData}
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
