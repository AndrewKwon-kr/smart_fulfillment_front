import React from 'react';
import styled from 'styled-components';

function ERP() {
    return (
        <Container>
            <Wrapper>
                <SubTitle>ERP 등록제품 이미지 등록(및 수정)</SubTitle><br/>
                <Description>이미지 항목에 있는 사각형을 누르면 제품 사진을 등록 및 수정 할 수 있습니다.</Description>
            </Wrapper>
        </Container>
    )
};

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

export default ERP;