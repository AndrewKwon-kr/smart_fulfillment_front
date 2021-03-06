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
      } else alert('???????????? ??????????????????.');
    } catch (err) {
      alert('???????????? ????????? ??? ????????????.');
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
      <InfoTitle>??? ??????</InfoTitle>
      <MyInfoContent>
        <LabelDiv>
          <NameDiv>??????</NameDiv>
          <UserDiv>{Info.userName}</UserDiv>
        </LabelDiv>
        <LabelDiv>
          <NameDiv>???????????????</NameDiv>
          <UserDiv>{Info.userPhone}</UserDiv>
        </LabelDiv>
        <LabelDiv>
          <NameDiv>?????????</NameDiv>
          <UserDiv>{Info.userEmail}</UserDiv>
        </LabelDiv>
        <LabelDiv>
          <NameDiv>????????????</NameDiv>
          <UserDiv>*********</UserDiv>
        </LabelDiv>
        {user.teamName && (
          <LabelDiv>
            <NameDiv>?????? ??????</NameDiv>
            <UserDiv>{user.teamName}??? ??????</UserDiv>
            <ButtonTeam
              onClick={() => {
                alert(user.teamCode);
              }}
            >
              ??? ??????
            </ButtonTeam>
            <ButtonTeam
              onClick={() => {
                removeUserTeam(user.token, user.teamId, user.id)
                  .then(() => {
                    initInput();
                    alert('?????????????????????');
                  })
                  .catch(() => alert('?????? ??????'));
              }}
            >
              ??? ??????
            </ButtonTeam>
          </LabelDiv>
        )}
        {!user.teamId && (
          <LabelDiv>
            <NameDiv>?????? ??????</NameDiv>
            {!inputMode && (
              <>
                <UserDiv>?????? ??????</UserDiv>
                <ButtonTeam
                  onClick={() => {
                    setInputMode(1);
                  }}
                >
                  ??? ??????
                </ButtonTeam>
                <ButtonTeam
                  onClick={() => {
                    setInputMode(2);
                  }}
                >
                  ??? ??????
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
                      ? '????????? ???????????????.'
                      : '??? ????????? ???????????????.'
                  }
                />
                <ButtonTeam
                  onClick={() => {
                    if (inputMode === 1) {
                      addTeam(user.token, { teamName: teamInput })
                        .then(() => {
                          alert('?????? ?????????????????????.');
                          initInput();
                          asyncInfo();
                        })
                        .catch(() => {
                          alert('?????? ??????');
                        });
                    } else if (inputMode === 2) {
                      requestJoinTeam(user.token, { teamCode: teamInput })
                        .then(() => {
                          alert('?????? ?????????????????????.');
                          initInput();
                          asyncInfo();
                        })
                        .catch(() => {
                          alert('?????? ??????');
                        });
                    }
                  }}
                >
                  ??????
                </ButtonTeam>
                <ButtonTeam
                  onClick={() => {
                    initInput();
                  }}
                >
                  ??????
                </ButtonTeam>
              </>
            )}
          </LabelDiv>
        )}
      </MyInfoContent>
      <InfoTitle>???????????? ????????? ID & Key</InfoTitle>
      <MyInfoContent>
        {Info.userGroupSabangnetId !== null ? (
          <>
            <LabelDiv>
              <NameDiv>???????????? ????????? ID</NameDiv>
              <UserDiv>{Info.userGroupSabangnetId}</UserDiv>
            </LabelDiv>
            <LabelDiv>
              <NameDiv>???????????? ????????? Key</NameDiv>
              <UserDiv>{Info.userGroupSabangnetKey}</UserDiv>
            </LabelDiv>
          </>
        ) : (
          <LabelDiv>
            <form onSubmit={handleSubmit} noValidate>
              <InputWithLabel
                type="text"
                label="???????????? ????????? ID"
                name="sabangnetId"
                placeholder="???????????? ????????? ID??? ???????????????"
                value={values.sabangnetId}
                onChange={handleChange}
              />
              {errors.sabangnetId && (
                <span className="errorMessage">{errors.sabangnetId}</span>
              )}
              <InputWithLabel
                type="text"
                label="???????????? ????????? Key"
                name="sabangnetKey"
                placeholder="???????????? ????????? ?????? ???????????????"
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
                ??????
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
