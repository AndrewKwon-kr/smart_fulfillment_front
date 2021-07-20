import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as VscIcon from 'react-icons/vsc';
import Option from './Option';

const Wrapper = styled.div`
  margin: 20px 0 0 20px;
  table {
    border: 1px solid;
  }
`;
const BorderedButton = styled.label`
  all: unset;
  position: relative;
  display: inline-block;
  font-weight: 600;
  width: 100px;
  text-align: center;
  color: #fff;
  background-color: ${(props) => (props.disabled ? '#d9d9d9' : '#228be6')};
  padding: 0.5rem;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 2px;
  text-decoration: none;
  transition: 0.2s all;
  &:active {
    transform: translateY(3px);
  }
`;

const ItemPreviewWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 10px;
  width: 400px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 10px;
  height: 80px;
`;

const ItemPreviewImage = styled.img`
  position: relative;
  display: inline-block;
  border-radius: 5px;
  width: 60px;
  height: 60px;
  &.full-image {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
`;
const ItemPreviewFileName = styled.div`
  margin: 0 30px 0 20px;
  position: relative;
  display: block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #a9a9a9;
`;
const TrashIcon = styled.div`
  cursor: pointer;
  float: right;
`;
const OptionHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #a9a9a9;
  padding: 10px;
  color: #a9a9a9;
`;
const OptionOneWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 20%;
`;
const OptionTwoWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 30%;
`;
const OptionThreeWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 40%;
`;
const OptionFourWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 10%;
  text-align: center;
`;
const OptionButton = styled.button`
  all: unset;
  margin: 10px 10px 0 0;
  display: inline-block;
  border: 1px solid #d9d9d9;
  color: #000;
  background-color: #fff;
  padding: 0.5rem 1.2rem;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 4px;
  text-decoration: none;
  font-size: 12px;
  transition: 0.2s all;

  &:hover {
    background: #228be6;
    color: white;
  }
`;

function OptionRegistration(props) {
  // optionStatus 'none'
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [previewFileName, setPreviewFileName] = useState('');

  // optionStatus 'has'
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
      props.setImage('');
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

  function handleFileOnChange(event, status, id) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    if (status === 'none') {
      reader.onloadend = () => {
        setFile(file);
        setPreviewURL(reader.result);
        props.setImage(reader.result);
        setPreviewFileName(file.name);
      };
    } else if (status === 'has') {
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
        props.setImage(reader.result);
      };
    }

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  function removeFile() {
    setFile('');
    props.setImage('');
  }
  function onRemoveOption() {
    setOptions(options.filter((option) => option.checked !== true));
  }

  let profilePreview = null;
  if (file !== '') {
    profilePreview = (
      <ItemPreviewWrap>
        <ItemPreviewImage src={previewURL} />
        <ItemPreviewFileName>{previewFileName}</ItemPreviewFileName>
        <TrashIcon
          onClick={() => {
            removeFile();
          }}
        >
          <VscIcon.VscTrash size="24" color="#a9a9a9" />
        </TrashIcon>
      </ItemPreviewWrap>
    );
  }

  console.log(options);

  return (
    <>
      {props.optionStatus === 'none' && (
        <Wrapper>
          <BorderedButton htmlFor="itemImage">이미지 등록</BorderedButton>
          <input
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            id="itemImage"
            onChange={(e) => {
              handleFileOnChange(e, 'none');
            }}
            style={{ display: 'none' }}
          ></input>
          <br />
          {profilePreview}
        </Wrapper>
      )}
      {props.optionStatus === 'has' && (
        <Wrapper>
          <OptionHeader>
            <OptionOneWrapper>
              <input
                type="checkbox"
                name="option"
                value="all"
                onChange={() => {
                  allChecked();
                }}
              ></input>
            </OptionOneWrapper>
            <OptionTwoWrapper>이미지</OptionTwoWrapper>
            <OptionThreeWrapper>옵션명</OptionThreeWrapper>
            <OptionFourWrapper>대표</OptionFourWrapper>
          </OptionHeader>
          {options.map((option) => (
            <Option
              option={option}
              key={option.id}
              handleFileOnChange={handleFileOnChange}
              onChangeOptionName={onChangeOptionName}
              onChecked={onChecked}
              onMarked={onMarked}
            />
          ))}
          <OptionButton
            onClick={() => {
              onCreate();
            }}
          >
            옵션 추가
          </OptionButton>
          <OptionButton
            onClick={() => {
              onRemoveOption();
            }}
          >
            선택 삭제
          </OptionButton>
        </Wrapper>
      )}
    </>
  );
}

export default OptionRegistration;
