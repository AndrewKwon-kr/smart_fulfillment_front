import React from 'react';
import styled from 'styled-components';

function Board(props) {
  const drop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');

    const card = document.getElementById(cardId);
    if (card) {
      card.style.display = 'flex';

      e.target.appendChild(card);
    }
    if (props.type === 'mainItemModalView_group_add') {
      const group = props.groupList.filter(
        (group) => group.key === Number(cardId)
      )[0];

      if (cardId !== 'all') {
        props.setFilteredGroupItem(
          props.groupList
            .filter((group) => group.key === Number(cardId))[0]
            .itemgroups.map((item) => {
              return {
                ...item,
                brand: group.name,
                label: group.label,
                code: item.code,
                groupId: Number(cardId),
              };
            })
        );
        const cards = document.getElementsByClassName('board')[1].childNodes;
        setItems(cards);
        props.openModal();
      } else {
        props.setSelectedItems(
          props.groupList
            .filter((group) => group.key !== 'all')
            .map((group) => {
              return {
                ...group,
                items: group.itemgroups,
                id: group.key,
              };
            })
        );
      }
    }
    if (props.type === 'mainItemModalView_group_remove') {
      props.setSelectedItems(
        props.selectedItems.filter((item) => item.id !== Number(cardId))
      );
    }

    if (props.type === 'mainItemModalView_product_add') {
      const group = props.productList.filter(
        (product) => product.key === Number(cardId)
      )[0];

      props.setFilteredMainItem(
        props.productList
          .filter((product) => product.key === Number(cardId))[0]
          .items.map((item) => {
            return {
              ...item,
              brand: group.brand,
              label: group.label,
              groupCode: group.code,
              key: item.id,
              groupId: Number(cardId),
            };
          })
      );
      const cards = document.getElementsByClassName('board')[1].childNodes;
      setItems(cards);
      props.openModal();
    }
    if (props.type === 'mainItemModalView_product_remove') {
      props.setSelectedItems(
        props.selectedItems.filter((item) => item.id !== Number(cardId))
      );
    }

    if (props.type === 'FreebieModalView_erp_add') {
      const group = props.erpList.filter(
        (product) => product.key === Number(cardId)
      )[0];

      props.setFilteredErpItem(
        props.erpList
          .filter((product) => product.key === Number(cardId))[0]
          .items.map((item) => {
            return {
              ...item,
              brands: group.brands.join(', '),
              label: group.label,
              groupCode: group.code,
              key: item.id,
              groupId: Number(cardId),
            };
          })
      );
      const cards = document.getElementsByClassName('board')[1].childNodes;
      setItems(cards);
      props.openModal();
    }
    if (props.type === 'FreebieModalView_erp_remove') {
      props.setSelectedItems(
        props.selectedItems.filter((item) => item.id !== Number(cardId))
      );
    }

    if (props.type === 'FreebieModalView_freebie_add') {
      const group = props.freebieList.filter(
        (product) => product.key === Number(cardId)
      )[0];

      props.setFilteredFreebieItem(
        props.freebieList
          .filter((product) => product.key === Number(cardId))[0]
          .items.map((item) => {
            return {
              ...item,
              brands: group.brands.join(', '),
              label: group.label,
              key: item.id,
              groupId: Number(cardId),
            };
          })
      );
      const cards = document.getElementsByClassName('board')[1].childNodes;
      setItems(cards);
      props.openModal();
    }
    if (props.type === 'FreebieModalView_freebie_remove') {
      props.setSelectedItems(
        props.selectedItems.filter((item) => item.id !== Number(cardId))
      );
    }

    if (props.type === 'PrintModalView_print_add') {
      const group = props.printList.filter(
        (product) => product.key === Number(cardId)
      )[0];

      props.setFilteredPrintItem(
        props.printList
          .filter((product) => product.key === Number(cardId))[0]
          .items.map((item) => {
            return {
              ...item,
              brands: group.brands.join(', '),
              label: group.label,
              key: item.id,
              groupId: Number(cardId),
            };
          })
      );
      const cards = document.getElementsByClassName('board')[1].childNodes;
      setItems(cards);
      props.openModal();
    }
    if (props.type === 'PrintModalView_print_remove') {
      props.setSelectedItems(
        props.selectedItems.filter((item) => item.id !== Number(cardId))
      );
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  function setItems(cards) {
    const items = props.selectedItems || [];

    for (let i = items.length; i < cards.length; i++) {
      items.push({
        id: Number(cards[i].id),
        name: cards[i].innerText,
        image: cards[i].childNodes[0].src,
      });
    }
    props.setSelectedItems(items);
  }

  return (
    <BoardContainer
      id={props.id}
      className={props.className}
      onDrop={drop}
      onDragOver={dragOver}
    >
      {props.children}
    </BoardContainer>
  );
}

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 90%;
`;

export default Board;
