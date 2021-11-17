import React, { useState } from 'react';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import * as GrIcons from 'react-icons/gr';
import { PromotionSearch } from '.';
import ReactTooltip from 'react-tooltip';

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
  console.log(eventData);
  return (
    <Wrapper>
      <PromotionSearch handleChange={handleChange} handleClick={handleClick} />
      <CardContainer>
        {filteredEventData.map((event) => (
          <EventInfomationCard key={event.id}>
            <Title data-tip data-for={'title' + event.id}>
              {event.title}
            </Title>
            <ReactTooltip
              id={'title' + event.id}
              aria-haspopup="true"
              role="example"
              place="right"
            >
              <p>이벤트 이름</p>
              <ul>
                <li key={event.id}>{event.title}</li>
              </ul>
            </ReactTooltip>
            <Date>
              <ClockIcon />
              {event.startDate.substring(0, 10).split('-').join('. ')} ~{' '}
              {event.endDate.substring(0, 10).split('-').join('. ') !==
              '9999. 12. 31'
                ? event.endDate.substring(0, 10).split('-').join('. ')
                : '제한없음'}
            </Date>
            <Infomation>
              <div className="info">
                최소구매개수
                <span>
                  {event.minimumQuantity
                    ? event.minimumQuantity.toLocaleString('ko-KR')
                    : '-'}
                  {' 개'}
                </span>
              </div>
              <div className="info">
                최소구매금액
                <span>
                  {event.minimumAmount
                    ? event.minimumAmount.toLocaleString('ko-KR')
                    : '-'}
                  {' 원'}
                </span>
              </div>
            </Infomation>
            <Channel data-tip data-for={'channel' + event.id}>
              <ChannelIcon color="blue" />
              <ReactTooltip
                id={'channel' + event.id}
                aria-haspopup="true"
                role="example"
                place="right"
              >
                <p>판매 채널</p>
                <ul>
                  {event.channels.map((channel) => (
                    <li key={channel.id}>{channel.name}</li>
                  ))}
                </ul>
              </ReactTooltip>
              {event.channels.map((channel) => channel.name).join(', ')}
            </Channel>
            <ItemInfo>
              <div className="info">
                <span className="label">본품</span>
                <span className="content" data-tip data-for={'main' + event.id}>
                  <ReactTooltip
                    id={'main' + event.id}
                    aria-haspopup="true"
                    role="example"
                    place="right"
                  >
                    <p>본품</p>
                    <ul>
                      {event.items.length !== 0
                        ? event.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))
                        : '-'}
                    </ul>
                  </ReactTooltip>
                  {event.items ? event.items.map((item) => item) : '-'}
                </span>
              </div>
              <div className="info">
                <span className="label">사은품</span>
                <span
                  className="content"
                  data-tip
                  data-for={'freebie' + event.id}
                >
                  <ReactTooltip
                    id={'freebie' + event.id}
                    aria-haspopup="true"
                    role="example"
                    place="right"
                  >
                    <p>사은품</p>
                    <ul>
                      {event.freebies.length !== 0
                        ? event.freebies.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))
                        : '-'}
                    </ul>
                  </ReactTooltip>
                  {event.freebies ? event.freebies.map((item) => item) : '-'}
                </span>
              </div>
              <div className="info">
                <span className="label">인쇄물</span>
                <span
                  className="content"
                  data-tip
                  data-for={'print' + event.id}
                >
                  <ReactTooltip
                    id={'print' + event.id}
                    aria-haspopup="true"
                    role="example"
                    place="right"
                  >
                    <p>인쇄물</p>
                    <ul>
                      {event.prints
                        ? event.prints.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))
                        : '-'}
                    </ul>
                  </ReactTooltip>
                  {event.prints.length !== 0
                    ? event.prints.map((item) => item)
                    : '-'}
                </span>
              </div>
            </ItemInfo>
            <Infomation>
              <div className="info">
                {event.isRange
                  ? '모두 증정'
                  : `전체 중 택 ${event.rangeQuantity}`}
              </div>
              <div className="info">
                {event.type === '' && '해당없음'}
                {event.type === 'random' && '랜덤지급'}
                {event.type === 'choice' && '고객선택'}
              </div>
            </Infomation>
          </EventInfomationCard>
        ))}
      </CardContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;
const EventInfomationCard = styled.div`
  margin: 10px 1%;
  display: inline-block;
  min-width: 300px;
  width: 31%;
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

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  margin: 30px 0;
  display: flex;
  justify-content: center;
  font-size: 13px;

  .info {
    margin-right: 10px;
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
const Channel = styled.div`
  margin-bottom: 10px;
  color: #a9a9a9;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ChannelIcon = styled(GrIcons.GrChannel)`
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
