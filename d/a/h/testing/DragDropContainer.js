import React, { useRef } from "react";

import "./App.css";

const cardIndex = (cards, card) => {
  return cards.findIndex((c) => c.id === card.id);
};

const getCardsByColumnId = (cards, columnId) => {
  return cards.filter((card) => card.columnId === columnId);
};

const Column = ({
  childComponent,
  cards,
  columnId,
  handleDragOver,
  handleDrop,
  handleDragEnter,
  handleDragLeave,
  handleCardClick,
  handleDragStart,
}) => {
  const filteredCards = getCardsByColumnId(cards, columnId);

  return (
    <div
      className="Column"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => handleDrop(event, columnId)}
      onDragEnter={(event) => handleDragEnter(event, columnId)}
      onDragLeave={(event) => handleDragLeave(event, columnId)}
    >
      <h2>Column {columnId.slice(-1)}</h2>
      {filteredCards.map((card, index) => {
        const Child = childComponent;
        return (
          <Child
            key={card.id + "-" + index}
            id={card.id}
            title={card.title}
            content={card.content}
            index={index}
            handleDragStart={(event) =>
              handleDragStart(event, card.id, index, card.columnId)
            }
            handleDragOver={(event) =>
              handleDragOver(event, index, card.columnId)
            }
            handleDrop={(event) => handleDrop(event, card.columnId)}
            onClick={() => handleCardClick(card.id)}
          />
        );
      })}
    </div>
  );
};

const DragDropContainer = ({
  childComponent,
  columns,
  cards,
  setCards,
  originalBgColor,
  setOriginalBgColor,
  dragging,
  setDragging,
  currentPos,
  setCurrentPos,
}) => {
  const dragItem = useRef(null);
  const dragNode = useRef(null);

  const handleDragStart = (event, cardId, position, columnId) => {
    setCurrentPos(position);
    dragItem.current = { id: cardId, position, columnId };
    dragNode.current = event.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", cardId);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnd = (event) => {
    const targetColumn = event.target.closest(".Column");
    if (dragging && !targetColumn) {
      // Card is not dropped on a valid target, so revert it back to the original position
      let newCards = [...cards];
      let draggedCard = newCards.find(
        (card) => card.id === dragItem.current.id
      );
      newCards.splice(newCards.indexOf(draggedCard), 1); // Remove the card from its current position
      newCards.splice(dragItem.current.position, 0, draggedCard); // Insert the card back into its original position
      setCards(newCards);
    } else if (dragging) {
      // Card is dropped on a valid target, update the card's position and column
      let newCards = [...cards];
      let draggedCard = newCards.find(
        (card) => card.id === dragItem.current.id
      );
      let targetColumnId = targetColumn.getAttribute("data-column-id");
      draggedCard.columnId = targetColumnId;
      newCards.splice(newCards.indexOf(draggedCard), 1); // Remove the card from its original position
      let cardsInTargetColumn = newCards.filter(
        (card) => card.columnId === targetColumnId
      );
      let targetIndex = cardsInTargetColumn.length;
      if (currentPos < targetIndex) {
        targetIndex--;
      }
      newCards.splice(targetIndex, 0, draggedCard); // Insert the card into its new position
      setCards(newCards);
    }

    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
    setCurrentPos(null);
  };

const handleDragOver = (event, index, columnId) => {
  event.preventDefault();
  if (!dragging) {
    return;
  }
  let draggedIndex = parseInt(dragItem.current.position);
  let dropIndex = index;
  if (draggedIndex === dropIndex && columnId === dragItem.current.columnId) {
    return;
  }

  let draggedCard = cards.find((card) => card.id === dragItem.current.id);

  let newCards = [...cards];

  if (draggedCard.columnId === columnId) {
    if (draggedIndex === dropIndex) {
      return;
    }
    newCards.splice(draggedIndex, 1);
    newCards.splice(dropIndex, 0, draggedCard);
  } else {
    newCards = cards.filter((card) => card.id !== draggedCard.id);
    draggedCard.columnId = columnId;
    newCards.splice(dropIndex, 0, draggedCard);
  }

  setCards(newCards);
  dragItem.current.position = dropIndex;
  dragItem.current.columnId = columnId;
};


  const handleDragEnter = (event, columnId) => {
    event.preventDefault();
    if (!dragging) {
      return;
    }
    if (
      dragItem.current.columnId !== columnId &&
      event.target.classList.contains("Column")
    ) {
      setOriginalBgColor(event.target.style.background);
      event.target.style.background = "lightblue";
    }
  };

  const handleDragLeave = (event, columnId) => {
    event.preventDefault();
    if (!dragging) {
      return;
    }
    if (
      dragItem.current.columnId !== columnId &&
      event.target.classList.contains("Column")
    ) {
      event.target.style.background = originalBgColor;
    }
  };

  const handleDrop = (event, columnId) => {
    event.preventDefault();
    if (!dragging) {
      return;
    }
    if (event.target.classList.contains("Column")) {
      event.target.style.background = originalBgColor;
    }
    let draggedCard = cards.find((card) => card.id === dragItem.current.id);
    let newCards = [...cards];
    newCards.splice(cardIndex(newCards, draggedCard), 1); // Remove the card from its current position

    draggedCard.columnId = columnId; // Update the columnId of the dragged card
    newCards.splice(dragItem.current.position, 0, draggedCard); // Insert the card back into its new position

    setCards(newCards);
    setCurrentPos(null);
  };

  const handleCardClick = (cardId) => {
    setCards(cards.filter((card) => card.id !== cardId));
  };

  return (
    <div className="App">
      <div className="Columns">
        {columns.map((column) => (
          <Column
            key={column.id}
            cards={cards}
            columnId={column.id}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
            handleCardClick={handleCardClick}
            handleDragStart={handleDragStart}
            childComponent={childComponent} // Pass Card component as childComponent prop
          />
        ))}
      </div>
    </div>
  );
};

export default DragDropContainer;
