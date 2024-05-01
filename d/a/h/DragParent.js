import React from 'react';
import ColumnThree from './ColumnThree';
import ColumnTwo from './ColumnTwo';
import ColumnOne from './ColumnOne';
import Header from './Header';
import './gridContianer.css';
import { Paper } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import useCardStore from './columnOne/cardStore';

const GridTest = () => {
  const { cards, updateIndex } = useCardStore();

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || (destination.droppableId !== source.droppableId)) {
      return;
    }
    if (destination.index === source.index) {
      return;
    }

    const updatedCards = Array.from(cards.rawData);
    const movedCard = updatedCards.find(card => card.id.toString() === draggableId);
    updatedCards.splice(source.index, 1);
    updatedCards.splice(destination.index, 0, movedCard);

    updateIndex(updatedCards);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Paper>
        <div className="gridcontainer__layout">
          <Header />
          <ColumnOne typeName="columnOne"/>
          <ColumnTwo />
          <ColumnThree />
        </div>
      </Paper>
    </DragDropContext>
  );
};

export default GridTest;
