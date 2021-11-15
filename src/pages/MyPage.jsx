import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import useForm from 'lib/useForm';
import { InputWithLabel } from '../components/Auth';
import { postSabangnetData, getMyInfo } from '../http-api';
import validateSabangnet from '../lib/validateSabangnet';

export default function MyPage() {
  // const user = useSelector((state) => state.user);
  const [Info, setInfo] = useState({});

  // const { token } = user;
  const user = {
    id: 0,
    teamName: 'IT',
    teamCode: 'HJD038CED',
    teamId: 0,
    sabangnetId: null,
    sabangnetKey: null,
  };

  const asyncInfo = async () => {
    try {
      const email = { email: localStorage.getItem('email') };
      const infoData = await getMyInfo(email);
      console.log(infoData);
      setInfo(infoData);
    } catch (error) {
      setInfo({});
    }
  };

  useEffect(() => {
    asyncInfo();
  }, []);

  return (
    <Container>
      <Body>
        <RightSection>
          <MyInfo Info={Info} asyncInfo={asyncInfo} user={user} />
        </RightSection>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  margin-left: 150px;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;

  min-height: 73vh;
`;

const RightSection = styled.section`
  margin-left: 3em;

  display: flex;
  flex-direction: column;
  flex: 1;
`;

const InfoTitle = styled.div`
  display: flex;
  padding-left: 5px;
  padding-bottom: 3px;

  margin-top: 4em;
  margin-left: 3em;

  font-size: 1.5em;
  font-weight: 600;

  border-bottom: 2px solid gray;
`;

function MyInfo({ Info, asyncInfo, user }) {
  // const user = useSelector((state) => state.user);

  const [inputMode, setInputMode] = useState(0);
  const [teamInput, setTeamInput] = useState('');
  // const [sabangnetInfo, setSabangnetInfo] = useState({
  //   sabangnetId: user.sabangnetId,
  //   sabangnetKey: user.sabangnetKey,
  // });
  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { sabangnetKey: '', sabangnetId: '', groupId: 2 },
    onSubmit: (values) => {
      postSabangnetDatas(values);
    },
    validate: validateSabangnet,
  });
  const postSabangnetDatas = async (row) => {
    const response = await postSabangnetData(row);

    try {
      if (response.status === 200) {
        if (response.data.code === 201) {
          console.log(response);
          window.location.reload();
        }
      } else alert('데이터를 등록해주세요.');
    } catch (err) {
      alert('데이터를 불러올 수 없습니다.');
    }
  };

  const initInput = () => {
    setInputMode(0);
    setTeamInput('');
    window.location.reload();
  };

  function addTeam(token, body = {}) {
    if (!token) {
      throw new Error('no token');
    }

    return axios
      .post(`https://api2fulfillment.sellha.kr/team`, body, {
        headers: { authorization: token },
      })
      .then((res) => res.data);
  }

  // body = { teamCode }
  function requestJoinTeam(token, body = {}) {
    if (!token) {
      throw new Error('no token');
    }

    return axios
      .post(`https://api2fulfillment.sellha.kr/request-join-team`, body, {
        headers: { authorization: token },
      })
      .then((res) => res.data);
  }
  function removeUserTeam(token, teamId, userId) {
    if (!token) {
      throw new Error('no token');
    }

    return axios
      .delete(
        `https://api2fulfillment.sellha.kr/team/${teamId}/user/${userId}`,
        {
          headers: { authorization: token },
        }
      )
      .then((res) => res.data);
  }

  return (
    <MyInfoDiv>
      <InfoTitle>내 정보</InfoTitle>
      <MyInfoContent>
        <LabelDiv>
          <NameDiv>이름</NameDiv>
          <UserDiv>{Info.userName}</UserDiv>
        </LabelDiv>
        <LabelDiv>
          <NameDiv>휴대폰번호</NameDiv>
          <UserDiv>{Info.userPhone}</UserDiv>
        </LabelDiv>
        <LabelDiv>
          <NameDiv>이메일</NameDiv>
          <UserDiv>{Info.userEmail}</UserDiv>
        </LabelDiv>
        <LabelDiv>
          <NameDiv>비밀번호</NameDiv>
          <UserDiv>*********</UserDiv>
        </LabelDiv>
        {user.teamName && (
          <LabelDiv>
            <NameDiv>계정 상태</NameDiv>
            <UserDiv>{user.teamName}팀 소속</UserDiv>
            <ButtonTeam
              onClick={() => {
                alert(user.teamCode);
              }}
            >
              팀 코드
            </ButtonTeam>
            <ButtonTeam
              onClick={() => {
                removeUserTeam(user.token, user.teamId, user.id)
                  .then(() => {
                    initInput();
                    alert('삭제되었습니다');
                  })
                  .catch(() => alert('삭제 실패'));
              }}
            >
              팀 삭제
            </ButtonTeam>
          </LabelDiv>
        )}
        {!user.teamId && (
          <LabelDiv>
            <NameDiv>계정 상태</NameDiv>
            {!inputMode && (
              <>
                <UserDiv>개인 계정</UserDiv>
                <ButtonTeam
                  onClick={() => {
                    setInputMode(1);
                  }}
                >
                  팀 생성
                </ButtonTeam>
                <ButtonTeam
                  onClick={() => {
                    setInputMode(2);
                  }}
                >
                  팀 등록
                </ButtonTeam>
              </>
            )}
            {inputMode !== 0 && (
              <>
                <Input
                  style={{ display: 'flex', flex: 0.2 }}
                  value={teamInput}
                  onChange={(e) => setTeamInput(e.target.value)}
                  placeholder={
                    inputMode === 1
                      ? '팀명을 입력하세요.'
                      : '팀 코드를 입력하세요.'
                  }
                />
                <ButtonTeam
                  onClick={() => {
                    if (inputMode === 1) {
                      addTeam(user.token, { teamName: teamInput })
                        .then(() => {
                          alert('팀이 생성되었습니다.');
                          initInput();
                          asyncInfo();
                        })
                        .catch(() => {
                          alert('생성 실패');
                        });
                    } else if (inputMode === 2) {
                      requestJoinTeam(user.token, { teamCode: teamInput })
                        .then(() => {
                          alert('팀이 등록되었습니다.');
                          initInput();
                          asyncInfo();
                        })
                        .catch(() => {
                          alert('등록 실패');
                        });
                    }
                  }}
                >
                  확인
                </ButtonTeam>
                <ButtonTeam
                  onClick={() => {
                    initInput();
                  }}
                >
                  취소
                </ButtonTeam>
              </>
            )}
          </LabelDiv>
        )}
      </MyInfoContent>
      <InfoTitle>사방넷 ID & Key</InfoTitle>
      <MyInfoContent>
        {Info.userGroupSabangnetId !== null ? (
          <>
            <LabelDiv>
              <NameDiv>사방넷 ID</NameDiv>
              <UserDiv>{Info.userGroupSabangnetId}</UserDiv>
            </LabelDiv>
            <LabelDiv>
              <NameDiv>사방넷 Key</NameDiv>
              <UserDiv>{Info.userGroupSabangnetKey}</UserDiv>
            </LabelDiv>
          </>
        ) : (
          <LabelDiv>
            <form onSubmit={handleSubmit} noValidate>
              <InputWithLabel
                type="text"
                label="사방넷 ID"
                name="sabangnetId"
                placeholder="사방넷 ID를 입력하세요"
                value={values.sabangnetId}
                onChange={handleChange}
              />
              {errors.sabangnetId && (
                <span className="errorMessage">{errors.sabangnetId}</span>
              )}
              <InputWithLabel
                type="text"
                label="사방넷 Key"
                name="sabangnetKey"
                placeholder="사방넷 키를 입력하세요"
                value={values.sabangnetKey}
                onChange={handleChange}
              />
              {errors.sabangnetKey && (
                <span className="errorMessage">{errors.sabangnetKey}</span>
              )}

              <button
                style={{ display: 'none' }}
                id="submit"
                type="submit"
                disabled={submitting}
              ></button>
              <CompleteButtonLabel disabled={submitting} htmlFor="submit">
                등록
              </CompleteButtonLabel>
            </form>
          </LabelDiv>
        )}
      </MyInfoContent>
    </MyInfoDiv>
  );
}

const MyInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const MyInfoContent = styled.div`
  margin-left: 7em;
  margin-top: 1em;

  font-size: 1em;
`;

const LabelDiv = styled.div`
  display: flex;
  margin-top: 1em;
`;

const NameDiv = styled.div`
  width: 10em;
`;

const UserDiv = styled.div`
  margin-left: 1em;
`;

const ButtonTeam = styled(Button)`
  border-radius: 10px;
  margin-top: -3px;
  margin-left: 10px;
`;
const CompleteButtonLabel = styled.label`
  all: unset;
  margin: 20px auto;
  display: flex;
  color: #a1a1a1;
  background-color: #fff;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  text-decoration: none;
  font-size: 12px;
  justify-content: center;
  transition: 0.2s all;

  &:hover {
    color: #228be6;
    border-color: #228be6;
  }
`;
