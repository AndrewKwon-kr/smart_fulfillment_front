import React from "react";
import styled from 'styled-components';
import * as BiIcons from 'react-icons/bi';


const Input = styled.input`
    margin: 20px 0;
    width: 60%;
    border: none;
    border-bottom: 1px solid #d9d9d9;
    outline: none;
    border-radius: 4px;
    line-height: 2.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    box-sizing: border-box;
`;
const Button = styled.button`
    all: unset;
    cursor: pointer;
`;

function Search({ onSubmit }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(event.target.elements.filter.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input name="filter" placeholder="검색어를 입력하세요" />
            <Button><BiIcons.BiSearch /></Button>
            
        </form>
    );
}


export default Search;
