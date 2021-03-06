import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  PromotionView,
  PeriodView,
  SituationView,
} from 'components/EventHistory';
// import eventData from '../eventData';
import axios from 'axios';
import { Spin } from 'antd';
import swal from 'sweetalert';

function EventHistory() {
  const [categoryValue, setCategoryValue] = useState('promotion');
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getEventData = () => {
    const url = `https://api2fulfillment.sellha.kr/event/sort/`;

    axios
      .get(url)
      .then((response) => {
        try {
          if (response.data.result.length !== 0) {
            setEventData(response.data.result);
            setLoading(false);
          } else if (response.data.result.length === 0) {
            swal('등록된 이벤트가 없습니다.');
            setLoading(false);
          }
        } catch (err) {
          alert('데이터를 불러올 수 없습니다.');
          setLoading(false);
        }
      })
      .catch(() => {
        alert('error');
        setLoading(false);
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
      <CategoryHeader>
        <Category
          className="first"
          onClick={() => setCategoryValue('promotion')}
          clickedCategory={categoryValue === 'promotion'}
        >
          프로모션별
        </Category>
        <Category
          onClick={() => setCategoryValue('period')}
          clickedCategory={categoryValue === 'period'}
        >
          기간별
        </Category>
        <Category
          onClick={() => setCategoryValue('situation')}
          clickedCategory={categoryValue === 'situation'}
        >
          현황별
        </Category>
      </CategoryHeader>
      {loading ? (
        <Spinner size="large" tip="데이터를 불러오는 중입니다..." />
      ) : (
        <Wrapper>
          {categoryValue === 'promotion' && (
            <PromotionView eventData={eventData} />
          )}
          {categoryValue === 'period' && <PeriodView eventData={eventData} />}
          {categoryValue === 'situation' && (
            <SituationView eventData={eventData} />
          )}
        </Wrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  top: 0;
  left: 5%;
  width: 95%;
  height: calc(100% - 56px);
  text-align: center;
`;
const CategoryHeader = styled.div`
  position: sticky;
  top: 0;
  margin-left: -10px;
  width: calc(100% + 10px);
  height: 80px;
  text-align: start;
  border-bottom: 1px solid #d9d9d9;
  background-color: #fff;
  z-index: 3;
`;
const Category = styled.div`
  position: relative;
  display: inline-block;
  width: 150px;
  height: 100%;
  text-align: center;
  line-height: 80px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  color: ${(props) => (props.clickedCategory ? '#228be6' : '#000')};
  border-bottom: ${(props) =>
    props.clickedCategory ? '3px solid #228be6' : 'none'};
  &.first {
    margin-left: 200px;
  }
  &:hover {
    color: #228be6;
  }
`;
const Wrapper = styled.div`
  position: relative;
  top: 40px;
  display: inline-block;
  width: 80%;
  text-align: start;
  padding-bottom: 40px;
`;
const Spinner = styled(Spin)`
  margin-top: 80px;
`;

export default EventHistory;
