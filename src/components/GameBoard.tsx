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

const GameBoard = () => {
  const [cells, setCells] = useState(structuredClone(initialCells));
  const [turnDeque, setTurnDeque] = useState([...initialTurnDeque]);

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
    setCells(structuredClone(initialCells));
    setTurnDeque([...initialTurnDeque]);
  };

  const isBoardFull = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (cells[row][col] === '') {
          return false; // Found an empty cell, so the cells is not full
        }
      }
    }
    return true; // No empty cells found, the cells is full
  };

  const getWinner = () => {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (cells[i][0] === cells[i][1] && cells[i][1] === cells[i][2] && cells[i][0] !== '') {
        return cells[i][0];
      }
      if (cells[0][i] === cells[1][i] && cells[1][i] === cells[2][i] && cells[0][i] !== '') {
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
  };

  const gameStatus = (() => {
    const winner = getWinner();
    if (winner !== null) {
      return `${winner} wins!`;
    }

    const gameOver = isBoardFull();
    if (gameOver) {
      return 'Game over!';
    }

    return `Next turn: ${turnDeque[0]}`;
  })();

  const isGameOver = getWinner() !== null || isBoardFull();

  return (
    <Box gap="s">
      <Box gap="m" mb="l">
        {cells.map((row, rowIdx) => (
          <Box flexDirection="row" gap="m">
            {row.map((col, colIdx) => (
              <GameCell
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
