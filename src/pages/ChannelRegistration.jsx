import React, { useState, useEffect } from 'react';
import { RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Search } from '../components/ChannelRegistration';
import {
  getSabangnetChannelList,
  createUserChannel,
  getUserChannel,
  deleteUserChannel,
  registSabangnetChannel,
} from '../http-api';
import { Button, Checkbox, Input, Spin, Row, Col } from 'antd';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import Swal from 'sweetalert2';

function ChannelRegistration() {
  const [loading, setLoading] = useState(true);
  const [registLoading, setRegistLoading] = useState(false);
  const [userChannelLoading, setUserChannelLoading] = useState(true);
  const [sabangnetChannels, setSabangnetChannel] = useState();
  const [mappingChannels, setMappingChannel] = useState();
  const [userInput, setUserInput] = useState('');
  const [searchedSabangnetChannel, setSearchedSabangnetChannel] =
    useState(sabangnetChannels);
  const [searchedMappingChannel, setSearchedMappingChannel] =
    useState(mappingChannels);

  const [mappingName, setMappingName] = useState('');
  const [checkAll, setCheckAll] = useState(false);

  const setSabangnetChannelList = async () => {
    setLoading(true);
    const channelList = await getSabangnetChannelList(1);
    setSabangnetChannel(channelList);
    setSearchedSabangnetChannel(channelList);
    setLoading(false);
  };
  const getUserChannelList = async () => {
    setUserChannelLoading(true);
    const channelList = await getUserChannel(1);
    setMappingChannel(channelList);
    setSearchedMappingChannel(channelList);
    setUserChannelLoading(false);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
  };
  const handleClick = (type) => {
    if (type === 'sabangnet') {
      setSearchResult(sabangnetChannels, type);
    } else {
      setSearchResult(mappingChannels, type);
    }
  };
  const setSearchResult = (channels, type) => {
    const searchResult = channels.filter((channel) => {
      if (type === 'sabangnet') {
        return channel.name.match(new RegExp(userInput, 'i'));
      } else {
        return channel.userChannelName.match(new RegExp(userInput, 'i'));
      }
    });
    if (searchResult.length === 0) {
      Swal.fire({ icon: 'warning', text: '검색결과가 없습니다.' });
      return false;
    } else {
      if (type === 'sabangnet') {
        setSearchedSabangnetChannel(searchResult);
      } else {
        setSearchedMappingChannel(searchResult);
      }
    }
  };

  const onChange = (id, e) => {
    setSearchedSabangnetChannel(
      searchedSabangnetChannel.map((channel) => {
        if (id === channel.id) {
          return { ...channel, checked: e.target.checked };
        }
        return { ...channel };
      })
    );
  };

  const onCheckAllChange = (e) => {
    setSearchedSabangnetChannel(
      searchedSabangnetChannel.map((channel) => {
        return { ...channel, checked: e.target.checked ? true : false };
      })
    );
    setCheckAll(e.target.checked);
  };
  const onChangeMappingName = (e) => {
    const value = e.target.value;
    setMappingName(value);
  };

  const handdleRegistButton = async () => {
    setRegistLoading(true);
    const data = {
      name: mappingName,
      list: searchedSabangnetChannel.filter((channel) => channel.checked),
    };
    if (data.list.length === 0) {
      Swal.fire({
        title: '선택된 채널이 없습니다.',
        text: '채널을 선택해주세요.',
      });
    } else if (mappingName === '') {
      Swal.fire({
        title: '채널이름이 입력되지 않았습니다.',
        text: '채널이름을 입력해주세요.',
      });
    } else if (
      mappingChannels &&
      mappingChannels.filter(
        (channel) => channel.userChannelName === mappingName
      ).length !== 0
    ) {
      Swal.fire({
        title: `'${mappingName}'로 매핑된 채널이 존재합니다`,
        text: `'${mappingName}'에 추가하시겠습니까?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      }).then((result) => {
        if (result.isConfirmed) {
          createUserChannels(data);
        }
      });
    } else {
      createUserChannels(data);
    }
    setRegistLoading(false);
  };
  const createUserChannels = async (data) => {
    const result = await createUserChannel(1, data);
    if (result.data.code === 201) {
      setRegistLoading(false);
      setSabangnetChannelList();
      getUserChannelList();
    } else {
      Swal.fire('오류가 발생했습니다. 다시 시도해주세요.');
      setRegistLoading(false);
    }
  };

  const removeItem = (sabangnetChannelId, userChannelId) => {
    Swal.fire({
      title: 'Delete',
      text: '삭제하시겠습니까?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        setSearchedMappingChannel(
          searchedMappingChannel.filter(
            (channel) => channel.sabangnetChannelId !== sabangnetChannelId
          )
        );
        const data = {
          sabangnetChannelId: sabangnetChannelId,
          userChannelId: userChannelId,
        };
        deleteUserChannels(data);
      }
    });
  };
  const deleteUserChannels = async (data) => {
    const res = await deleteUserChannel(1, data);
    if (res.data.code === 204) {
      setSabangnetChannelList();
      getUserChannelList();
    }
  };
  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      document.getElementById('registBtn').click();
    }
  };
  const importChannel = async () => {
    const res = await registSabangnetChannel(1);
    if (res.status === 200) {
      setSabangnetChannelList();
      getUserChannelList();
    }
  };
  const updateChannel = () => {
    Swal.fire({
      title: '경고',
      text: '기존에 이벤트에 사용했던 채널의 정보가 사라질 수 있습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        importChannel();
      }
    });
  };

  useEffect(() => {
    setSabangnetChannelList();
    getUserChannelList();
  }, []);
  useEffect(() => {
    searchedSabangnetChannel &&
      setCheckAll(
        searchedSabangnetChannel.length ===
          searchedSabangnetChannel.filter((channel) => channel.checked).length
      );
  }, [searchedSabangnetChannel]);

  return (
    <Container>
      <Wrapper>
        <SubTitle>매핑할 판매 채널 이름 등록하기</SubTitle>
        <UpdateButton onClick={updateChannel}>업데이트</UpdateButton>
        <br />
        <Description>
          주문수집 사이트에서 받아온 채널정보를 실제 사용할 이름으로 매핑합니다.
        </Description>
        <br />
        <ChannelWrapper>
          <LeftContent>
            <SubTitle>주문수집 사이트 채널</SubTitle>
            <AllCheckboxWrapper>
              <ACheckbox onChange={onCheckAllChange} checked={checkAll}>
                전체 선택 / 해제
              </ACheckbox>
            </AllCheckboxWrapper>
            <Search
              handleChange={handleChange}
              handleClick={() => handleClick('sabangnet')}
            />
            <ChannelListWrapper loading={loading.toString()}>
              {loading ? (
                <Spinner size="large" tip="데이터를 불러오는 중입니다..." />
              ) : (
                <Row>
                  {sabangnetChannels.length !== 0 ? (
                    searchedSabangnetChannel.map((channel) => (
                      <Col
                        key={channel.id}
                        span={8}
                        style={{ marginBottom: '10px' }}
                      >
                        <ACheckbox
                          onChange={(e) => onChange(channel.id, e)}
                          value={channel}
                          checked={channel.checked}
                        >
                          {channel.name}
                        </ACheckbox>
                      </Col>
                    ))
                  ) : (
                    <Description>
                      주문수집 사이트에서 채널을 불러와주세요{' '}
                      <Button onClick={importChannel}>불러오기</Button>
                    </Description>
                  )}
                </Row>
              )}
            </ChannelListWrapper>
            <Line />
            <InputChannelName
              onChange={onChangeMappingName}
              onKeyUp={handleKeyUp}
              placeholder="주문수집 사이트 채널과 매핑할 채널 이름을 입력하세요"
            />
            <RegistButton
              id="registBtn"
              onClick={handdleRegistButton}
              loading={registLoading}
            >
              {registLoading ? '' : '등록'}
            </RegistButton>
          </LeftContent>
          <ButtonWrapper>
            <RightOutlined style={{ fontSize: 48, color: 'grey' }} />
          </ButtonWrapper>
          <RightContent>
            <SubTitle>매핑 내역</SubTitle>
            <Search handleChange={handleChange} handleClick={handleClick} />
            <Line />
            <ItemWrapper>
              {userChannelLoading ? (
                <Spinner size="large" tip="데이터를 불러오는 중입니다..." />
              ) : mappingChannels.length !== 0 ? (
                searchedMappingChannel.map((channel) => (
                  <Item key={channel.sabangnetChannelId}>
                    <NameSection>{channel.sabangnetChannelName}</NameSection>
                    <BsIcons.BsArrowRight
                      color="#a9a9a9"
                      style={{ position: 'apsolute' }}
                    />
                    <NameSection>{channel.userChannelName}</NameSection>
                    <TrashIcon
                      onClick={() =>
                        removeItem(
                          channel.sabangnetChannelId,
                          channel.userChannelId
                        )
                      }
                    />
                  </Item>
                ))
              ) : (
                <Description>매핑된 채널이 없습니다.</Description>
              )}
            </ItemWrapper>
          </RightContent>
        </ChannelWrapper>
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
const ChannelWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  height: 60vh;
`;
const LeftContent = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  flex: 0.6;
  margin-right: 20px;
  padding: 20px;
`;
const RightContent = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  flex: 0.4;
  margin-left: 20px;
  padding: 20px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ChannelListWrapper = styled.div`
  margin: 20px 0;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  height: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.loading === 'true' ? 'center' : 'flex-start'};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d1d1d1;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 5px;
    box-shadow: inset 0px 0px 5px white;
  }
`;
const Line = styled.div`
  width: calc(100% + 40px);
  margin-left: -20px;
  border-bottom: 1px solid #d1d1d1;
`;
const AllCheckboxWrapper = styled.div`
  /* display: inline-block; */
  float: right;
  color: #e1e1e1;
`;
const ACheckbox = styled(Checkbox)`
  .ant-checkbox + span {
    color: #a1a1a1;
  }
  /* .ant-checkbox-checked + span {
    color: #a1a1a1;
    font-weight: bold;
  } */
`;
const Spinner = styled(Spin)`
  margin-top: 10px;
`;
const InputChannelName = styled(Input)`
  margin: 20px 0;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  height: 10%;
  padding: 20px;
`;
const RegistButton = styled(Button)`
  float: right;
  width: 120px;
  color: white;
  background-color: #228be6;
  padding: 1.2rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ItemWrapper = styled.ul`
  margin-top: 20px;
  position: relative;
  width: 100%;
  text-align: center;
  list-style: none;
  height: 400px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Item = styled.li`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background-color: #eff3ff;
  color: #a1a1a1;
  margin-bottom: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  padding: 10px;
`;
const TrashIcon = styled(AiIcons.AiOutlineClose)`
  color: #a9a9a9;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;
const UpdateButton = styled(Button)`
  float: right;
  margin-top: 40px;
`;
const NameSection = styled.div`
  flex: 0.5;
`;

export default ChannelRegistration;
