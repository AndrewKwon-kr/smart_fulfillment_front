import React, { useEffect } from 'react';
import ReactExport from 'react-export-excel';

function OrderExcel({ data, setIsConfirm }) {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  useEffect(() => {
    setIsConfirm();
  });

  return (
    <ExcelFile hideElement={true} filename="주문서">
      <ExcelSheet data={data} name="주문서">
        {/* <ExcelColumn label="key" value="key" /> */}
        <ExcelColumn label="이름 (수취인)" value="receiver" />
        <ExcelColumn label="전화 1" value="phone1" />
        <ExcelColumn label="전화 2" value="phone2" />
        <ExcelColumn label="우편번호" value="zip" />
        <ExcelColumn label="주소" value="address" />
        <ExcelColumn label="수량" value="quantity" />
        <ExcelColumn label="품목" value="item" />
        <ExcelColumn label="배송메시지" value="message" />
        <ExcelColumn label="쇼핑몰" value="channel" />
        <ExcelColumn label="No." value="no" />
        {/* <ExcelColumn label="주문번호 (사방넷)" value="order_number" /> */}
      </ExcelSheet>
    </ExcelFile>
  );
}

export default OrderExcel;
