import React, { useState } from 'react';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import * as MdIcons from 'react-icons/md';
import { PromotionSearch } from '../EventHistory';

function PromotionView(props) {
  const eventData = props.eventData;
  const [userInput, setUserInput] = useState('');
  const [filteredEventData, setFilteredEventData] = useState(eventData);
  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
  };
  const handleClick = () => {
    setFilteredEventData(
      eventData.filter((event) => event.title.includes(userInput))
    );
  };

  return (
    <Wrapper>
      <PromotionSearch handleChange={handleChange} handleClick={handleClick} />
      {filteredEventData.map((event, index) => (
        <EventInfomation key={index}>
          <Title>{event.title}</Title>
          <Date>
            <ClockIcon />
            {event.startDate} ~ {event.endDate}
          </Date>
          <Infomation>
            <div className="info">
              최소구매개수
              <span>
                {event.minBuyNumber
                  ? event.minBuyNumber.toLocaleString('ko-KR')
                  : '-'}
                개
              </span>
            </div>
            <div className="info">
              최소구매금액
              <span>
                {event.minBuyPrice
                  ? event.minBuyPrice.toLocaleString('ko-KR')
                  : '-'}
                원
              </span>
            </div>
          </Infomation>
          <Brand>
            <BrandIcon />
            {event.brand}
          </Brand>
          <ItemInfo>
            <div className="info">
              <span className="label">본품</span>
              <span className="content">
                {event.mainItem ? event.mainItem : '-'}
              </span>
            </div>
            <div className="info">
              <span className="label">사은품</span>
              <span className="content">
                {event.freebies ? event.freebies.join(', ') : '-'}
              </span>
            </div>
            <div className="info">
              <span className="label">인쇄물</span>
              <span className="content">
                {event.prints ? event.prints : '-'}
              </span>
            </div>
          </ItemInfo>
        </EventInfomation>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
`;
const EventInfomation = styled.div`
  margin: 10px 1%;
  display: inline-block;
  width: 30%;
  height: 350px;
  border: 1px solid #a9a9a9;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  vertical-align: top;
`;
const Title = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
`;
const Date = styled.div`
  margin-bottom: 10px;
  color: #a9a9a9;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ClockIcon = styled(FiIcons.FiClock)`
  margin-right: 5px;
`;
const Infomation = styled.div`
  .info {
    margin-bottom: 10px;
    margin-right: 10px;
    display: inline-block;
    color: #a9a9a9;
    span {
      color: #000;
      margin-left: 10px;
    }
    ::after {
      padding-left: 10px;
      content: '|';
    }
    :last-child::after {
      padding-left: 0;
      content: '';
    }
  }
`;
const Brand = styled.div`
  margin-bottom: 10px;
  color: #a9a9a9;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BrandIcon = styled(MdIcons.MdLocationOn)`
  margin-right: 5px;
`;
const ItemInfo = styled.div`
  padding: 0 60px;
  text-align: start;
  white-space: nowrap;
  .info {
    margin-bottom: 10px;
    margin-right: 10px;
    color: #a9a9a9;
    display: flex;
    .label {
      display: inline-block;
      min-width: 40px;
      text-align: right;
      font-weight: 600;
    }
    .content {
      color: #000;
      display: inline-block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      ::before {
        color: #a9a9a9;
        content: '|';
        padding: 0 10px;
      }
    }
  }
`;

export default PromotionView;
