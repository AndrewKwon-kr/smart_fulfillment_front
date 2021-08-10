import React, { useState } from 'react';
import styled from 'styled-components';
import { PromotionView } from 'components/EventHistory';
import eventData from '../eventData';

function EventHistory() {
  const [categoryValue, setCategoryValue] = useState('promotion');

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
      <Wrapper>
        {categoryValue === 'promotion' && (
          <PromotionView eventData={eventData} />
        )}
        {categoryValue === 'period' && '기간'}
        {categoryValue === 'situation' && '현황'}
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
`;
const CategoryHeader = styled.div`
  position: sticky;
  top: 80px;
  width: 100%;
  height: 80px;
  text-align: start;
  border-bottom: 1px solid #d9d9d9;
  background-color: #fff;
  z-index: 1;
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
    margin-left: 120px;
  }
  &:hover {
    color: #228be6;
  }
`;
const Wrapper = styled.div`
  position: relative;
  top: 100px;
  display: inline-block;
  width: 80%;
  text-align: start;
  padding-bottom: 40px;
`;

export default EventHistory;
