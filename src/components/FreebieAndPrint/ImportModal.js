import React, { useMemo } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import faker from "faker/locale/ko";
import Table from "./ImportTable";


faker.seed(10);

const Modal = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #00000080;
    align-items: center;
    z-index: 9999;
`
const ModalContainer = styled.div`
    margin: 0 auto;
    padding: 35px 25px;
    display: block;
    background-color: #fff;
    width: 450px;
    height: 550px;
    border-radius: 10px;
`
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

function ImportModal(props) {
    const columns = useMemo(
        () => [
            {
                accessor: "category",
                Header: "분류",
            },
            {
                accessor: "name",
                Header: "이름",
            },
        ],
        []
    );

    const data = useMemo(
        () =>
            Array(10)
                .fill()
                .map(() => ({
                    category: faker.company.companyName(),
                    name: faker.name.lastName() + faker.name.firstName()
                })),
        []
    );
    console.log(faker)
    return (
        <Modal>
            <ModalContainer>
                <h3>등록된 사은품 · 인쇄물 불러오기</h3>
                <Input placeholder="검색어를 입력하세요"></Input>
                <Table columns={columns} data={data} />
                <br /><button className="close" onClick={props.close}> close </button>
                <button className="close" onClick={props.importData}> 선택 </button>
            </ModalContainer>
        </Modal>
    )
}

export default ImportModal;