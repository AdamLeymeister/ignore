import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { getCards } from './columnOne/getCardData';
import { useQuery } from 'react-query';
import useCardStore from './columnOne/cardStore';
import AddCard from './columnOne/AddCard';
import './test.css';

const ColumnOne = ({ typeName }) => {
  const { cards, setCards } = useCardStore();

  const { isLoading, error, data: cardData } = useQuery('cards', getCards, {
    onSuccess: (res) => {
      setCards(res);
    },
  });

  React.useEffect(()  => {
    console.log('cards', cards)
  }, [cards]);

  if (error) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;

return (
    <Droppable droppableId="columnOne" direction="vertical">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`gridcontainer__columnone ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
        >
          <div 
          className={`gridcontainer__columnone ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
          >
            {cards?.rawData?.filter(item => item.type === typeName).map((item, index) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided, snapshot) => {
                  const style = {
                    ...provided.draggableProps.style,
                    height: snapshot.isDragging ? '0px' : '',
                    margin: snapshot.isDragging ? '0px' : '',
                  };

                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={style}
                      className={snapshot.isDragging ? 'dragging' : ''}
                    >
                      <AddCard item={item} />
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default ColumnOne;
