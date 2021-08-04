import React, { useState } from 'react';
import styled from 'styled-components';
import * as AiIcons from 'react-icons/ai';
import {
  MainItemModalView,
  FreebieModalView,
  PrintModalView,
} from 'components/EventRegistration';

function EventRegistration() {
  const [title, setTitle] = useState('');
  const [stepStatus, setStepStatus] = useState(2);
  const [count, setCount] = useState(0);
  const [mainItemModalVisible, setMainItemModalVisible] = useState(false);
  const [freebieModalVisible, setFreebieModalVisible] = useState(false);
  const [printModalVisible, setPrintModalVisible] = useState(false);

  const onChange = (e) => {
    setTitle(e.target.value);
  };
  const setNextStep = () => {
    setStepStatus(2);
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
  console.log(mainItemModalVisible);
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
          1
        </StepOneLabel>
        <br />
        <StepTwoLabel
          activate={stepStatus === 2 || stepStatus === 3 || stepStatus === 4}
        >
          2
        </StepTwoLabel>
        <br />
        <StepThreeLabel activate={stepStatus === 3 || stepStatus === 4}>
          3
        </StepThreeLabel>
        <br />
        <StepFourLabel activate={stepStatus === 4}>4</StepFourLabel>
      </StepWrapper>
      <Wrapper>
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
            <Step1NextButton onClick={setNextStep} disabled={!title}>
              다음
            </Step1NextButton>
          </>
        )}
        {stepStatus === 2 && (
          <>
            <ContentWrapper>
              <LabelWrapper>
                <TextLabel>본품</TextLabel>
                <CountLabel>{count}</CountLabel>
                <ReloadButton>
                  <AiIcons.AiOutlineReload size="24" color="#a9a9a9" />
                </ReloadButton>
              </LabelWrapper>
              <ItemWrapper>
                <Item
                  onClick={() => {
                    openModal('main');
                  }}
                >
                  + 아이템 추가하기
                </Item>
              </ItemWrapper>
              {mainItemModalVisible && (
                <MainItemModalView
                  close={() => {
                    closeModal('main');
                  }}
                />
              )}
            </ContentWrapper>
            <ContentWrapper>
              <LabelWrapper>
                <TextLabel>사은품</TextLabel>
                <CountLabel>{count}</CountLabel>
                <ReloadButton>
                  <AiIcons.AiOutlineReload size="24" color="#a9a9a9" />
                </ReloadButton>
              </LabelWrapper>
              <ItemWrapper>
                <Item
                  onClick={() => {
                    openModal('freebie');
                  }}
                >
                  + 아이템 추가하기
                </Item>
              </ItemWrapper>
              {freebieModalVisible && (
                <FreebieModalView
                  close={() => {
                    closeModal('freebie');
                  }}
                />
              )}
            </ContentWrapper>
            <ContentWrapper>
              <LabelWrapper>
                <TextLabel>인쇄물</TextLabel>
                <CountLabel>{count}</CountLabel>
                <ReloadButton>
                  <AiIcons.AiOutlineReload size="24" color="#a9a9a9" />
                </ReloadButton>
              </LabelWrapper>
              <ItemWrapper>
                <Item
                  onClick={() => {
                    openModal('print');
                  }}
                >
                  + 아이템 추가하기
                </Item>
              </ItemWrapper>
              {printModalVisible && (
                <PrintModalView
                  close={() => {
                    closeModal('print');
                  }}
                />
              )}
            </ContentWrapper>
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
const SubTitle = styled.h2`
  position: relative;
  display: inline-block;
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
const Step1NextButton = styled.button`
  all: unset;
  margin-top: 80px;
  float: right;
  width: 40px;
  font-weight: 600;
  color: #fff;
  background-color: ${(props) => (props.disabled ? '#d9d9d9' : '#228be6')};
  padding: 0.5rem 2rem;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 2px;
  text-align: center;
  text-decoration: none;
  transition: 0.2s all;
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
const Item = styled.li`
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
const ReloadButton = styled.div`
  position: relative;
  float: right;
`;

export default EventRegistration;
