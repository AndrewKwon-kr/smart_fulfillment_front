import React, { useState } from 'react';
import styled from 'styled-components';
import * as GoIcons from 'react-icons/go';
import { Button } from 'antd';

function ModalTrackingView(props) {
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const clickCheckedIcon = (type) => {
    if (type === 'one') {
      setCheckedOne(!checkedOne);
    } else if (type === 'two') {
      setCheckedTwo(!checkedTwo);
    }
  };
  return (
    <Modal>
      <ModalContainer>
        {props.step === 0 ? (
          <>
            <Title>변환된 주문서를 업로드 해주세요</Title>
            <ContentWrapper>
              <Content>
                <CheckedIcon
                  size="20"
                  className="one"
                  onClick={() => clickCheckedIcon('one')}
                  checked={checkedOne}
                />
                <label onClick={() => clickCheckedIcon('one')}>
                  주문서(엑셀파일)가 택배사의 형식과 동일한가요?
                </label>
              </Content>
              {/* <Content>
                <CheckedIcon
                  size="20"
                  className="two"
                  onClick={() => clickCheckedIcon('two')}
                  checked={checkedTwo}
                />
                <label onClick={() => clickCheckedIcon('two')}></label>
              </Content> */}
            </ContentWrapper>
            <TransformButton
              onClick={props.uploadExcel}
              disabled={checkedOne}
              // disabled={!(checkedOne && checkedTwo)}
            >
              업로드
            </TransformButton>
          </>
        ) : (
          <>
            <Title>
              {props.progressStep < 3
                ? '송장을 업로드 중 입니다'
                : '업로드가 완료되었습니다'}
            </Title>
            <SubTitle>
              {props.progressStep < 3
                ? '잠시만 기다려주세요'
                : '송장을 다운로드 해주세요'}
            </SubTitle>
            <StepTwoWrapper>
              <ProgressWrap>
                <Progress progressStep={props.progressStep >= 0}>
                  ●<div className="Text">송장번호 매핑</div>
                </Progress>
                <Line progressStep={props.progressStep >= 0} />
                <Progress progressStep={props.progressStep >= 1}>
                  ●<div className="Text">사방넷 송장 업로드</div>
                </Progress>
                <Line progressStep={props.progressStep >= 1} />
                <Progress progressStep={props.progressStep >= 2}>
                  ●<div className="Text">출고대기</div>
                </Progress>
                <Line progressStep={props.progressStep >= 2} />
                <Progress progressStep={props.progressStep >= 3}>
                  ●<div className="Text">완료</div>
                </Progress>
              </ProgressWrap>
              <DownloadButton
                onClick={() => props.setIsTrackingConfirm(true)}
                disabled={props.progressStep !== 3}
              >
                송장 다운로드
              </DownloadButton>
            </StepTwoWrapper>
          </>
        )}
        <ButtonWrapper>
          <CancelButton className="close" onClick={props.closeModal}>
            취소
          </CancelButton>
        </ButtonWrapper>
      </ModalContainer>
    </Modal>
  );
}
const Modal = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000080;
  align-items: center;
  z-index: 9999;
`;
const ModalContainer = styled.div`
  padding: 35px 25px;
  display: block;
  background-color: #fff;
  width: 700px;
  height: 300px;
  border-radius: 10px;
  text-align: center;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 15px;
`;
const SubTitle = styled.div`
  margin-top: 5px;
  font-size: 13px;
  color: #a1a1a1;
`;
const ContentWrapper = styled.div`
  margin: 40px auto 20px;
  padding: 0 40px;
`;
const StepTwoWrapper = styled.div`
  margin: 40px auto 0px;
`;
const ProgressWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Progress = styled.div`
  font-size: 10px;
  color: ${(props) => (props.progressStep ? '#228be6' : '#a1a1a1')};
  .Text {
    margin-top: 5px;
    font-size: 14px;
    font-weight: bold;
  }
`;
const Line = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  width: 10%;
  height: 1px;
  margin-top: -25px;
  overflow-x: visible;
  background-color: ${(props) => (props.progressStep ? '#228be6' : '#a1a1a1')};
`;
const Content = styled.div`
  margin-bottom: 20px;
  text-align: left;
  display: flex;
`;
const ButtonWrapper = styled.div`
  margin-top: 20px;
  float: right;
`;
const CancelButton = styled.button`
  all: unset;
  margin-left: 10px;
  display: inline-block;
  color: #a1a1a1;
  background-color: #fff;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  border-radius: 4px;
  text-decoration: none;
  font-size: 12px;
  transition: 0.2s all;

  &:hover {
    color: #228be6;
  }
`;

const TransformButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  margin: 40px auto;
  padding: 5px 30px;
  border-radius: 5px;
  border: ${(props) =>
    props.disabled ? '1px solid #e1e1e1' : '1px solid #228be6'};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  color: ${(props) => (props.disabled ? '#a1a1a1' : '#fff')};
  background-color: ${(props) => (props.disabled ? '#fff' : '#228be6')};
`;
const CheckedIcon = styled(GoIcons.GoCheck)`
  margin-right: 20px;

  cursor: pointer;
  &.one {
    color: ${(props) => (props.checked ? '#228be6' : '#e1e1e1')};
  }
  &.two {
    color: ${(props) => (props.checked ? '#228be6' : '#e1e1e1')};
  }
`;
const DownloadButton = styled(Button)`
  margin-top: 40px;
`;
export default ModalTrackingView;
