import ResultsSection from '../components/results-section/results-section';
import { MemoryRouter } from 'react-router-dom';
import { Character } from '../types';
import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { getChar, mockStore } from './mocks';
import { MESSAGES } from '../consts';
import { Provider } from 'react-redux';

describe('Results section component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('An appropriate message is displayed if no cards are present', () => {
    const results: Character[] = [];
    render(<ResultsSection results={results}></ResultsSection>);

    const message = screen.getByText(MESSAGES.notFound);
    expect(message).toBeInstanceOf(HTMLDivElement);
  });

  it('The component renders the specified number of cards', () => {
    const results: Character[] = [];
    const numberOfChar = Math.ceil(Math.random() * 10);

    for (let i = 0; i < numberOfChar; i += 1) {
      results.push(getChar(i));
    }

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ResultsSection results={results} />
        </MemoryRouter>
      </Provider>
    );

    const cards = screen.getAllByText('someName');
    expect(cards.length).toBe(numberOfChar);
  });
});
