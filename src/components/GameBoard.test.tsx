import {render as rawRender, screen, userEvent} from '@testing-library/react-native';
import GameBoard from './GameBoard';
import {ThemeProvider} from '@shopify/restyle';
import theme from '../theme';

const Providers = ({children}) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

const render: typeof rawRender = (component, options) =>
  rawRender(component, {
    wrapper: Providers,
    ...options,
  });

describe('GameBoard', () => {
  it('should declare the next turn', async () => {
    // Assemble
    const user = userEvent.setup();

    // Act
    render(<GameBoard />);

    const getCell = (rowIdx: number, colIdx: number) => screen.getByRole('button', {name: `${rowIdx},${colIdx}`});

    const cells = [
      [getCell(0, 0), getCell(0, 1), getCell(0, 2)],
      [getCell(1, 0), getCell(1, 1), getCell(1, 2)],
      [getCell(2, 0), getCell(2, 1), getCell(2, 2)],
    ];

    await userEvent.press(cells[0][0]); // O
    await userEvent.press(cells[0][1]); // X
    await userEvent.press(cells[1][0]); // O
    await userEvent.press(cells[2][0]); // X
    await userEvent.press(cells[1][1]); // O

    const statusText = screen.getByRole('text', {name: 'Game status'});
    expect(statusText).toHaveTextContent('Next turn: X');

    const nextGameButton = screen.queryByRole('button', {
      name: 'Next game button',
    });
    expect(nextGameButton).not.toBeOnTheScreen();
  });

  it('should declare game over', async () => {
    // Assemble
    const user = userEvent.setup();

    // Act
    render(<GameBoard />);

    const getCell = (rowIdx: number, colIdx: number) => screen.getByRole('button', {name: `${rowIdx},${colIdx}`});

    const cells = [
      [getCell(0, 0), getCell(0, 1), getCell(0, 2)],
      [getCell(1, 0), getCell(1, 1), getCell(1, 2)],
      [getCell(2, 0), getCell(2, 1), getCell(2, 2)],
    ];

    await userEvent.press(cells[0][0]); // O
    await userEvent.press(cells[1][1]); // X
    await userEvent.press(cells[0][1]); // O
    await userEvent.press(cells[0][2]); // X
    await userEvent.press(cells[2][0]); // O
    await userEvent.press(cells[1][0]); // X
    await userEvent.press(cells[1][2]); // O
    await userEvent.press(cells[2][1]); // X
    await userEvent.press(cells[2][2]); // X

    const statusText = screen.getByRole('text', {name: 'Game status'});
    expect(statusText).toHaveTextContent('Game over!');

    const nextGameButton = screen.queryByRole('button', {
      name: 'Next game button',
    });
    expect(nextGameButton).toBeOnTheScreen();
  });

  it('should declare a winner', async () => {
    // Assemble
    const user = userEvent.setup();

    // Act
    render(<GameBoard />);

    const getCell = (rowIdx: number, colIdx: number) => screen.getByRole('button', {name: `${rowIdx},${colIdx}`});

    const cells = [
      [getCell(0, 0), getCell(0, 1), getCell(0, 2)],
      [getCell(1, 0), getCell(1, 1), getCell(1, 2)],
      [getCell(2, 0), getCell(2, 1), getCell(2, 2)],
    ];

    await userEvent.press(cells[0][0]); // O
    await userEvent.press(cells[0][1]); // X
    await userEvent.press(cells[1][0]); // O
    await userEvent.press(cells[2][0]); // X
    await userEvent.press(cells[1][1]); // O
    await userEvent.press(cells[2][1]); // X
    await userEvent.press(cells[2][2]); // O

    const statusText = screen.getByRole('text', {name: 'Game status'});
    expect(statusText).toHaveTextContent('O wins!');

    const nextGameButton = screen.queryByRole('button', {
      name: 'Next game button',
    });
    expect(nextGameButton).toBeOnTheScreen();
  });
});
