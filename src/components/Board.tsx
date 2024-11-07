import React from "react";
import Square from "./Square";

interface BoardProps {
  size: number;
  squares: (string | null)[];
  onClick: (i: number) => void;
}

const Board: React.FC<BoardProps> = ({ size, squares, onClick }) => {
  const renderSquare = (i: number) => <Square key={i} value={squares[i]} onClick={() => onClick(i)} />;

  const renderRow = (rowIndex: number) => {
    const row: JSX.Element[] = []; // Khai báo kiểu JSX.Element[] cho row
    for (let i = 0; i < size; i++) {
      row.push(renderSquare(rowIndex * size + i));
    }
    return (
      <div key={rowIndex} className="board-row">
        {row}
      </div>
    );
  };

  const boardRows: JSX.Element[] = []; // Khai báo kiểu JSX.Element[] cho boardRows
  for (let i = 0; i < size; i++) {
    boardRows.push(renderRow(i));
  }

  return <div className="board">{boardRows}</div>;
};

export default Board;
