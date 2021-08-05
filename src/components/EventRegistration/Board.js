import React from 'react';

function Board(props) {
  const drop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');

    const card = document.getElementById(cardId);
    card.style.display = 'block';

    e.target.appendChild(card);

    const cards = document.getElementsByClassName('board')[1].childNodes;
    setItems(cards);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  function setItems(cards) {
    const items = [];
    cards.forEach((card) => {
      items.push(card.innerText);
    });
    props.setSelectedItems(items);
  }

  return (
    <div
      id={props.id}
      className={props.className}
      onDrop={drop}
      onDragOver={dragOver}
    >
      {props.children}
    </div>
  );
}

export default Board;
