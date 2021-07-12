import React, { useState } from 'react';
import styled from 'styled-components';
import { SelectItemButton, NextButton } from 'components/ItemRegistration';
import FreebieAndPrintIcon from 'assets/icon_giveaway.png';
import ErpIcon from 'assets/icon_erp.png';



function ItemRegistration() {
    const [clickedFreebie, setClickedFreebie] = useState(false);
    const [clickedERP, setClickedERP] = useState(false);

    return (
        <Container>
            <Wrapper>
                <h2>어떤 아이템을 등록(혹은 수정)하시나요?</h2>
                <SelectItemButton 
                    icon={FreebieAndPrintIcon}
                    label="사은품 · 인쇄물"
                    description="재고관리하지 않는 아이템"
                    test={() => {setClickedFreebie(!clickedFreebie); setClickedERP(false)}}
                    show={clickedFreebie}
                />
                <SelectItemButton 
                    icon={ErpIcon}
                    label="ERP 등록제품"
                    description="이미지 변경만 가능"
                    test={() => {setClickedERP(!clickedERP); setClickedFreebie(false)}}
                    show={clickedERP}
                /><br/>
                <NextButton 
                    clickedFreebie={clickedFreebie}
                    clickedERP={clickedERP}
                />
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 56px);
    text-align: center;
    z-index: -1;
`

const Wrapper = styled.div`
    position: relative;
    top: 100px;
    display: inline-block;
    width: 800px;
    height: 500px;
    text-align: center;
`

export default ItemRegistration;