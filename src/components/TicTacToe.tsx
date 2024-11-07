import React, { useState, useEffect } from "react";
import "../css/TicTacToe.css";

interface TicTacToeProps {
  size?: number;
}

const TicTacToe: React.FC<TicTacToeProps> = ({ size = 3 }) => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(size * size).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [playWithAI, setPlayWithAI] = useState<boolean>(false);

  useEffect(() => {
    if (playWithAI && !isXNext && !calculateWinner(squares, size)) {
      const aiIndex = aiMove(squares);
      if (aiIndex !== -1) {
        const newSquares = [...squares];
        newSquares[aiIndex] = "O";
        setSquares(newSquares);
        setIsXNext(true);
      }
    }
  }, [squares, isXNext, playWithAI, size]);

  const handleClick = (i: number): void => {
    if (squares[i] || calculateWinner(squares, size) || (!isXNext && playWithAI)) return;

    const newSquares = [...squares];
    newSquares[i] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const aiMove = (squares: (string | null)[]): number => {
    const bestMove = minimax(squares, true);
    return bestMove ? bestMove.index : -1;
  };

  interface Move {
    index: number;
    score: number;
  }

  const minimax = (newSquares: (string | null)[], isMaximizing: boolean): Move => {
    const winner = calculateWinner(newSquares, size);

    if (winner === "O") return { index: -1, score: 1 };
    if (winner === "X") return { index: -1, score: -1 };
    if (!newSquares.includes(null)) return { index: -1, score: 0 };

    const moves: Move[] = [];
    for (let i = 0; i < newSquares.length; i++) {
      if (newSquares[i] === null) {
        const move: Move = { index: i, score: 0 };

        newSquares[i] = isMaximizing ? "O" : "X";
        const result = minimax(newSquares, !isMaximizing);
        move.score = result.score;
        newSquares[i] = null;

        moves.push(move);
      }
    }

    let bestMove: Move | undefined;
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (const move of moves) {
        if (move.score > bestScore) {
          bestScore = move.score;
          bestMove = move;
        }
      }
    } else {
      let bestScore = Infinity;
      for (const move of moves) {
        if (move.score < bestScore) {
          bestScore = move.score;
          bestMove = move;
        }
      }
    }

    return bestMove || { index: -1, score: 0 };
  };

  const calculateWinner = (squares: (string | null)[], size: number): string | null => {
    const lines: number[][] = [];

    for (let i = 0; i < size; i++) {
      lines.push(Array.from({ length: size }, (_, j) => i * size + j));
    }

    for (let i = 0; i < size; i++) {
      lines.push(Array.from({ length: size }, (_, j) => j * size + i));
    }

    lines.push(Array.from({ length: size }, (_, i) => i * size + i));

    lines.push(Array.from({ length: size }, (_, i) => i * size + (size - i - 1)));

    for (const line of lines) {
      const [a, ...rest] = line;
      if (squares[a] && rest.every((i) => squares[i] === squares[a])) {
        return squares[a];
      }
    }

    return null;
  };

  const resetGame = (): void => {
    setSquares(Array(size * size).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(squares, size);
  const status = winner
    ? `Winner: ${winner}`
    : squares.every((square) => square !== null)
    ? "It's a draw!"
    : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {squares.map((square, i) => (
          <button key={i} className="square" onClick={() => handleClick(i)}>
            {square}
          </button>
        ))}
      </div>
      <p>{status}</p>
      <button onClick={resetGame}>Play Again</button>
      <div>
        <button
          className={!playWithAI ? "active" : ""}
          onClick={() => {
            setPlayWithAI(false);
            resetGame();
          }}
        >
          Play vs Player
        </button>
        <button
          className={playWithAI ? "active" : ""}
          onClick={() => {
            setPlayWithAI(true);
            resetGame();
          }}
        >
          Play vs AI
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
