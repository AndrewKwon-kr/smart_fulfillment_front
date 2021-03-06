import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MainItemSearch,
  Board,
  Card,
  MainItemFilterModalView,
  GroupItemFilterModalView,
} from 'components/EventRegistration';
import Select from 'react-select';

function MainItemModalView(props) {
  const [categoryValue, setCategoryValue] = useState({ value: 'group' });
  const [brandFilterValue, setBrandFilterValue] = useState({ value: 'all' });
  const [selectedItems, setSelectedItems] = useState([]);
  const categoryOptions = [
    { value: 'group', label: '그룹별' },
    { value: 'product', label: '제품별' },
  ];
  // const groupList = [
  //   { key: 'all', label: '전체 제품' },
  //   { key: 'malanghoney', label: '말랑하니 전체 제품' },
  //   { key: 'mowmow', label: '모우모우 전체 제품' },
  //   { key: 'roomireve', label: '루미레브 전체 제품' },
  //   { key: 'margemarket', label: '마지마켓 전체 제품' },
  //   { key: 'iblyn', label: '아이블린 전체 제품' },
  //   { key: 'bonboon', label: '본분 전체 제품' },
  // ];
  const productList = props.mainItemsData.map((item) => {
    return {
      key: item.key,
      label: item.name,
      image: item.image,
      brand: item.brands[0].name,
      items: item.items,
      code: item.code,
    };
  });
  const brandList = props.brandData.map((brand) => {
    return {
      key: brand.id,
      value: brand.code,
      label: brand.name,
    };
  });
  brandList.unshift({ key: 'all', value: 'all', label: '전체 브랜드' });
  const groupList = props.brandData.map((brand) => {
    return {
      key: brand.id,
      value: brand.code,
      name: brand.name,
      label: brand.name + ' 전체 제품',
      itemgroups: brand.itemgroups,
    };
  });
  groupList.unshift({ key: 'all', value: 'all', label: '전체 브랜드' });

  const setMainItems = () => {
    props.setMainItems(selectedItems);
    props.close();
  };
  const [userInput, setUserInput] = useState('');
  const [searchedMainItem, setSearchedMainItem] = useState(productList);
  const [searchedGroupItem, setSearchedGroupItem] = useState(groupList);
  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
  };
  const handleClick = () => {
    if (categoryValue.value === 'group') {
      setSearchedGroupItem(
        groupList.filter((item) => item.label.includes(userInput))
      );
    } else if (categoryValue.value === 'product') {
      setSearchedMainItem(
        productList.filter((item) => item.label.includes(userInput))
      );
    }
  };

  const [mainItemFilterVisible, setMainItemFilterVisible] = useState(false);
  const [groupItemFilterVisible, setGroupItemFilterVisible] = useState(false);
  const openModal = (type) => {
    if (type === 'main') {
      setMainItemFilterVisible(true);
    } else {
      setGroupItemFilterVisible(true);
    }
  };
  function closeModal(type) {
    if (type === 'main') {
      setMainItemFilterVisible(false);
    } else {
      setGroupItemFilterVisible(false);
    }
  }

  const [filteredMainItem, setFilteredMainItem] = useState([]);
  const [filteredGroupItem, setFilteredGroupItem] = useState([]);

  return (
    <Modal>
      <ModalContainer>
        <Title>본품 찾기</Title>
        <MainItemSearch handleChange={handleChange} handleClick={handleClick} />
        <InputWrap className="CategoryOption">
          <Select
            options={categoryOptions}
            defaultValue={categoryOptions[0]}
            onChange={setCategoryValue}
            isSearchable={false}
          />
        </InputWrap>
        {categoryValue.value === 'product' && (
          <InputWrap className="BrandOption">
            <Select
              options={brandList}
              defaultValue={brandList[0]}
              onChange={setBrandFilterValue}
              isSearchable={false}
            />
          </InputWrap>
        )}
        {categoryValue.value === 'group' && (
          <div className="flexbox">
            <Board
              id="board-1"
              className="board"
              type="mainItemModalView_group_remove"
              setSelectedItems={setSelectedItems}
              filteredItem={searchedGroupItem}
              groupList={groupList}
              setFilteredGroupItem={setFilteredGroupItem}
              selectedItems={selectedItems}
            >
              {groupList.map((group) => (
                <div key={group.key}>
                  <Card
                    key={group.key}
                    id={group.key}
                    className="card"
                    draggable="true"
                    image={group.image}
                  >
                    {group.label}
                  </Card>
                </div>
              ))}
            </Board>
          </div>
        )}
        {categoryValue.value === 'product' && (
          <div className="flexbox">
            <Board
              id="board-2"
              className="board"
              type="mainItemModalView_product_remove"
              setSelectedItems={setSelectedItems}
              filteredItem={searchedMainItem}
              productList={productList}
              setFilteredMainItem={setFilteredMainItem}
              selectedItems={selectedItems}
            >
              {searchedMainItem
                .filter(
                  (item) =>
                    item.brand === brandFilterValue.label ||
                    brandFilterValue.value === 'all'
                )
                .map((group) => (
                  <div key={group.key}>
                    <Card
                      key={group.key}
                      id={group.key}
                      className="card"
                      draggable="true"
                      image={group.image}
                    >
                      {group.image && <ItemImage src={group.image} alt="" />}
                      {group.label}
                    </Card>
                  </div>
                ))}
            </Board>
          </div>
        )}
      </ModalContainer>
      <BoardContainer>
        <div className="flexbox2">
          {categoryValue.value === 'group' && (
            <Board
              id="board-3"
              className="board"
              setSelectedItems={setSelectedItems}
              groupList={groupList}
              openModal={() => openModal('group')}
              setFilteredGroupItem={setFilteredGroupItem}
              type="mainItemModalView_group_add"
              selectedItems={selectedItems}
            ></Board>
          )}
          {categoryValue.value === 'product' && (
            <Board
              id="board-4"
              className="board"
              setSelectedItems={setSelectedItems}
              productList={productList}
              openModal={() => openModal('main')}
              setFilteredMainItem={setFilteredMainItem}
              type="mainItemModalView_product_add"
              selectedItems={selectedItems}
            ></Board>
          )}
        </div>
        <ButtonWrapper>
          <Button className="close" onClick={props.close}>
            취소
          </Button>
          <Button className="close" onClick={setMainItems}>
            선택
          </Button>
        </ButtonWrapper>
      </BoardContainer>
      {mainItemFilterVisible && (
        <MainItemFilterModalView
          filteredMainItem={filteredMainItem}
          setFilteredMainItem={setFilteredMainItem}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          close={() => {
            closeModal('main');
          }}
        />
      )}
      {groupItemFilterVisible && (
        <GroupItemFilterModalView
          filteredGroupItem={filteredGroupItem}
          setFilteredGroupItem={setFilteredGroupItem}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          close={() => {
            closeModal('group');
          }}
        />
      )}
    </Modal>
  );
}

