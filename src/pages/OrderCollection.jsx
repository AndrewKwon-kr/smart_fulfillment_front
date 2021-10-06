import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalOrderView, OrderExcel } from 'components/OrderCollection';
import { Button } from 'antd';
import axios from 'axios';

function OrderCollection() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false); // Excel 다운로드 Yes or No
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
