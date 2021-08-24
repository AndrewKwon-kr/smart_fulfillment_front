import React from 'react';
import styled from 'styled-components';

function Board(props) {
  const drop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');

    const card = document.getElementById(cardId);
    if (card) {
      card.style.display = 'block';

      e.target.appendChild(card);
    }

    const cards = document.getElementsByClassName('board')[1].childNodes;
    setItems(cards);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  function setItems(cards) {
    const items = [];
    cards.forEach((card) => {
      items.push({
        id: card.id,
        name: card.innerText,
        image: card.childNodes[0].src,
      });
    });
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
