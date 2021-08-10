import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import * as MdIcons from 'react-icons/md';

function SituationView(props) {
  const eventData = props.eventData;
  const todayDate = new window.Date();

  const [countBefore, setCountBefore] = useState(0);
  const [countOngoing, setCountOngoing] = useState(0);
  const [countAfter, setCountAfter] = useState(0);

  useEffect(() => {
    const todayDate = new window.Date();

    setCountBefore(
      eventData.filter((event) => new window.Date(event.startDate) > todayDate)
        .length
    );
    setCountOngoing(
      eventData.filter(
        (event) =>
          new window.Date(event.startDate) < todayDate &&
          todayDate < new window.Date(event.endDate)
      ).length
    );
    setCountAfter(
      eventData.filter((event) => new window.Date(event.endDate) < todayDate)
        .length
    );
  }, [eventData]);

  return (
    <Wrapper>
      <ContentWrapper>
        <LabelWrapper>
          <TextLabel className="before">시작전</TextLabel>
          <CountLabel>{countBefore}</CountLabel>
        </LabelWrapper>
        <ItemWrapper>
          {eventData &&
            eventData
              .filter((event) => new window.Date(event.startDate) > todayDate)
              .map((event, index) => (
                <Item key={index}>
                  <Title>{event.title}</Title>
                  <Date>
                    <ClockIcon />
                    {event.startDate} ~ {event.endDate}
                  </Date>
                  <Brand>
                    <BrandIcon />
                    {event.brand}
                  </Brand>
                </Item>
              ))}
        </ItemWrapper>
      </ContentWrapper>
      <ContentWrapper>
        <LabelWrapper>
          <TextLabel className="ongoing">진행중</TextLabel>
          <CountLabel>{countOngoing}</CountLabel>
        </LabelWrapper>
        <ItemWrapper>
          {eventData &&
            eventData
              .filter(
                (event) =>
                  new window.Date(event.startDate) < todayDate &&
                  todayDate < new window.Date(event.endDate)
              )
              .map((event, index) => (
                <Item key={index}>
                  <Title>{event.title}</Title>
                  <Date>
                    <ClockIcon />
                    {event.startDate} ~ {event.endDate}
                  </Date>
                  <Brand>
                    <BrandIcon />
                    {event.brand}
                  </Brand>
                </Item>
              ))}
        </ItemWrapper>
      </ContentWrapper>
      <ContentWrapper>
        <LabelWrapper>
          <TextLabel className="after">종료</TextLabel>
          <CountLabel>{countAfter}</CountLabel>
        </LabelWrapper>
        <ItemWrapper>
          {eventData &&
            eventData
              .filter((event) => new window.Date(event.endDate) < todayDate)
              .map((event, index) => (
                <Item key={index}>
                  <Title>{event.title}</Title>
                  <Date>
                    <ClockIcon />
                    {event.startDate} ~ {event.endDate}
                  </Date>
                  <Brand>
                    <BrandIcon />
                    {event.brand}
                  </Brand>
                </Item>
              ))}
        </ItemWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
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
const ContentWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 3%;
  width: 30%;
  height: 500px;
  border-radius: 20px;
  vertical-align: top;
`;
const LabelWrapper = styled.div`
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;
const TextLabel = styled.div`
  position: relative;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 800;
  padding: 0 5px;
  &.before {
    background-color: #ffdbd8;
  }
  &.ongoing {
    background-color: #ffebc9;
  }
  &.after {
    background-color: #d5efff;
  }
`;
const CountLabel = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 10px;
  width: 25px;
  height: 25px;
  line-height: 25px;
  background-color: #eee;
  color: #7f7f7f;
  text-align: center;
  border-radius: 3px;
`;
const ItemWrapper = styled.ul`
  margin-top: 20px;
  position: relative;
  margin: 0 auto;
  width: 90%;
  text-align: center;
  list-style: none;
`;
const Item = styled.li`
  width: 100%;
  height: 120px;
  /* line-height: 40px; */
  border-radius: 5px;
  background-color: #fff;
  color: #000;
  margin-bottom: 10px;
  border: 1px solid #f3f3f3;
  border-radius: 5px;
  box-shadow: rgb(235 235 235) 3px 3px 5px;
  text-align: center;
  padding: 10px;
`;
export default SituationView;
