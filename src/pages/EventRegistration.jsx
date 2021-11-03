import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import {
  MainItemModalView,
  FreebieModalView,
  PrintModalView,
  SelectChannelButton,
  BesideStoreModalView,
  FreebieInfoModalView,
  ImportModalView,
} from 'components/EventRegistration';
import CompanyShopIcon from 'assets/icon_company_shop.png';
import NaverIcon from 'assets/icon_naver.png';
import BesideShopIcon from 'assets/icon_beside_shop.png';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import axios from 'axios';
import { Button, Spin } from 'antd';
import swal from 'sweetalert';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function EventRegistration() {
  const [title, setTitle] = useState('');
  const [stepStatus, setStepStatus] = useState(1);
  const [stepOneLoading, setStepOneLoading] = useState(false);

  const [countMainItem, setCountMainItem] = useState(0);
  const [countFreebie, setCountFreebie] = useState(0);
  const [countPrint, setCountPrint] = useState(0);

  const [mainLoading, setMainLoading] = useState(false);
  const [freebieLoading, setFreebieLoading] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);

  const [mainItemModalVisible, setMainItemModalVisible] = useState(false);
  const [freebieModalVisible, setFreebieModalVisible] = useState(false);
  const [printModalVisible, setPrintModalVisible] = useState(false);

  const [mainItems, setMainItems] = useState([]);
  const [freebies, setFreebies] = useState([]);
  const [prints, setPrints] = useState([]);

  const [mainItemsData, setMainItemsData] = useState([]);
  const [freebiesData, setFreebiesData] = useState([]);
  const [freebieErpData, setFreebieErpData] = useState([]);
  const [printsData, setPrintsData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [eventData, setEventData] = useState([]);

  const [minBuyNumber, setMinBuyNumber] = useState(0);
  const [minBuyNumberChecked, setMinBuyNumberChecked] = useState(false);
  const [minBuyPrice, setMinBuyPrice] = useState(0);
  const [minBuyPriceChecked, setMinBuyPriceChecked] = useState(false);
  const [limitNumber, setLimitNumber] = useState(0);
  const [limitNumberChecked, setLimitNumberChecked] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [isInfinited, setIsInfinited] = useState(false);
  registerLocale('ko', ko);

  const [clickedCompanyStore, setClickedCompanyStore] = useState(false);
  const [clickedSmartStore, setClickedSmartStore] = useState(false);
  const [clickedBesideStore, setClickedBesideStore] = useState(false);
  const [visibleBesideModal, setVisibleBesideModal] = useState(false);
  const [besideStoreList, setBesideStoreList] = useState([
    { id: 2, name: '지마켓', checked: false },
  ]);

  const [freebieRange, setFreebieRange] = useState(true);
  const [freebieType, setFreebieType] = useState('');
  const [freebieInfoModalVisible, setFreebieInfoModalVisible] = useState(false);
  const [rangeNumber, setRangeNumber] = useState(0);

  const [postLoading, setPostLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [importVisible, setImportVisible] = useState(false);

  const [selectedRows, setSelectedRow] = useState();
  const [selectedRowLoading, setSelectedRowLoading] = useState(false);

  const getMainItemData = async () => {
    const url = `https://api2fulfillment.sellha.kr/itemgroup/items/`;

    setMainLoading(true);
    await axios
      .get(url)
      .then((response) => {
        try {
          if (response.data.result.length !== 0) {
            setMainItemsData(response.data.result);
            setStepOneLoading(false);
            setMainLoading(false);
            openModal('main');
          } else {
            setMainLoading(false);
          }
        } catch (err) {
          alert('데이터를 불러올 수 없습니다.');
          setMainLoading(false);
        }
      })
      .catch(() => {
        alert('error');
        setMainLoading(false);
      });
  };
  const getFreebieData = async () => {
    const url = `https://api2fulfillment.sellha.kr/freebiegroup/freebies/`;

    setFreebieLoading(true);
    await axios
      .get(url)
      .then((response) => {
        try {
          if (response.data.result.length !== 0) {
            setFreebiesData(response.data.result);
          } else {
            console.log(response.status);
          }
        } catch (err) {
          alert('데이터를 불러올 수 없습니다.');
        }
      })
      .catch(() => {
        alert('error');
      });
  };
  const getFreebieErpData = async () => {
    const url = `https://api2fulfillment.sellha.kr/freebiegroup/freebies/is-erp/`;
    setFreebieLoading(true);
    await axios
      .get(url)
      .then((response) => {
        try {
          if (response.data.result.length !== 0) {
            setFreebieErpData(response.data.result);
            openModal('freebie');
            setFreebieLoading(false);
          } else {
            console.log(response.status);
            setFreebieLoading(false);
          }
        } catch (err) {
          setFreebieLoading(false);
          alert('데이터를 불러올 수 없습니다.');
        }
      })
      .catch(() => {
        alert('error');
        setFreebieLoading(false);
      });
  };
  const getPrintData = async () => {
    const url = `https://api2fulfillment.sellha.kr/printgroup/prints/`;

    setPrintLoading(true);
    await axios
      .get(url)
      .then((response) => {
        try {
          if (response.data.result.length !== 0) {
            setPrintsData(response.data.result);
            setPrintLoading(false);
          } else {
            console.log(response.status);
            setPrintLoading(false);
          }
        } catch (err) {
          alert('데이터를 불러올 수 없습니다.');
          setPrintLoading(false);
        }
      })
      .catch(() => {
        alert('error');
        setPrintLoading(false);
      });
  };
  const getBrandData = async () => {
    const url = `https://api2fulfillment.sellha.kr/brand/itemgroups/items1/`;
    await axios.get(url).then((response) => {
      setBrandData(response.data.result);
    });
  };
  const getImportData = () => {
    const url = `https://api2fulfillment.sellha.kr/event/`;
    setImportLoading(true);
    setMainLoading(true);
    axios
      .get(url)
      .then((response) => {
        try {
          if (response.data.result) {
            setEventData(response.data.result);
            setImportLoading(false);
            setMainLoading(false);
            openModal('import');
          } else {
            console.log(response.status);
            setImportLoading(false);
            setMainLoading(false);
            alert('데이터를 등록해주세요');
          }
        } catch (err) {
          setImportLoading(false);
          setMainLoading(false);
          alert('데이터를 불러올 수 없습니다.');
        }
      })
      .catch(() => {
        setImportLoading(false);
        setMainLoading(false);
        alert('error');
      });
  };
  const getEventData = () => {
    const url = `https://api2fulfillment.sellha.kr/event/${selectedRows[0].id}/`;
    setSelectedRowLoading(true);
    axios
      .get(url)
      .then((response) => {
        try {
          if (response.data.result) {
            setSelectedRowLoading(false);

            closeModal('import');
            const data = response.data.result;
            importData(data);
          } else {
            console.log(response.status);
            alert('데이터를 등록해주세요');
            setSelectedRowLoading(false);
            closeModal('import');
          }
        } catch (err) {
          alert('데이터를 불러올 수 없습니다.');
          setSelectedRowLoading(false);
          closeModal('import');
        }
      })
      .catch(() => {
        alert('error');
        setSelectedRowLoading(false);
        closeModal('import');
      });
  };

  const onChange = (e) => {
    setTitle(e.target.value);
  };
  const setNextStep = () => {
    if (stepStatus === 1) {
      setStepOneLoading(true);
      setTimeout(() => {
        setStepOneLoading(false);
      }, 2000);
      setStepStatus(stepStatus + 1);
    } else if (stepStatus === 4) {
      postEventData();
      enterLoading();
    } else setStepStatus(stepStatus + 1);
  };
  const setBackStep = () => {
    setStepStatus(stepStatus - 1);
  };
  const openModal = (type) => {
    if (type === 'main') {
      setMainItemModalVisible(true);
    } else if (type === 'freebie') {
      setFreebieModalVisible(true);
    } else if (type === 'print') {
      setPrintModalVisible(true);
    } else if (type === 'freebieInfo') {
      setFreebieInfoModalVisible(true);
    } else if (type === 'import') {
      setImportVisible(true);
    }
  };
  function closeModal(type) {
    if (type === 'main') {
      setMainItemModalVisible(false);
    } else if (type === 'freebie') {
      setFreebieModalVisible(false);
    } else if (type === 'print') {
      setPrintModalVisible(false);
    } else if (type === 'freebieInfo') {
      setFreebieInfoModalVisible(false);
      setRangeNumber(0);
      setFreebieType('');
      setFreebieRange('');
    } else if (type === 'import') {
      setImportVisible(false);
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
    } else if (type === 'all') {
      setMainItems([]);
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
      if (num < 2) {
        num = 2;
      }
      setMinBuyNumber(num);
    } else if (type === 'minBuyPrice') {
      setMinBuyPrice(num);
    } else if (type === 'limitNumber') {
      setLimitNumber(num);
    } else if (type === 'range') {
      setRangeNumber(num);
    }
  };

  const onChangeBesideStore = (e, index) => {
    setBesideStoreList(
      besideStoreList.map((store) => {
        if (store.id !== index) {
          return store;
        } else {
          return { ...store, checked: e.target.checked };
        }
      })
    );
  };
  const selectedBesideStore = () => {
    const selectedBesideStore = besideStoreList.filter(
      (store) => store.checked === true
    );
    setClickedBesideStore(!clickedBesideStore);

    const flag = selectedBesideStore.length !== 0;
    setVisibleBesideModal(flag);
  };
  const allSelectedBesideStore = (isAllChecked) => {
    setBesideStoreList(
      besideStoreList.map((store) => {
        return { ...store, checked: isAllChecked ? true : false };
      })
    );
  };
  const [channelData, setChannelData] = useState([]);

  useEffect(() => {
    const setSelectedChannels = () => {
      let companyShop = clickedCompanyStore
        ? [{ id: 1, name: 'malanghoney' }]
        : [];
      let smartStore = clickedSmartStore
        ? [{ id: 3, name: '스마트스토어' }]
        : [];
      let besideStore = besideStoreList.filter(
        (store) => store.checked === true
      );
      setChannelData(besideStore.concat(companyShop).concat(smartStore));
    };
    setSelectedChannels();
  }, [clickedCompanyStore, clickedSmartStore, besideStoreList]);

  useEffect(() => {
    if (isInfinited === true) {
      setEndDate(null);
    }
  }, [isInfinited]);
  const postEventData = () => {
    const eventData = {};

    eventData.title = title;
    eventData.items = mainItems;
    eventData.freebies = freebies;
    eventData.isRange = freebieRange;
    eventData.rangeQuantity = rangeNumber;
    eventData.type = freebieType;
    eventData.prints = prints;
    eventData.minimumQuantity = minBuyNumber;
    eventData.minimumAmount = minBuyPrice;
    eventData.initialLimitedQuantity = limitNumber;
    eventData.start = startDate;
    eventData.end = endDate;
    eventData.channels = channelData;

    const url = `https://api2fulfillment.sellha.kr/event/`;
    const data = {
      groupId: 1,
      data: eventData,
    };

    axios
      .post(url, data)
      .then((response) => {
        try {
          if (response.data.code === 201) {
            // window.location.href = '/registitem';
          } else {
            console.log(response.status);
            alert('데이터를 등록해주세요');
          }
        } catch (err) {
          alert('데이터를 불러올 수 없습니다.');
        }
      })
      .catch(() => {
        alert('error');
        // setErpLoading(false);
      });
  };
  const enterLoading = (type) => {
    setPostLoading(true);
    setTimeout(() => {
      setPostLoading(false);
      swal({
        title: '등록 완료',
        // text: '다른 아이템을 등록하시겠습니까?',
        icon: 'success',
        buttons: '확인',
      }).then((value) => {
        if (value) {
          window.location.reload();
        } else {
          window.location.href = '/registitem';
        }
      });
    }, 4000);
  };
  const importData = (data) => {
    getMainItemData();
    getFreebieData();
    getPrintData();
    getBrandData();
    getFreebieErpData();
    setStepStatus(stepStatus + 1);
    setTitle(data.title);
    setMainItems(data.items);
    setFreebies(data.freebies);
    setPrints(data.prints);
  };

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
            {mainItems.length !== brandData.length
              ? mainItems.map((item) => item.name).join(', ')
              : '전체 브랜드'}
          </EventInfomation>
          <EventInfomation>
            <EventInfomationText>사은품</EventInfomationText>
            {freebies.length !== 0
              ? freebies.map((item) => item.name).join(', ')
              : '-'}
          </EventInfomation>
          <EventInfomation>
            <EventInfomationText>인쇄물</EventInfomationText>
            {prints.length !== 0
              ? prints.map((item) => item.name).join(', ')
              : '-'}
          </EventInfomation>
        </EventInfomationWrapper>
        {stepStatus === 1 && (
          <>
            <SubTitle>이벤트 이름을 입력해주세요</SubTitle>
            <ImportButton
              onClick={() => getImportData()}
              loading={importLoading}
            >
              불러오기
            </ImportButton>
            {importVisible && (
              <ImportModalView
                close={() => closeModal('import')}
                eventData={eventData}
                loading={importLoading}
                importData={importData}
                setSelectedRow={setSelectedRow}
                getEventData={getEventData}
                selectedRowLoading={selectedRowLoading}
              />
            )}
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
              <StepNextButton
                onClick={setNextStep}
                disabled={!title}
                loading={stepOneLoading}
              >
                {stepOneLoading ? '' : '다음'}
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
                {brandData.length !== mainItems.length &&
                  mainItems &&
                  mainItems.map((item, index) => (
                    <Item key={index}>
                      {item.image && <ItemImage src={item.image} />}
                      {item.label ?? item.name}
                      <BsIcons.BsTrash
                        color="#a9a9a9"
                        style={{ float: 'right', cursor: 'pointer' }}
                        onClick={() => removeItem(index, 'main')}
                      />
                    </Item>
                  ))}
                {mainItems.length !== 0 &&
                  brandData.length === mainItems.length && (
                    <Item>
                      전체 브랜드
                      <BsIcons.BsTrash
                        color="#a9a9a9"
                        style={{ float: 'right', cursor: 'pointer' }}
                        onClick={() => removeItem(1, 'all')}
                      />
                    </Item>
                  )}
                <AddItem
                  onClick={() => {
                    getMainItemData();
                    getBrandData();
                  }}
                >
                  {mainLoading ? (
                    <Spin indicator={antIcon} />
                  ) : (
                    '+ 아이템 추가하기'
                  )}
                </AddItem>
              </ItemWrapper>
              {mainItemModalVisible && (
                <MainItemModalView
                  close={() => {
                    closeModal('main');
                  }}
                  setMainItems={setMainItems}
                  mainItemsData={mainItemsData}
                  brandData={brandData}
                />
              )}
            </ContentWrapper>
            <ContentWrapper>
              <LabelWrapper>
                <TextLabel>사은품</TextLabel>
                <CountLabel>{countFreebie}</CountLabel>
                <FreebieInfoButton
                  disabled={freebies.length === 0}
                  onClick={() => openModal('freebieInfo')}
                >
                  사은품 정보
                </FreebieInfoButton>
                {freebieInfoModalVisible && (
                  <FreebieInfoModalView
                    close={() => closeModal('freebieInfo')}
                    onChangeNumber={onChangeNumber}
                    rangeNumber={rangeNumber}
                    setRangeNumber={setRangeNumber}
                    freebieRange={freebieRange}
                    freebieType={freebieType}
                    setFreebieRange={setFreebieRange}
                    setFreebieType={setFreebieType}
                    setFreebieInfoModalVisible={setFreebieInfoModalVisible}
                  />
                )}
                <ReloadButton onClick={() => reload('freebie')}>
                  <AiIcons.AiOutlineReload size="24" color="#a9a9a9" />
                </ReloadButton>
              </LabelWrapper>
              <ItemWrapper>
                {freebies &&
                  freebies.map((item, index) => (
                    <Item key={index}>
                      {item.image && <ItemImage src={item.image} />}
                      {item.name}
                      <BsIcons.BsTrash
                        color="#a9a9a9"
                        style={{ float: 'right', cursor: 'pointer' }}
                        onClick={() => removeItem(index, 'freebie')}
                      />
                    </Item>
                  ))}
                <AddItem
                  onClick={() => {
                    getFreebieData();
                    getFreebieErpData();
                  }}
                >
                  {freebieLoading ? (
                    <Spin indicator={antIcon} />
                  ) : (
                    '+ 아이템 추가하기'
                  )}
                </AddItem>
              </ItemWrapper>
              {freebieModalVisible && (
                <FreebieModalView
                  close={() => {
                    closeModal('freebie');
                  }}
                  setFreebies={setFreebies}
                  erpData={freebieErpData}
                  freebiesData={freebiesData}
                  brandData={brandData}
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
                      {item.image && <ItemImage src={item.image} />}
                      {item.name}
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
                    getPrintData();
                  }}
                >
                  {printLoading ? (
                    <Spin indicator={antIcon} />
                  ) : (
                    '+ 아이템 추가하기'
                  )}
                </AddItem>
              </ItemWrapper>
              {printModalVisible && (
                <PrintModalView
                  close={() => {
                    closeModal('print');
                  }}
                  setPrints={setPrints}
                  printsData={printsData}
                  brandData={brandData}
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
                    (freebies.length !== 0 || prints.length !== 0)
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
                  value={minBuyNumber || 0}
                  onChange={(e) => {
                    onChangeNumber(e, 'minBuyNumber');
                  }}
                  disabled={minBuyNumberChecked}
                />
                개
                <WayOption className="checkbox">
                  <input
                    type="checkbox"
                    style={{ marginRight: '10px' }}
                    value={minBuyNumberChecked}
                    checked={minBuyNumberChecked}
                    onChange={() => {
                      setMinBuyNumber(0);
                      setMinBuyNumberChecked(!minBuyNumberChecked);
                    }}
                  />
                  해당없음
                </WayOption>
                <WayOption className="placeholder">
                  2개 이상부터 입력해주세요
                </WayOption>
              </Way>
              <Way>
                <WayText>최소구매금액</WayText>
                <InputNumber
                  type="text"
                  value={minBuyPrice || 0}
                  onChange={(e) => {
                    onChangeNumber(e, 'minBuyPrice');
                  }}
                  disabled={minBuyPriceChecked}
                />
                원
                <WayOption className="checkbox">
                  <input
                    type="checkbox"
                    style={{ marginRight: '10px' }}
                    value={minBuyPriceChecked}
                    checked={minBuyPriceChecked}
                    onChange={() => {
                      setMinBuyPrice(0);
                      setMinBuyPriceChecked(!minBuyPriceChecked);
                    }}
                  />
                  해당없음
                </WayOption>
              </Way>
              {freebies.length !== 0 && (
                <Way>
                  <WayText>한정수량</WayText>
                  <InputNumber
                    type="text"
                    value={limitNumber || 0}
                    onChange={(e) => {
                      onChangeNumber(e, 'limitNumber');
                    }}
                    disabled={limitNumberChecked}
                  />
                  개
                  <WayOption className="checkbox">
                    <input
                      type="checkbox"
                      style={{ marginRight: '10px' }}
                      value={limitNumberChecked}
                      checked={limitNumberChecked}
                      onChange={() => {
                        setLimitNumber(0);
                        setLimitNumberChecked(!limitNumberChecked);
                      }}
                    />
                    제한없음
                  </WayOption>
                </Way>
              )}
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
                  checked={isInfinited}
                  onChange={() => setIsInfinited(!isInfinited)}
                />
                제한없음
              </WayOption>
            </CalenderWrapper>
            <StepButtonWrapper>
              <StepBackButton onClick={setBackStep}>이전</StepBackButton>
              <StepNextButton onClick={setNextStep}>다음</StepNextButton>
            </StepButtonWrapper>
          </>
        )}
        {stepStatus === 4 && (
          <>
            <SubTitle>
              이벤트를 진행할 채널을 선택해주세요 (복수선택 가능)
            </SubTitle>
            <br />
            <SelectChannelButtonWrapper>
              <SelectChannelButton
                icon={CompanyShopIcon}
                label="자사몰"
                setChannelData={() =>
                  setClickedCompanyStore(!clickedCompanyStore)
                }
                show={clickedCompanyStore}
              />
              <SelectChannelButton
                icon={NaverIcon}
                label="스마트스토어"
                setChannelData={() => setClickedSmartStore(!clickedSmartStore)}
                show={clickedSmartStore}
              />
              <SelectChannelButton
                icon={BesideShopIcon}
                label="그 외"
                setChannelData={() =>
                  setClickedBesideStore(!clickedBesideStore)
                }
                show={visibleBesideModal}
              />
              {clickedBesideStore && (
                <BesideStoreModalView
                  close={() => setClickedBesideStore(!clickedBesideStore)}
                  besideStoreList={besideStoreList}
                  onChange={onChangeBesideStore}
                  selectedBesideStore={selectedBesideStore}
                  allSelectedBesideStore={allSelectedBesideStore}
                />
              )}
            </SelectChannelButtonWrapper>
            <StepButtonWrapper>
              <StepBackButton onClick={setBackStep}>이전</StepBackButton>
              <StepNextButton onClick={setNextStep} loading={postLoading}>
                {postLoading ? '' : '완료'}
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
  left: 200px;
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
const StepNextButton = styled(Button)`
  all: unset;
  width: 40px;
  color: #fff;
  border: 1px solid #d9d9d9;
  background-color: ${(props) => (props.disabled ? '#d9d9d9' : '#228be6')};
  padding: 0.5rem 2rem;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 2px;
  &:hover {
    background-color: #228be6;
    color: #fff;
  }
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
  min-width: 30%;
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
  height: 60px;
  line-height: 60px;
  border-radius: 5px;
  background-color: #c6d3ff;
  color: #7f7f7f;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
`;
const Item = styled.li`
  width: 100%;
  height: 60px;
  /* line-height: 40px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  width: 25vw;
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
const SelectChannelButtonWrapper = styled.div`
  margin-top: 150px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ItemImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 36px;
`;
const FreebieInfoButton = styled.button`
  margin-left: 20px;
  padding: 1px 5px;
  color: #fff;
  background-color: ${(props) => (props.disabled ? '#e1e1e1' : '#228be6')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border: ${(props) =>
    props.disabled ? '1px solid #e1e1e1' : '1px solid #228be6'};
  box-sizing: border-box;
  border-radius: 5px;
`;
const ImportButton = styled(Button)`
  float: right;
  display: flex;
  padding: 1.2rem 1.7rem;
  align-items: center;
`;
export default EventRegistration;
