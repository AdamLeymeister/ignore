import React from "react";

const Card = ({
  title,
  content,
  handleDragStart,
  handleDragOver,
  handleDrop,
  onClick,
}) => {
  return (
    <div
      className="Card"
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={onClick}
    >
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Card;