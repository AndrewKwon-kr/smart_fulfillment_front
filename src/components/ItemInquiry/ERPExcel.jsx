import React, { useEffect } from 'react';
import ReactExport from 'react-export-excel';

function ERPExcel({ data, setIsConfirm }) {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  useEffect(() => {
    setIsConfirm();
  });

  return (
    <ExcelFile hideElement={true} filename="ERP 등록제품">
      <ExcelSheet data={data} name="ERP 등록제품">
        {/* <ExcelColumn label="key" value="key" /> */}
        <ExcelColumn label="품목그룹2명" value="groupName" />
        <ExcelColumn label="품목그룹2코드" value="code" />
        <ExcelColumn label="품목그룹1명" value="brands" />
        <ExcelColumn label="품목그룹3명" value="register" />
        <ExcelColumn label="옵션명" value="optionName" />
        <ExcelColumn label="SKU코드" value="skuCode" />
      </ExcelSheet>
    </ExcelFile>
  );
}

export default ERPExcel;
