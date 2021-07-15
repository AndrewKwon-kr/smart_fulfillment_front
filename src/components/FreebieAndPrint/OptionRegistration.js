import React, { useState } from 'react';
import styled from 'styled-components';
import * as VscIcon from 'react-icons/vsc'

const Wrapper = styled.div`
    margin: 20px 0 0 20px;
    table {
        border: 1px solid

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
    background-color: ${props => (props.disabled ? '#d9d9d9' : '#228be6')};
    padding: 0.5rem;
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
    border-radius: 2px;
    text-decoration: none;
    transition: .2s all;
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
`
const ItemPreviewFileName = styled.div`
    margin: 0 30px 0 20px;
    position: relative;
    display: block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #a9a9a9;
`
const TrashIcon = styled.div`
    cursor: pointer;
    float: right;
`
const OptionHeader = styled.div`
    width: 100%;
    border-bottom: 1px solid #a9a9a9;
    padding: 10px;
    color: #a9a9a9;
`
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
    width: 50%;
`;
const OptionBody = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 1px solid #a9a9a9;
    padding: 10px;
    color: #a9a9a9;
    align-items: center;
`;
const AddOptionImage = styled.label`
    all: unset;
    position: relative;
    display: inline-block;
    width: 80px;
    height: 80px;
    border: 1px solid #a9a9a9;
    border-radius: 5px;
    text-align: center;
    line-height: 80px;
    font-size: 12px;
    cursor: pointer;
    &.mark {
        border: 2px solid #228be6;
    }
`;
const Mark = styled.div`
    position: absolute;
    margin: 5px;
    width: 24px;
    background: #228be6;
    border-radius: 2px;
    color: #fff;
    font-size: 10px;
    text-align: center;
    z-index: 1;
`
const OptionButton = styled.button`
    all: unset;
    margin: 10px 10px 0 0;
    display: inline-block;
    border: 1px solid #d9d9d9;
    color: #000;
    background-color: #fff;
    padding: 0.5rem 1.2rem;
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
    border-radius: 4px;
    text-decoration: none;
    font-size: 12px;
    transition: .2s all;

    &:hover {
        background: #228be6;
        color: white;
    }
`;
const InputOptionName = styled.input`
    all: unset;
    width: 80%;
    padding: 5px;
    border-bottom: 1px solid #d9d9d9;
    color: #000;
`;

function OptionRegistration(props) {

    // optionStatus 'none'
    const [file, setFile] = useState('');
    const [previewURL, setPreviewURL] = useState('');
    const [previewFileName, setPreviewFileName] = useState('');

    // optionStatus 'has'
    const [hasFile, setHasFile] = useState('');
    const [hasPreviewURL, setHasPreviewURL] = useState('');
    const [hasOptionName, setHasOptionName] = useState('');
    const [hasOption, setHasOption] = useState(0);

    function handleFileOnChange(event, status) {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        if (status === 'none') {
            reader.onloadend = () => {
                setFile(file);
                setPreviewURL(reader.result);
                props.setImage(reader.result);
                setPreviewFileName(file.name);
            }

        }
        else if (status === 'has') {
            reader.onloadend = () => {
                setHasFile(file);
                setHasPreviewURL(reader.result);
            }
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    function removeFile() {
        setFile('');
        props.setImage('');
    }

    let profilePreview = null;
    if (file !== '') {
        profilePreview =
            <ItemPreviewWrap>
                <ItemPreviewImage src={previewURL} />
                <ItemPreviewFileName>{previewFileName}</ItemPreviewFileName>
                <TrashIcon onClick={() => { removeFile() }}><VscIcon.VscTrash size='24' color='#a9a9a9' /></TrashIcon>
            </ItemPreviewWrap>
    }

    function Option() {
        return (
            <OptionBody>
                <OptionOneWrapper><input type='checkbox' name='option'></input></OptionOneWrapper>
                <OptionTwoWrapper>
                    <input type='file'
                        accept='image/jpg, image/png, image/jpeg'
                        id='markImage'
                        onChange={(e) => { handleFileOnChange(e, 'has') }}
                        style={{ display: 'none' }}
                    >
                    </input>
                    <AddOptionImage htmlFor='markImage'>
                        {hasPreviewURL ? <ItemPreviewImage className='full-image' src={hasPreviewURL} /> : '등록'}
                    </AddOptionImage>
                </OptionTwoWrapper>
                <OptionThreeWrapper>
                    <InputOptionName type='text' value={hasOptionName} onChange={(e) => {setHasOptionName(e.target.value)}}></InputOptionName>
                </OptionThreeWrapper>
            </OptionBody>
        )
    }

    const createOption = () => {
        const result = [];
        for (let i = 0; i < hasOption; i++) {
            result.push(<Option key={i}></Option>);
        }
        return result;
    };
    return (
        <>
            {props.optionStatus === 'none' && (
                <Wrapper>
                    <BorderedButton htmlFor='itemImage'>이미지 등록</BorderedButton>
                    <input type='file'
                        accept='image/jpg, image/png, image/jpeg'
                        id='itemImage'
                        onChange={(e) => { handleFileOnChange(e, 'none') }}
                        style={{ display: 'none' }}
                    >
                    </input>
                    <br />{profilePreview}
                </Wrapper>
            )}
            {props.optionStatus === 'has' && (
                <Wrapper>
                    <OptionHeader>
                        <OptionOneWrapper><input type='checkbox' name='option' value='all'></input></OptionOneWrapper>
                        <OptionTwoWrapper>이미지</OptionTwoWrapper>
                        <OptionThreeWrapper>옵션명</OptionThreeWrapper>
                    </OptionHeader>
                    <OptionBody>
                        <OptionOneWrapper><input type='checkbox' name='option'></input></OptionOneWrapper>
                        <OptionTwoWrapper>
                            <input type='file'
                                accept='image/jpg, image/png, image/jpeg'
                                id='markImage'
                                onChange={(e) => { handleFileOnChange(e, 'has') }}
                                style={{ display: 'none' }}
                            >
                            </input>
                            <Mark>대표</Mark>
                            <AddOptionImage className='mark' htmlFor='markImage'>
                                {hasPreviewURL ? <ItemPreviewImage className='full-image' src={hasPreviewURL} /> : '등록'}
                            </AddOptionImage>
                        </OptionTwoWrapper>
                        <OptionThreeWrapper>
                            <InputOptionName type='text' value={hasOptionName} onChange={(e) => {setHasOptionName(e.target.value)}}></InputOptionName>
                        </OptionThreeWrapper>
                    </OptionBody>
                    {/* {hasOption.map((option, index) => (
                        <Option option={option} key={index}/>
                    ))} */}
                    {createOption()}
                    <OptionButton onClick={() => { setHasOption(hasOption + 1) }}>옵션 추가</OptionButton>
                    <OptionButton onClick={() => { setHasOption(hasOption - 1) }}>선택 삭제</OptionButton>
                </Wrapper>
            )}
        </>
    )
}



export default OptionRegistration;