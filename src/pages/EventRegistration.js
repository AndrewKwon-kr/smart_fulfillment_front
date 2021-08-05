import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import {
  MainItemModalView,
  FreebieModalView,
  PrintModalView,
} from 'components/EventRegistration';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
registerLocale('ko', ko);

function EventRegistration() {
  const [title, setTitle] = useState('');
  const [stepStatus, setStepStatus] = useState(1);

  const [countMainItem, setCountMainItem] = useState(0);
  const [countFreebie, setCountFreebie] = useState(0);
  const [countPrint, setCountPrint] = useState(0);

  const [mainItemModalVisible, setMainItemModalVisible] = useState(false);
  const [freebieModalVisible, setFreebieModalVisible] = useState(false);
  const [printModalVisible, setPrintModalVisible] = useState(false);

  const [mainItems, setMainItems] = useState([]);
  const [freebies, setFreebies] = useState([]);
  const [prints, setPrints] = useState([]);

  const [minBuyNumber, setMinBuyNumber] = useState(0);
  const [minBuyPrice, setMinBuyPrice] = useState({
    price: '',
    check: false,
  });
  const [limitNumber, setLimitNumber] = useState({
    number: '',
    check: false,
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [isInfinited, setIsInfinited] = useState(false);
  registerLocale('ko', ko);

  console.log(startDate, endDate);

  const onChange = (e) => {
    setTitle(e.target.value);
  };
  const setNextStep = () => {
    setStepStatus(stepStatus + 1);
  };
  const setBackStep = () => {
    setStepStatus(stepStatus - 1);
  };
  const openModal = (type) => {
    console.log(type);
    if (type === 'main') {
      setMainItemModalVisible(true);
    } else if (type === 'freebie') {
      setFreebieModalVisible(true);
    } else if (type === 'print') {
      setPrintModalVisible(true);
    }
  };
  function closeModal(type) {
    if (type === 'main') {
      setMainItemModalVisible(false);
    } else if (type === 'freebie') {
      setFreebieModalVisible(false);
    } else if (type === 'print') {
      setPrintModalVisible(false);
    }
  }
  const reload = (type) => {
    if (type === 'main') {
      setMainItems([]);
    } else if (type === 'freebie') {
      setFreebies([]);
    } else if (type === 'print') {
      setPrints([]);
    }
  };
  const removeItem = (index, type) => {
    if (type === 'main') {
      setMainItems(mainItems.filter((item) => item !== mainItems[index]));
    } else if (type === 'freebie') {
      setFreebies(freebies.filter((item) => item !== freebies[index]));
    } else if (type === 'print') {
      setPrints(prints.filter((item) => item !== prints[index]));
    }
  };

  useEffect(() => {
    numberCheck(minBuyNumber);
  }, [minBuyNumber]);

  function onChangeNumber(e, type) {
    numberCheck(e.target.value, type);
  }

  const numberCheck = (v, type) => {
    let num = v || 0;
    if (!isFinite(num)) return;
    num = num.toString();

    if (num !== '0' && !num.includes('.')) {
      num = num.replace(/^0+/, '');
    }

    num = Number(num);

    if (type === 'minBuyNumber') {
      setMinBuyNumber(num);
    } else if (type === 'minBuyPrice') {
      setMinBuyPrice({ price: num });
    } else if (type === 'limitNumber') {
      setLimitNumber({ number: num });
    }
  };

  useEffect(() => {
    if (isInfinited === true) {
      setEndDate(null);
    }
  }, [isInfinited]);

  useEffect(() => {
    setCountMainItem(mainItems.length);
  }, [mainItems]);
  useEffect(() => {
    setCountFreebie(freebies.length);
  }, [freebies]);
  useEffect(() => {
    setCountPrint(prints.length);
  }, [prints]);

  return (
    <Container>
      <StepWrapper>
        <VerticalLine />
        <StepOneLabel
          activate={
            stepStatus === 1 ||
            stepStatus === 2 ||
            stepStatus === 3 ||
            stepStatus === 4
          }
        >
          {stepStatus > 1 ? '✔' : '1'}
        </StepOneLabel>
        <br />
        <StepTwoLabel
          activate={stepStatus === 2 || stepStatus === 3 || stepStatus === 4}
        >
          {stepStatus > 2 ? '✔' : '2'}
        </StepTwoLabel>
        <br />
        <StepThreeLabel activate={stepStatus === 3 || stepStatus === 4}>
          {stepStatus > 3 ? '✔' : '3'}
        </StepThreeLabel>
        <br />
        <StepFourLabel activate={stepStatus === 4}>
          {stepStatus > 4 ? '✔' : '4'}
        </StepFourLabel>
      </StepWrapper>
      <Wrapper>
        <EventInfomationWrapper visible={stepStatus > 2}>
          <EventInfomation>
            <EventInfomationText>이벤트명</EventInfomationText>
            {title && title}
          </EventInfomation>
          <EventInfomation>
            <EventInfomationText>본품</EventInfomationText>
            {mainItems && mainItems.join(', ')}
          </EventInfomation>
          <EventInfomation>
            <EventInfomationText>사은품</EventInfomationText>
            {freebies && freebies.join(', ')}
          </EventInfomation>
          <EventInfomation>
            <EventInfomationText>인쇄물</EventInfomationText>
            {prints && prints.join(', ')}
          </EventInfomation>
        </EventInfomationWrapper>
        {stepStatus === 1 && (
          <>
            <SubTitle>이벤트 이름을 입력해주세요</SubTitle>
            <br />
            <Description>
              이미 등록된 이벤트 정보를 수정하고 싶다면 우측 상단의 '불러오기'를
              클릭하세요
            </Description>
            <InputText
              type="text"
              onChange={(e) => {
                onChange(e);
              }}
              value={title}
              placeholder="ex) 어린이날 행사 이벤트"
            />
            <StepButtonWrapper>
              <StepNextButton onClick={setNextStep} disabled={!title}>
                다음
              </StepNextButton>
            </StepButtonWrapper>
          </>
        )}
        {stepStatus === 2 && (
          <>
            <ContentWrapper>
              <LabelWrapper>
                <TextLabel>본품</TextLabel>
                <CountLabel>{countMainItem}</CountLabel>
                <ReloadButton onClick={() => reload('main')}>
                  <AiIcons.AiOutlineReload size="24" color="#a9a9a9" />
                </ReloadButton>
              </LabelWrapper>
              <ItemWrapper>
                {mainItems &&
                  mainItems.map((item, index) => (
                    <Item key={index}>
                      {item}
                      <BsIcons.BsTrash
                        color="#a9a9a9"
                        style={{ float: 'right', cursor: 'pointer' }}
                        onClick={() => removeItem(index, 'main')}
                      />
                    </Item>
                  ))}
                <AddItem
                  onClick={() => {
                    openModal('main');
                  }}
                >
                  + 아이템 추가하기
                </AddItem>
              </ItemWrapper>
              {mainItemModalVisible && (
                <MainItemModalView
                  close={() => {
                    closeModal('main');
                  }}
                  setMainItems={setMainItems}
                />
              )}
            </ContentWrapper>
            <ContentWrapper>
              <LabelWrapper>
                <TextLabel>사은품</TextLabel>
                <CountLabel>{countFreebie}</CountLabel>
                <ReloadButton onClick={() => reload('freebie')}>
                  <AiIcons.AiOutlineReload size="24" color="#a9a9a9" />
                </ReloadButton>
              </LabelWrapper>
              <ItemWrapper>
                {freebies &&
                  freebies.map((item, index) => (
                    <Item key={index}>
                      {item}
                      <BsIcons.BsTrash
                        color="#a9a9a9"
                        style={{ float: 'right', cursor: 'pointer' }}
                        onClick={() => removeItem(index, 'freebie')}
                      />
                    </Item>
                  ))}
                <AddItem
                  onClick={() => {
                    openModal('freebie');
                  }}
                >
                  + 아이템 추가하기
                </AddItem>
              </ItemWrapper>
              {freebieModalVisible && (
                <FreebieModalView
                  close={() => {
                    closeModal('freebie');
                  }}
                  setFreebies={setFreebies}
                />
              )}
            </ContentWrapper>
            <ContentWrapper>
              <LabelWrapper>
                <TextLabel>인쇄물</TextLabel>
                <CountLabel>{countPrint}</CountLabel>
                <ReloadButton onClick={() => reload('print')}>
                  <AiIcons.AiOutlineReload size="24" color="#a9a9a9" />
                </ReloadButton>
              </LabelWrapper>
              <ItemWrapper>
                {prints &&
                  prints.map((item, index) => (
                    <Item key={index}>
                      {item}
                      <BsIcons.BsTrash
                        color="#a9a9a9"
                        style={{ float: 'right', cursor: 'pointer' }}
                        onClick={() => removeItem(index, 'print')}
                      />
                    </Item>
                  ))}
                <AddItem
                  onClick={() => {
                    openModal('print');
                  }}
                >
                  + 아이템 추가하기
                </AddItem>
              </ItemWrapper>
              {printModalVisible && (
                <PrintModalView
                  close={() => {
                    closeModal('print');
                  }}
                  setPrints={setPrints}
                />
              )}
            </ContentWrapper>
            <StepButtonWrapper>
              <StepBackButton onClick={setBackStep}>이전</StepBackButton>
              <StepNextButton
                onClick={setNextStep}
                disabled={
                  !(
                    mainItems.length !== 0 &&
                    freebies.length !== 0 &&
                    prints.length !== 0
                  )
                }
              >
                다음
              </StepNextButton>
            </StepButtonWrapper>
          </>
        )}
        {stepStatus === 3 && (
          <>
            <SubTitle>이벤트 방식</SubTitle>
            <EventWayList>
              <Way>
                <WayText>최소구매개수</WayText>
                <InputNumber
                  type="text"
                  value={minBuyNumber}
                  onChange={(e) => {
                    onChangeNumber(e, 'minBuyNumber');
                  }}
                />
                개
                <WayOption className="placeholder">
                  2개 이상부터 입력해주세요
                </WayOption>
              </Way>
              <Way>
                <WayText>최소구매금액</WayText>
                <InputNumber
                  type="text"
                  value={minBuyPrice.price || ''}
                  onChange={(e) => {
                    onChangeNumber(e, 'minBuyPrice');
                  }}
                  disabled={minBuyPrice.check}
                />
                원
                <WayOption className="checkbox">
                  <input
                    type="checkbox"
                    style={{ marginRight: '10px' }}
                    value={minBuyPrice.check}
                    onChange={() =>
                      setMinBuyPrice({ check: !minBuyPrice.check })
                    }
                  />
                  해당없음
                </WayOption>
              </Way>
              <Way>
                <WayText>한정수량</WayText>
                <InputNumber
                  type="text"
                  value={limitNumber.number || ''}
                  onChange={(e) => {
                    onChangeNumber(e, 'limitNumber');
                  }}
                  disabled={limitNumber.check}
                />
                개
                <WayOption className="checkbox">
                  <input
                    type="checkbox"
                    style={{ marginRight: '10px' }}
                    value={limitNumber.check}
                    onChange={() =>
                      setLimitNumber({ check: !limitNumber.check })
                    }
                  />
                  제한없음
                </WayOption>
              </Way>
            </EventWayList>
            <SubTitle>증정 기간</SubTitle>
            <br />
            <Description>
              설정된 날짜부터 사은품 또는 인쇄물이 제공됩니다.
            </Description>
            <CalenderWrapper>
              <Calender
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat={'yyyy-MM-dd'}
                locale={ko}
              />
              ~
              <Calender
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat={'yyyy-MM-dd'}
                locale={ko}
                disabled={isInfinited}
              />
              <WayOption className="checkbox">
                <input
                  type="checkbox"
                  style={{ marginRight: '10px' }}
                  value={isInfinited}
                  onChange={() => setIsInfinited(!isInfinited)}
                />
                제한없음
              </WayOption>
            </CalenderWrapper>
            <StepButtonWrapper>
              <StepBackButton onClick={setBackStep}>이전</StepBackButton>
              <StepNextButton
                onClick={setNextStep}
                disabled={
                  !(
                    mainItems.length !== 0 &&
                    freebies.length !== 0 &&
                    prints.length !== 0
                  )
                }
              >
                다음
              </StepNextButton>
            </StepButtonWrapper>
          </>
        )}
        {stepStatus === 4 && (
          <>
            <SubTitle>
              이벤트를 진행할 채널을 선택해주세요 (복수선택 가능)
            </SubTitle>
            <StepButtonWrapper>
              <StepBackButton onClick={setBackStep}>이전</StepBackButton>
              <StepNextButton onClick={setNextStep} disabled={true}>
                완료
              </StepNextButton>
            </StepButtonWrapper>
          </>
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
const StepWrapper = styled.div`
  position: absolute;
  top: 80px;
  left: 100px;
  width: 100px;
  height: 400px;
  text-align: center;
`;
const StepOneLabel = styled.div`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  line-height: 30px;
  background-color: ${(props) => (props.activate ? '#228be6' : '#d9d9d9')};
  color: #fff;
  text-align: center;
  margin-bottom: 60px;
`;
const StepTwoLabel = styled.div`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  line-height: 30px;
  background-color: ${(props) => (props.activate ? '#228be6' : '#d9d9d9')};
  color: #fff;
  text-align: center;
  margin-bottom: 60px;
`;
const StepThreeLabel = styled.div`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  line-height: 30px;
  background-color: ${(props) => (props.activate ? '#228be6' : '#d9d9d9')};
  color: #fff;
  text-align: center;
  margin-bottom: 60px;
`;
const StepFourLabel = styled.div`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  line-height: 30px;
  background-color: ${(props) => (props.activate ? '#228be6' : '#d9d9d9')};
  color: #fff;
  text-align: center;
  margin-bottom: 60px;
`;
const VerticalLine = styled.div`
  position: absolute;
  left: 50px;
  width: 1px;
  height: 300px;
  background-color: #a9a9a9;
`;
const Wrapper = styled.div`
  position: relative;
  top: 100px;
  display: inline-block;
  width: 60%;
  text-align: start;
  padding-bottom: 40px;
`;
const SubTitle = styled.div`
  position: relative;
  display: inline-block;
  font-weight: 1000;
  font-size: 25px;
`;
const Description = styled.div`
  position: relative;
  display: inline-block;
  color: #a9a9a9;
`;
const InputText = styled.input`
  all: unset;
  margin-top: 40px;
  position: relative;
  display: block;
  width: 80%;
  border-bottom: 1px solid #a9a9a9;
  padding: 10px 5px;
  font-size: 1rem;
  font-weight: bold;
`;
const StepButtonWrapper = styled.div`
  float: right;
  margin-top: 80px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: 0.2s all;
`;
const StepNextButton = styled.button`
  all: unset;
  width: 40px;
  color: #fff;
  background-color: ${(props) => (props.disabled ? '#d9d9d9' : '#228be6')};
  padding: 0.5rem 2rem;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 2px;
`;
const StepBackButton = styled.button`
  all: unset;
  margin-right: 20px;
  width: 40px;
  border: 1px solid #a9a9a9;
  color: #000;
  background-color: #fff;
  padding: 0.5rem 2rem;
  cursor: pointer;
  border-radius: 2px;
`;
const ContentWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 3%;
  width: 30%;
  height: 500px;
  background-color: #eff3ff;
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
const AddItem = styled.li`
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  background-color: #c6d3ff;
  color: #7f7f7f;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
`;
const Item = styled.li`
  width: 100%;
  height: 40px;
  /* line-height: 40px; */
  border-radius: 5px;
  background-color: #fff;
  color: #000;
  margin-bottom: 10px;
  border: 1px solid #f3f3f3;
  border-radius: 5px;
  box-shadow: rgb(235 235 235) 3px 3px 5px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
`;
const ReloadButton = styled.div`
  position: relative;
  float: right;
  cursor: pointer;
`;

const EventWayList = styled.ul`
  margin: 30px 0 100px;
  list-style: none;
`;
const Way = styled.li`
  margin-bottom: 15px;
  padding-left: 15px;
  font-size: 15px;
  font-weight: bold;
`;
const WayText = styled.div`
  position: relative;
  display: inline-block;
  width: 150px;
`;
const InputNumber = styled.input`
  all: unset;
  position: relative;
  display: inline-block;
  margin: 0 10px 0 40px;
  width: 120px;
  height: 1rem;
  background-color: #e9e9e9;
  padding: 10px 5px;
  font-size: 1rem;
  font-weight: bold;
  text-align: right;
`;
const WayOption = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 20px;
  &.placeholder {
    color: #a9a9a9;
    font-size: 14px;
    font-weight: normal;
  }
  &.checkbox {
    font-size: 14px;
    font-weight: normal;
  }
`;
const CalenderWrapper = styled.div`
  position: relative;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  .react-datepicker-wrapper {
    margin: 0 15px;
    display: inline-block;
  }
`;
const Calender = styled(DatePicker)`
  all: unset;
  padding: 5px 10px;
  border: 1px solid #d9d9d9;
`;
const EventInfomationWrapper = styled.ul`
  position: absolute;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  top: -5vw;
  left: 50vw;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #a9a9a9;
  list-style: none;
  padding: 20px;
`;
const EventInfomation = styled.li`
  padding: 5px 0;
  font-size: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const EventInfomationText = styled.div`
  position: relative;
  display: inline-block;
  width: 100px;
  font-weight: bold;
`;
export default EventRegistration;
