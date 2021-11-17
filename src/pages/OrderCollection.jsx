import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  ModalOrderView,
  ModalTrackingView,
  OrderExcel,
  TrackingExcel,
} from 'components/OrderCollection';
import { Button, Upload } from 'antd';
import axios from 'axios';
import LimitedEventView from '../components/EventHistory/PromotionView';
import swal from 'sweetalert';
import { Spin } from 'antd';
import { ExcelRenderer } from 'react-excel-renderer';
const HOST = 'http://192.168.0.124:8000';
// const HOST = 'https://api2fulfillment.sellha.kr';

function OrderCollection() {
  const [modalOrderVisible, setModalOrderVisible] = useState(false);
  const [modalTrackingVisible, setModalTrackingVisible] = useState(false);
  const [isOrderConfirm, setIsOrderConfirm] = useState(false); // Excel 다운로드 Yes or No
  const [isTrackingConfirm, setIsTrackingConfirm] = useState(false); // Excel 다운로드 Yes or No
  const [step, setStep] = useState(0);

  const [orderExcelData, setOrderExcelData] = useState([]);
  const [trackingExcelData, setTrackingExcelData] = useState([]);
  const [progressStep, setProgressStep] = useState(0);

  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);

  const openOrderModal = () => {
    setModalOrderVisible(true);
  };
  const openTrackingModal = () => {
    setModalTrackingVisible(true);
  };
  const closeOrderModal = () => {
    setModalOrderVisible(false);
    setStep(0);
    setProgressStep(0);
  };
  const closeTrackingModal = () => {
    setModalTrackingVisible(false);
    setProgressStep(0);
    setStep(0);
  };

  const checkSabangnetOrder = async () => {
    const url = `${HOST}/1/order/check-sabangnet/`;
    setStep(1);
    setProgressStep(1);

    await axios.get(url).then((response) => {
      const result = response.data.result;

      if (result.isSabangnet && !result.mappingOverlap) {
        setProgressStep(2);
        gatherSabangnetOrder();
      } else if (!result.isSabangnet && !result.mappingOverlap) {
        setStep(2);
      } else if (result.mappingOverlap) {
        alert('이미 오전/오후에 수집이 완료된 주문서입니다.');
        closeOrderModal();
      }
    });
  };
  const gatherSabangnetOrder = async () => {
    const url = `${HOST}/1/order/gather-sabangnet/`;

    await axios.get(url).then((response) => {
      setProgressStep(3);
      eventMapping();
    });
  };

  const eventMapping = async () => {
    const url = `${HOST}/order/map-event/`;

    await axios.get(url).then((response) => {
      setOrderExcelData(response.data.result);
      setProgressStep(4);
    });
  };

  const getEventData = () => {
    const url = `${HOST}/1/event/limited/`;

    axios
      .get(url)
      .then((response) => {
        try {
          if (response.data.result.length !== 0) {
            setEventData(response.data.result);
            setLoading(false);
          } else if (response.data.result.length === 0) {
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
          alert('데이터를 불러올 수 없습니다.');
          setLoading(false);
        }
      })
      .catch(() => {
        alert('error');
        setLoading(false);
      });
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
        resp.rows.map((row, index) => {
          if (row && row !== 'undefined') {
            newRows.push({
              key: index,
              orderer: row[0],
              phone1: row[1],
              phone2: row[2],
              zip: row[3],
              address: row[4],
              quantity: row[5],
              item: row[6],
              message: row[7],
              channel: row[8],
              no: row[9],
            });
          }
          return newRows;
        });
        if (newRows.length === 0) {
          // setErrorMessage('No data found in file!');
          return false;
        } else {
          postTrackingMap(newRows);
        }
      }
    });
    return false;
  };
  const postTrackingMap = async (excelData) => {
    const url = `${HOST}/1/order/tracking-map/`;

    setStep(1);

    await axios
      .post(url, excelData)
      .then((response) => {
        try {
          if (response.data.code === 201) {
            // window.location.href = '/registitem';
            setTrackingExcelData(response.data.result);
            // setErpLoading(false);
            setProgressStep(3);
          } else {
            console.log(response.status);
            alert('데이터를 등록해주세요');
            // setErpLoading(false);
          }
        } catch (err) {
          alert('데이터를 불러올 수 없습니다.');
        }
      })
      .catch(() => {
        alert('error');
        // setErpLoading(false);
      });
  };

  useEffect(() => {
    getEventData();
  }, []);
  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <Container>
      <ButtonWrapper>
        <Description>
          현재 진행중인 프로모션을 반영해서 주문서를 변환합니다.
        </Description>
        <ExcelButtonWrapper>
          <ExcelButton onClick={() => openOrderModal()}>
            주문서 변환 및 다운로드
          </ExcelButton>
          {isOrderConfirm && (
            <OrderExcel
              data={orderExcelData}
              setIsConfirm={() => {
                setIsOrderConfirm(false);
              }}
            />
          )}
          <ExcelButton onClick={() => openTrackingModal()}>
            송장 업로드
          </ExcelButton>
          <Upload
            name="file"
            id="upload"
            accept=".xlsx, .xls"
            beforeUpload={fileHandler}
            // onRemove={() => setRows([])}
            multiple={false}
          >
            <button style={{ display: 'none' }}></button>
          </Upload>
          {isTrackingConfirm && (
            <TrackingExcel
              data={trackingExcelData}
              setIsConfirm={() => {
                setIsTrackingConfirm(false);
              }}
            />
          )}
        </ExcelButtonWrapper>
        {modalOrderVisible && (
          <ModalOrderView
            checkSabangnetOrder={checkSabangnetOrder}
            closeModal={closeOrderModal}
            step={step}
            orderDownload={() => setIsOrderConfirm(true)}
            progressStep={progressStep}
          />
        )}
        {modalTrackingVisible && (
          <ModalTrackingView
            closeModal={closeTrackingModal}
            uploadExcel={uploadExcel}
            step={step}
            progressStep={progressStep}
            setIsTrackingConfirm={() => setIsTrackingConfirm(true)}
          />
        )}
      </ButtonWrapper>
      <EventWrapper>
        <TitleWrapper>
          <SubTitle>진행중인 한정수량 이벤트</SubTitle>
          <CountTitle>
            (총 <BlueText>{eventData.length}</BlueText>건)
          </CountTitle>
        </TitleWrapper>
        {loading ? (
          <Spinner size="large" tip="데이터를 불러오는 중입니다..." />
        ) : (
          <LimitedEventView eventData={eventData} />
        )}
      </EventWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  top: 0;
  left: 7%;
  width: 93%;
  height: calc(100% - 56px);
  text-align: center;
  /* z-index: -1; */
`;
const ButtonWrapper = styled.div`
  position: relative;
  top: 100px;
  display: inline-block;
  width: 80%;
  height: 20vh;
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
  margin-right: 20px;
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
// const InvoiceUploadButton = styled(Button)`
//   all: unset;
//   margin-left: 20px;
//   border: 1px solid #d9d9d9;
//   color: #000;
//   background-color: #fff;
//   padding: 10px 15px;
//   cursor: pointer;
//   border-radius: 4px;
//   text-decoration: none;
//   transition: 0.2s all;
//   line-height: 23px;
//   font-size: 18px;

//   &:active {
//     transform: translateY(3px);
//   }
// `;
const EventWrapper = styled.div`
  position: relative;
  top: 100px;
  display: inline-block;
  width: 80%;
  text-align: start;
  padding-bottom: 40px;
`;
const TitleWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;
const SubTitle = styled.h2``;
const CountTitle = styled.h3`
  position: relative;
  margin-left: 20px;
  display: flex;
  direction: column;
`;
const BlueText = styled.div`
  margin-left: 5px;
  color: #228be6;
  font-weight: bold;
`;
const Spinner = styled(Spin)`
  margin-top: 200px;
`;

export default OrderCollection;
