import React, { useState, useEffect } from 'react';
import { RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Search } from '../components/ChannelRegistration';
import { getSabangnetChannelList } from '../http-api';
import { Button, Checkbox, Input, Spin, Row, Col } from 'antd';
import * as BsIcons from 'react-icons/bs';

function ChannelRegistration() {
  const [loading, setLoading] = useState(true);
  const [sabangnetChannels, setSabangnetChannel] = useState();
  const [mappingChannels, setMappingChannel] = useState();
  const [userInput, setUserInput] = useState('');
  const [searchedSabangnetChannel, setSearchedSabangnetChannel] =
    useState(sabangnetChannels);
  const [searchedMappingChannel, setSearchedMappingChannel] = useState();

  const [mappingName, setMappingName] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
  };
  const handleClick = (type) => {
    if (type === 'sabangnet') {
      setSearchedSabangnetChannel(
        sabangnetChannels.filter((channel) => channel.name.includes(userInput))
      );
    } else {
      setSearchedMappingChannel(
        mappingChannels.filter((channel) => channel.name.includes(userInput))
      );
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

  const handdleRegistButton = () => {
    const value = {
      name: mappingName,
      list: searchedSabangnetChannel.filter((channel) => channel.checked),
    };
    console.log(value);
  };
  useEffect(() => {
    const setChannelList = async () => {
      const channelList = await getSabangnetChannelList(1);
      setSabangnetChannel(channelList);
      setSearchedSabangnetChannel(channelList);
      setLoading(false);
    };
    setChannelList();
  }, []);
  useEffect(() => {
    searchedSabangnetChannel &&
      setCheckAll(
        searchedSabangnetChannel.length ===
          searchedSabangnetChannel.filter((channel) => channel.checked).length
      );
  }, [searchedSabangnetChannel]);
  const [checkAll, setCheckAll] = useState(false);
  return (
    <Container>
      <Wrapper>
        <SubTitle>매핑할 판매 채널 이름 등록하기</SubTitle>
        <br />
        <Description>
          사방넷에서 받아온 채널정보를 실제 사용할 이름으로 매핑합니다.
        </Description>
        <br />
        <ChannelWrapper>
          <LeftContent>
            <SubTitle>사방넷 채널</SubTitle>
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
                  {searchedSabangnetChannel.map((channel) => (
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
                  ))}
                </Row>
              )}
            </ChannelListWrapper>
            <Line />
            <InputChannelName
              onChange={onChangeMappingName}
              placeholder="사방넷 채널과 매핑할 채널 이름을 입력하세요"
            />
            <RegistButton onClick={handdleRegistButton}>등록</RegistButton>
          </LeftContent>
          <ButtonWrapper>
            <RightOutlined style={{ fontSize: 48, color: 'grey' }} />
          </ButtonWrapper>
          <RightContent>
            <SubTitle>매핑 내역</SubTitle>
            <Search handleChange={handleChange} handleClick={handleClick} />
            <Line />
            <ItemWrapper>
              <Item>
                {/* {item.image && <ItemImage src={item.image} />} */}
                테스트
                <BsIcons.BsTrash
                  color="#a9a9a9"
                  style={{ float: 'right', cursor: 'pointer' }}
                  // onClick={() => removeItem(index, 'main')}
                />
              </Item>
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
const Spinner = styled(Spin)``;
const InputChannelName = styled(Input)`
  margin: 20px 0;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  height: 10%;
  padding: 20px;
`;
const RegistButton = styled(Button)`
  float: right;
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
`;

const Item = styled.li`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background-color: #eff3ff;
  color: #a1a1a1;
  margin-bottom: 10px;
  border: 1px solid #f3f3f3;
  border-radius: 5px;
  box-shadow: rgb(235 235 235) 3px 3px 5px;
  text-align: center;
  padding: 10px;
`;
export default ChannelRegistration;
