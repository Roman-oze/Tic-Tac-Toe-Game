import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="h-16 w-16 md:h-20 md:w-20 bg-white border border-gray-300 text-xl md:text-2xl font-bold rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-200 flex items-center justify-center"
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  const status = winner ? `🎉 Winner: ${winner}` : `Next player: ${xIsNext ? "❌" : "⭕"}`;

  function handClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="flex justify-center mt-6">
        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-5 py-2 rounded-full shadow-md">
          {status}
        </span>
      </div>

      <div className="grid grid-cols-3 text-black gap-3 justify-center mx-auto mt-6 max-w-xs md:max-w-sm">
        {squares.map((value, index) => (
          <Square key={index} value={value} onSquareClick={() => handClick(index)} />
        ))}
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  const moveHistory = history.map((_, move) => {
    const description = move ? `Move #${move}` : "Start Game";
    return (
      <li key={move} className="mb-2">
        <button
          onClick={() => jumpTo(move)}
          className="w-full text-left px-4 py-2 rounded-full bg-white text-blue-700 font-medium border border-blue-300 hover:bg-blue-100 transition"
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-start gap-8">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />

        <div className="w-full md:w-1/3 bg-gray-800 p-4 rounded-xl shadow-lg max-h-[400px] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Move History</h2>
          <ol>{moveHistory}</ol>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
