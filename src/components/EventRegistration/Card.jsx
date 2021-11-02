import React from 'react';
import styled from 'styled-components';

function Card(props) {
  const dragStart = (e) => {
    const target = e.target;

    e.dataTransfer.setData('cardId', target.id);
  };

  const dragOver = (e) => {
    e.stopPropagation();
  };

  return (
    <CardContent
      id={props.id}
      className={props.className}
      draggable={props.draggable}
      onDragStart={dragStart}
      onDragOver={dragOver}
      image={props.image}
    >
      {props.children}
    </CardContent>
  );
}

const CardContent = styled.div`
  display: flex;
  padding: 10px 25px;
  border: 1px solid #f3f3f3;
  border-radius: 5px;
  box-shadow: rgb(235 235 235) 3px 3px 5px;
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 15px;
  font-weight: bold;
  height: 60px;
  align-items: center;
`;

export default Card;
