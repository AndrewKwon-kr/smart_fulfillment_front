import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import {
  InputWithLabel,
  ImportButton,
  BackButton,
  CompleteButton,
  OptionRegistration,
  MultiSelect,
  ImportModal,
} from 'components/FreebieAndPrint';
import axios from 'axios';
import swal from 'sweetalert';

const categoryOptions = [
  { value: 'freebiegroup/freebies', label: '사은품 (비매품만)' },
  { value: 'printgroup/prints', label: '인쇄물' },
];

function FreebieAndPrint() {
  const [getData, setGetData] = useState([]);
  const [title, setTitle] = useState('');
  // const [optionStatus, setOptionStatus] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [brandValues, setBrandValues] = useState([]);
  // const [image, setImage] = useState('');
  const [brandOptions, setBrandOPtions] = useState([]);
  const [loading, setLoading] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [inputs, setInputs] = useState({
    image: '',
    name: '',
    mainImage: false,
    checked: false,
  });
  const { image, name, mainImage, checked } = inputs;

  const [options, setOptions] = useState([
    {
      id: 1,
      image: '',
      name: '',
      mainImage: true,
      checked: false,
    },
  ]);
  // const [freebieData, setFreebieData] = useState([]);
  // const [printData, setPrintData] = useState([]);
  const [freebieAndPrintData, setFreebieAndPrintData] = useState([]);
  const [freebieAndPrintLoading, setFreebieAndPrintLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [dataKey, setDataKey] = useState();

  const [selectedRow, setSelectedRow] = useState();

  const nextId = useRef(2);

  useEffect(() => {
    if (options.length === 0) {
      // props.setImage('');
    }
  });
  useEffect(() => {
    const getData = () => {
      const url = `${process.env.REACT_APP_URL}/brand/`;
      axios.get(url).then((response) => {
        setGetData(response.data);
      });
    };
    getData();
  }, []);
  useEffect(() => {
    setBrandOPtions(
      getData.map((data) => {
        return { value: data.id, label: data.name };
      })
    );
  }, [getData]);
  const onCreate = () => {
    const option = {
      id: nextId.current,
      image,
      name,
      mainImage,
      checked,
    };
    setOptions(options.concat(option));

    setInputs({
      image: '',
      name: '',
      mainImage: false,
      checked: false,
    });
    nextId.current += 1;
  };

  function onChecked(e, id) {
    setOptions(
      options.map((option) => {
        if (option.id !== id) {
          return option;
        } else {
          return { ...option, checked: e.target.checked };
        }
      })
    );
  }
  function onMarked(e, id) {
    setOptions(
      options.map((option) => {
        if (option.id !== id) {
          return { ...option, mainImage: false };
        } else {
          return { ...option, mainImage: e.target.checked };
        }
      })
    );
  }
  function allChecked() {
    if (isAllChecked) {
      setOptions(
        options.map((option) => {
          return { ...option, checked: false };
        })
      );
      setIsAllChecked(false);
    } else {
      setOptions(
        options.map((option) => {
          return { ...option, checked: true };
        })
      );
      setIsAllChecked(true);
    }
  }

  function onChangeOptionName(e, id) {
    e.preventDefault();
    setOptions(
      options.map((option) => {
        if (option.id !== id) {
          return option;
        } else {
          return { ...option, name: e.target.value };
        }
      })
    );
  }

  function handleFileOnChange(event, id) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      setOptions(
        options.map((option) => {
          if (option.id !== id) {
            return option;
          } else {
            return { ...option, image: reader.result };
          }
        })
      );
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function onRemoveOption() {
    setOptions(options.filter((option) => option.checked !== true));
  }

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const importData = () => {
    if (!selectedRow) {
      swal('등록된 사은품 또는 인쇄물을 선택해주세요.');
    } else {
      setTitle(selectedRow[0].name);
      if (selectedRow[0].category === '인쇄물') {
        setCategoryValue({
          value: 'printgroup/prints',
          label: '인쇄물',
        });
      } else {
        setCategoryValue({
          value: 'freebiegroup/freebies',
          label: '사은품 (비매품만)',
        });
      }
      setBrandValues(
        selectedRow[0].brands.map((brand) => ({
          label: brand.name,
          value: brand.id,
        }))
      );
      setOptions(
        selectedRow[0].items.map((item) => ({
          ...item,
          mainImage: item.main_image,
        }))
      );
      setDataKey(selectedRow[0].id);
      setIsUpdate(true);
      closeModal();
    }
  };
  const enterLoading = (type) => {
    if (type === 'import') {
      setFreebieAndPrintLoading(true);
      setTimeout(() => {
        setFreebieAndPrintLoading(false);
        swal({
          title: '수정 완료',
          text: '다른 아이템을 등록하시겠습니까?',
          icon: 'success',
          buttons: { confirm: '예', cancel: '아니오' },
        }).then((value) => {
          if (value) {
            window.location.reload();
          } else {
            window.location.href = '/registitem';
          }
        });
        // window.location.reload();
      }, 4000);
      // setTimeout(() => {
      //   setFreebieAndPrintLoading(false);
      // }, 4000);
    } else if (type === 'complete') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        swal({
          title: '수정 완료',
          text: '다른 아이템을 등록하시겠습니까?',
          icon: 'success',
          buttons: { confirm: '예', cancel: '아니오' },
        }).then((value) => {
          if (value) {
            window.location.reload();
          } else {
            window.location.href = '/registitem';
          }
        });
        // window.location.reload();
      }, 4000);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 4000);
    }
  };

  const getFreebieData = () => {
    const url = `${process.env.REACT_APP_URL}/freebiegroup/freebies/`;
    const res = axios
      .get(url)
      .then((response) => {
        try {
          if (response.data) {
            const fData = response.data.result.map((data) => {
              return { ...data, category: response.data.category };
            });
            // setFreebieData(fData);
            return fData;
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
      });
    return res;
  };
  const getPrintData = () => {
    const url = `${process.env.REACT_APP_URL}/printgroup/prints/`;
    const res = axios
      .get(url)
      .then((response) => {
        try {
          if (response.data) {
            const pData = response.data.result.map((data) => {
              return { ...data, category: response.data.category };
            });
            // setPrintData(pData);
            return pData;
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
      });
    return res;
  };
  const getBothData = async () => {
    let data = [];

    try {
      Promise.all([getPrintData(), getFreebieData()]).then((responses) => {
        setFreebieAndPrintLoading(false);
        responses.map((response) =>
          response.map((ret) => (data = [...data, ret]))
        );
        setFreebieAndPrintData(
          data.map((data, index) => {
            return { ...data, key: index };
          })
        );
        return data;
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  return (
    <Container>
      <Wrapper>
        <SubTitle>사은품 · 인쇄물 정보 등록(및 수정)</SubTitle>
        <ImportButton
          text="불러오기"
          getBothData={getBothData}
          openModal={openModal}
        />
        {modalVisible && (
          <ImportModal
            importData={importData}
            close={closeModal}
            data={freebieAndPrintData}
            loading={freebieAndPrintLoading}
            setSelectedRow={setSelectedRow}
          />
        )}
        <br />
        <Description>
          이미 등록된 사은품 또는 인쇄물 정보를 수정하고 싶다면 우측 상단의
          '불러오기'를 클릭하세요.
        </Description>
        <br />
        <InputWithLabel
          label="이름"
          onChange={(e) => {
            onChange(e);
          }}
          value={title}
          placeholder="사은품 또는 인쇄물의 이름을 입력해주세요"
        />
        <div>
          <InputWrap>
            <Label>분류</Label>
            <Select
              options={categoryOptions}
              placeholder="분류 선택"
              value={categoryValue}
              onChange={setCategoryValue}
            />
          </InputWrap>
          <InputWrap>
            <Label>브랜드</Label>
            <MultiSelect
              options={brandOptions}
              value={brandValues}
              onChange={setBrandValues}
            />
          </InputWrap>
        </div>
        <SubTitle>옵션 등록</SubTitle>
        <OptionRegistration
          onCreate={onCreate}
          onChecked={onChecked}
          onMarked={onMarked}
          allChecked={allChecked}
          onChangeOptionName={onChangeOptionName}
          handleFileOnChange={handleFileOnChange}
          onRemoveOption={onRemoveOption}
          options={options}
        />
        <FlexBox>
          <BackButton />
          <CompleteButton
            text={isUpdate ? '수정' : '등록'}
            title={title}
            category={categoryValue}
            brand={brandValues}
            options={options}
            dataKey={dataKey}
            loading={loading}
            enterLoading={() => enterLoading('complete')}
          />
        </FlexBox>
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
const InputWrap = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 40px;
  width: 45%;
  margin-bottom: 120px;
  &:last-child {
    position: absolute;
    right: 0;
  }
`;
const Label = styled.div`
  margin-bottom: 10px;
`;
const FlexBox = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

export default FreebieAndPrint;
