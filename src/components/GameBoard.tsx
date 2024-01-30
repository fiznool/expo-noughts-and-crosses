import React, {useState} from 'react';
import Box from './primitives/Box';
import GameCell from './GameCell';
import Text from './primitives/Text';
import Pressable from './primitives/Pressable';

const initialCells = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];
const initialTurnDeque = ['O', 'X'];

type Cells = typeof initialCells;
type TurnDeque = typeof initialTurnDeque;

const GameBoard = () => {
  const [cells, setCells] = useState<Cells>(structuredClone(initialCells));
  const [turnDeque, setTurnDeque] = useState<TurnDeque>([...initialTurnDeque]);

  const handleCellPress = (rowIdx: number, colIdx: number) => {
    if (cells[rowIdx][colIdx] !== '') {
      // This cell is already full, nothing to do.
      return;
    }

    // Set the cell according to the turn
    const currentTurn = turnDeque[0];
    setCells(currentCells => {
      const newCells = structuredClone(currentCells);
      newCells[rowIdx][colIdx] = currentTurn;
      return newCells;
    });

    // Rotate the turn
    setTurnDeque(turnDeque => [turnDeque[1], turnDeque[0]]);
  };

  const nextGame = () => {
    // Reset the state
    setCells(structuredClone(initialCells));
    setTurnDeque([...initialTurnDeque]);
  };

  const gameStatus = (() => {
    const winner = getWinner(cells);
    if (winner !== null) {
      return `${winner} wins!`;
    }

    const gameOver = isBoardFull(cells);
    if (gameOver) {
      return 'Game over!';
    }

    return `Next turn: ${turnDeque[0]}`;
  })();

  const isGameOver = getWinner(cells) !== null || isBoardFull(cells);

  return (
    <Box gap="s">
      <Box gap="m" mb="l">
        {cells.map((row, rowIdx) => (
          <Box key={rowIdx} flexDirection="row" gap="m">
            {row.map((col, colIdx) => (
              <GameCell
                key={colIdx}
                id={`${rowIdx},${colIdx}`}
                value={col}
                isDisabled={isGameOver}
                onPress={() => handleCellPress(rowIdx, colIdx)}
              />
            ))}
          </Box>
        ))}
      </Box>
      <Text accessibilityRole="text" accessibilityLabel="Game status" variant="subheader" textAlign="center">
        {gameStatus}
      </Text>
      <Box height={60} mt="l">
        {isGameOver && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Next game button"
            backgroundColor="newGameButtonBackground"
            width={200}
            height="100%"
            borderRadius="m"
            alignItems="center"
            justifyContent="center"
            onPress={nextGame}
          >
            <Text variant="button" color="newGameButtonText">
              Next game
            </Text>
          </Pressable>
        )}
      </Box>
    </Box>
  );
};

export default GameBoard;

function isBoardFull(cells: Cells) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (cells[row][col] === '') {
        return false; // Found an empty cell, so the cells is not full
      }
    }
  }
  return true; // No empty cells found, the cells is full
}

function getWinner(cells: Cells) {
  for (let i = 0; i < 3; i++) {
    if (cells[i][0] === cells[i][1] && cells[i][1] === cells[i][2] && cells[i][0] !== '') {
      // Every cell on this row is the same: winner!
      return cells[i][0];
    }
    if (cells[0][i] === cells[1][i] && cells[1][i] === cells[2][i] && cells[0][i] !== '') {
      // Every cell on this column is the same: winner!
      return cells[0][i];
    }
  }

  // Check diagonals
  if (cells[0][0] === cells[1][1] && cells[1][1] === cells[2][2] && cells[0][0] !== '') {
    return cells[0][0];
  }
  if (cells[0][2] === cells[1][1] && cells[1][1] === cells[2][0] && cells[0][2] !== '') {
    return cells[0][2];
  }

  return null;
}
