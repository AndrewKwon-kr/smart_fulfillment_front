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

const categoryOptions = [
  { value: 'freebie', label: '사은품 (비매품만)' },
  { value: 'print', label: '인쇄물' },
];
const brandOptions = [
  { value: 'malang', label: '말랑하니' },
  { value: 'rumi', label: '루미레브' },
  { value: 'mow', label: '모우모우' },
  { value: 'iblyn', label: '아이블린' },
  { value: 'bonbun', label: '본분' },
  { value: 'marge', label: '마지마켓' },
];
const importJSON = {
  title: '불러오기 테스트',
  category: categoryOptions,
  brand: brandOptions,
};

function FreebieAndPrint() {
  const [title, setTitle] = useState('');
  // const [optionStatus, setOptionStatus] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [brandValues, setBrandValues] = useState([]);
  // const [image, setImage] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [inputs, setInputs] = useState({
    image: '',
    optionName: '',
    mark: false,
    checked: false,
  });
  const { image, optionName, mark, checked } = inputs;

  const [options, setOptions] = useState([
    {
      id: 1,
      image: '',
      optionName: '',
      mark: true,
      checked: false,
    },
  ]);

  const nextId = useRef(2);

  useEffect(() => {
    if (options.length === 0) {
      // props.setImage('');
    }
  });

  const onCreate = () => {
    const option = {
      id: nextId.current,
      image,
      optionName,
      mark,
      checked,
    };
    setOptions(options.concat(option));

    setInputs({
      image: '',
      optionName: '',
      mark: false,
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
          return { ...option, mark: false };
        } else {
          return { ...option, mark: e.target.checked };
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
          return { ...option, optionName: e.target.value };
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
    setTitle(importJSON.title);
    setCategoryValue(importJSON.category[1]);
    setBrandValues([importJSON.brand[2]]);
    closeModal();
  };
  console.log(options);
  return (
    <Container>
      <Wrapper>
        <SubTitle>사은품 · 인쇄물 정보 등록(및 수정)</SubTitle>
        <ImportButton text="불러오기" import={openModal} />
        {modalVisible && (
          <ImportModal
            importJSON={importJSON}
            importData={importData}
            close={closeModal}
          />
        )}
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
            text="완료"
            title={title}
            category={categoryValue}
            brand={brandValues}
            options={options}
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
  margin-top: 10px;
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
