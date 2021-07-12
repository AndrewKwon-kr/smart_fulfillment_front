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
    width: 60px;
    height: 60px;
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

function OptionRegistration(props) {
    const [file, setFile] = useState('');
    const [previewURL, setPreviewURL] = useState('');
    const [previewFileName, setPreviewFileName] = useState('');

    function handleFileOnChange(event) {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            setFile(file);
            setPreviewURL(reader.result);
        }
        reader.readAsDataURL(file);
        setPreviewFileName(file.name);

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
        props.setImage(previewURL);
    }
    console.log(props.optionStatus)
    return (
        <>
            {props.optionStatus === `none` && (
                <Wrapper>
                    <BorderedButton htmlFor='itemImage'>이미지 등록</BorderedButton>
                    <input type="file"
                        accept='image/jpg, image/png, image/jpeg'
                        id='itemImage'
                        onChange={(e) => { handleFileOnChange(e) }}
                        style={{ display: 'none' }}
                    >
                    </input>
                    <br />{profilePreview}
                </Wrapper>
            )}
            {props.optionStatus === 'has' && (
                <Wrapper>
                    <table>
                        <thead>
                            <tr>
                                <td>d</td>
                                <td>이미지</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>df</td>
                            </tr>
                        </tbody>
                    </table>
                </Wrapper>
            )}
        </>
    )
}

export default OptionRegistration;