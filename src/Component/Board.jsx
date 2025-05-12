import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="shadow-md bg-white border border-gray-400 h-12 w-12 m-1 leading-9 text-lg rounded-full"
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const [xIsNext, setXIsNext] = useState(true);

  function handClick(i) {
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <Square value={squares[0]} onSquareClick={() => handClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handClick(2)} />
      </div>

      <div className="flex flex-wrap justify-center">
        <Square value={squares[3]} onSquareClick={() => handClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handClick(5)} />
      </div>

      <div className="flex flex-wrap justify-center">
        <Square value={squares[6]} onSquareClick={() => handClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handClick(8)} />
      </div>
    </>
  );
}
