import React, { useEffect } from 'react';
import ReactExport from 'react-export-excel';

function FreebieExcel({ data, setIsConfirm }) {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  useEffect(() => {
    setIsConfirm();
  });

  return (
    <ExcelFile hideElement={true} filename="사은품, 인쇄물 조회">
      <ExcelSheet data={data} name="사은품 · 인쇄물">
        {/* <ExcelColumn label="key" value="key" /> */}
        <ExcelColumn label="이름" value="groupName" />
        <ExcelColumn label="분류" value="category" />
        <ExcelColumn label="브랜드" value="brand" />
        <ExcelColumn label="옵션명" value="optionName" />
        <ExcelColumn label="SKU코드" value="skuCode" />
      </ExcelSheet>
    </ExcelFile>
  );
}

export default FreebieExcel;
