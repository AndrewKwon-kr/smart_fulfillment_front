# Fullfilment - Front Repo

주소 : [fulfillment.sellha.kr](https://fulfillment.sellha.kr)  
시작일 : 2021.06  
참여자 :
김창수 허윤은 권혁진 박지애

## 프로젝트 소개

소호몰용 SKU별 프로모션 실시간 관리를 통한 오포장 풀프루프 시스템

## 실행방법

### Dev 환경

1. `npm install`
2. `npm run start`

### Prod 환경

1. `npm install`
2. `npm run build`
3. `serve -s build`

## 라이브러리

| name                      | version | description                    |
| ------------------------- | ------- | ------------------------------ |
| @ant-design/icons         | 4.6.2   | antd 아이콘 모음               |
| @fullcalendar/react       | 5.9.0   | 리액트용 캘린더 라이브러리     |
| @fullcalendar/core        | 5.9.0   | 리액트용 캘린더 라이브러리     |
| @fullcalendar/daygrid     | 5.9.0   | 리액트용 캘린더 라이브러리     |
| @fullcalendar/interaction | 5.9.0   | 리액트용 캘린더 라이브러리     |
| @fullcalendar/timegrid    | 5.9.0   | 리액트용 캘린더 라이브러리     |
| antd                      | 4.16.3  | 기본 컴포넌트 리액트 디자인화  |
| axios                     | 0.21.1  | Promise 기반 http client       |
| open-color                | 1.9.1   | 오픈 소스 색 구성표            |
| react                     | 17.0.2  | 웹 UI 작성 프레임워크          |
| react-datepicker          | 5.1.0   | 리액트용 날짜 선택 라이브러리  |
| react-dom                 | 17.0.2  | 리액트용 DOM                   |
| react-excel-renderer      | 1.1.0   | 리액트용 엑셀 읽기             |
| react-export-excel        | 0.5.3   | 리액트용 엑셀 생성             |
| react-icons               | 4.2.0   | 리액트용 아이콘 모음           |
| react-highlight-words     | 0.17.0  | 리액트용 글배경 강조           |
| react-redux               | 7.2.4   | 리액트용 REDUX 바인딩          |
| react-router-dom          | 5.2.0   | 리액트용 DOM에 라우팅 바인딩   |
| react-select              | 4.3.1   | 리액트용 셀렉트 컴포넌트       |
| redux                     | 4.1.0   | 예측가능한 상태관리 라이브러리 |
| styled-components         | 5.3.0   | 리액트용 스타일링 라이브러리   |
| sweetalert                | 2.1.2   | 디자인된 팝업 박스             |
| sweetalert2               | 11.1.15 | 디자인된 팝업 박스             |
| xlsx                      | 0.17.0  | 엑셀 파일 읽기 라이브러리      |

## 기타

### - 충돌 해결했는데 안 되었다고 하는 경우

1. `npm run nuke:cache`
2. `npm run start`