const Modal = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000080;
  align-items: center;
  z-index: 9999;

  .flexbox {
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 75%;

    overflow: scroll;

    margin: 10px auto;

    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #a9a9a9;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      /* background-color: grey; */
      border-radius: 10px;
      box-shadow: inset 0px 0px 5px white;
    }
  }
  .flexbox2 {
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 90%;

    overflow: hidden;

    margin: 10px auto;
  }
  .flexbox2 .board {
    display: flex;
    flex-direction: column;

    width: 100%;
    background-color: #eff3ff;
    padding: 15px;
  }
`;
const ModalContainer = styled.div`
  padding: 35px 25px;
  display: block;
  background-color: #fff;
  width: 400px;
  height: 700px;
  border-radius: 10px;
`;
const BoardContainer = styled.div`
  padding: 35px 25px;
  display: block;
  background-color: #fff;
  width: 400px;
  height: 700px;
  border-radius: 10px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
const Button = styled.button`
  all: unset;
  margin-left: 10px;
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
const ButtonWrapper = styled.div`
  /* padding-bottom: 35px; */
  float: right;
`;
const InputWrap = styled.div`
  margin-top: 20px;
  margin-right: 20px;
  position: relative;
  display: inline-block;
  &.CategoryOption {
    width: 100px;
  }
  &.BrandOption {
    width: 150px;
  }
`;
const ItemImage = styled.img`
  margin-right: 20px;

  width: 36px;
  height: 36px;
  border-radius: 36px;
`;

export default MainItemModalView;
