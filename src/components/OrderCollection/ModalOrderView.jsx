import React, { useState } from 'react';
import styled from 'styled-components';
import * as GoIcons from 'react-icons/go';
import { Button } from 'antd';
import { InputWithLabel } from '../Auth';
import validateSabangnet from 'lib/validateSabangnet';
import useForm from 'lib/useForm';
import { postSabangnetData } from '../../http-api';

function ModalOrderView(props) {
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);

  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { sabangnetKey: '', sabangnetId: '', groupId: 1 },
    onSubmit: (values) => {
      postSabangnetDatas(values);
    },
    validate: validateSabangnet,
  });
  const postSabangnetDatas = async (row) => {
    const response = await postSabangnetData(row);

    try {
      if (response.status === 200) {
        props.checkSabangnetOrder();
      } else alert('데이터를 등록해주세요.');
    } catch (err) {
      alert('데이터를 불러올 수 없습니다.');
    }
  };

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
            <Title>모두 체크해야 변환된 주문서를 받을 수 있습니다</Title>
            <ContentWrapper>
              <Content>
                <CheckedIcon
                  size="20"
                  className="one"
                  onClick={() => clickCheckedIcon('one')}
                  checked={checkedOne}
                />
                <label onClick={() => clickCheckedIcon('one')}>
                  주문수집 사이트에서 주문서를 수집했나요?
                </label>
              </Content>
              <Content>
                <CheckedIcon
                  size="20"
                  className="two"
                  onClick={() => clickCheckedIcon('two')}
                  checked={checkedTwo}
                />
                <label onClick={() => clickCheckedIcon('two')}>
                  모든 주문이 매핑되어 있나요?
                </label>
              </Content>
            </ContentWrapper>
            <TransformButton
              onClick={props.checkSabangnetOrder}
              disabled={!(checkedOne && checkedTwo)}
            >
              변환하기
            </TransformButton>
          </>
        ) : props.step === 1 ? (
          <>
            <Title>
              {props.progressStep < 4
                ? '주문서를 변환 중 입니다'
                : '변환이 완료되었습니다'}
            </Title>
            <SubTitle>
              {props.progressStep < 4
                ? '잠시만 기다려주세요'
                : '주문서를 다운로드 해주세요'}
            </SubTitle>
            <StepTwoWrapper>
              <ProgressWrap>
                <Progress progressStep={props.progressStep >= 0}>
                  ●<div className="Text">주문대기</div>
                </Progress>
                <Line progressStep={props.progressStep >= 0} />
                <Progress progressStep={props.progressStep >= 1}>
                  ●<div className="Text">주문수집</div>
                </Progress>
                <Line progressStep={props.progressStep >= 1} />
                <Progress progressStep={props.progressStep >= 2}>
                  ●<div className="Text">주문확인</div>
                </Progress>
                <Line progressStep={props.progressStep >= 2} />
                <Progress progressStep={props.progressStep >= 3}>
                  ●<div className="Text">이벤트 적용</div>
                </Progress>
                <Line progressStep={props.progressStep >= 3} />
                <Progress progressStep={props.progressStep >= 4}>
                  ●<div className="Text">완료</div>
                </Progress>
              </ProgressWrap>
              <DownloadButton
                onClick={props.orderDownload}
                disabled={props.progressStep !== 4}
              >
                주문서 다운로드
              </DownloadButton>
            </StepTwoWrapper>
          </>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <InputWithLabel
              type="text"
              label="주문수집 사이트 Key"
              name="sabangnetKey"
              placeholder="주문수집 사이트 키를 입력하세요"
              value={values.sabangnetKey}
              onChange={handleChange}
            />
            {errors.sabangnetKey && (
              <span className="errorMessage">{errors.sabangnetKey}</span>
            )}
            <InputWithLabel
              type="text"
              label="주문수집 사이트 ID"
              name="sabangnetId"
              placeholder="주문수집 사이트 ID를 입력하세요"
              value={values.sabangnetId}
              onChange={handleChange}
            />
            {errors.sabangnetId && (
              <span className="errorMessage">{errors.sabangnetId}</span>
            )}
            <button
              style={{ display: 'none' }}
              id="submit"
              type="submit"
              disabled={submitting}
            >
              완료
            </button>
          </form>
        )}
        <ButtonWrapper>
          <CancelButton className="close" onClick={props.closeModal}>
            취소
          </CancelButton>
          {props.step === 2 && (
            <CompleteButtonLabel disabled={submitting} htmlFor="submit">
              완료
            </CompleteButtonLabel>
          )}
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
const CompleteButtonLabel = styled.label`
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
  margin: 0 auto;
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
export default ModalOrderView;
