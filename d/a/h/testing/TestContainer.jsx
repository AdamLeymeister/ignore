import React, { useState } from "react";
import DragDropContainer from "./DragDropContainer";
import Card from "./components/Card"; // Import Card component
import "./App.css";

const TestContainer = () => {
  const [originalBgColor, setOriginalBgColor] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);
  const [cards, setCards] = useState([
    { id: 12, title: "Card 1", content: "This is card 1", columnId: "column-1" },
    { id: 22, title: "Card 2", content: "This is card 2", columnId: "column-1" },
    { id: 23, title: "Card 3", content: "This is card 3", columnId: "column-2" },
    { id: 44, title: "Card 4", content: "This is card 4", columnId: "column-3" },
  ]);
  const [dragging, setDragging] = useState(false);

  const columns = [
    { id: "column-1", title: "Column 1" },
    { id: "column-2", title: "Column 2" },
    { id: "column-3", title: "Column 3" },
    { id: "column-4", title: "Column 4" },
  ];

  return (
    <div className="App">
      <h1>Drag and Drop Example</h1>
      <DragDropContainer
        columns={columns}
        cards={cards}
        setCards={setCards}
        dragging={dragging}
        setDragging={setDragging}
        currentPos={currentPos}
        originalBgColor={originalBgColor}
        setOriginalBgColor={setOriginalBgColor}
        setCurrentPos={setCurrentPos}
        childComponent={Card} // Pass Card component as childComponent prop
      />
    </div>
  );
};

export default TestContainer;
