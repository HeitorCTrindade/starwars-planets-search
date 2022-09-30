import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

// referencia https://bobbyhadz.com/blog/react-sleep-function
const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

describe('Test Component "MainPage"', () => {
  test('Os elmentos de entrada de dados são renderizados corretamente', async () => {
    render(<App />);
    await sleep(4000);
    const nameFilterInputText = screen.getByTestId('name-filter');
    const columFilterSelect = screen.getByTestId('column-filter');
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    const valueInputNumber = screen.getByTestId('value-filter');

    expect(nameFilterInputText).toBeInTheDocument();
    expect(columFilterSelect).toBeInTheDocument();
    expect(comparisonFilterSelect).toBeInTheDocument();
    expect(valueInputNumber).toBeInTheDocument();
  });

  test('Se os filtros tem o funcionamento esperado', async () => {
    render(<App />);
    await sleep(4000);
    const nameFilterInputText = screen.getByTestId('name-filter');
    const columFilterSelect = screen.getByTestId('column-filter');
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    const valueInputNumber = screen.getByTestId('value-filter');
    const btnFilterByValue = screen.getByTestId('button-filter');

    userEvent.type(nameFilterInputText, 'ta')
    let getListPlanets = screen.getAllByTestId('planet-name');
    expect(getListPlanets.length).toBe(1);
  });
});
