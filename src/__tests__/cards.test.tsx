import Card from '../components/cards/cards';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getChar, mockChar } from './mocks';

const id = 2;
const testId = 'testId';

describe('Card component', () => {
  render(
    <BrowserRouter>
      <div data-testid={testId}>
        <Card people={[getChar(id)]} />
      </div>
    </BrowserRouter>
  );

  it('The card component renders the relevant card data', () => {
    const title = screen.getByText(mockChar.name);
    expect(title).toBeDefined();
  });

  it('Clicking on a card opens a detailed card component', () => {
    const div = screen.getByTestId(testId);
    const card = div.firstElementChild;
    expect(card).toBeInstanceOf(HTMLDivElement);

    if (card instanceof HTMLDivElement) {
      fireEvent.click(card);
      expect(location.pathname).toBe(`/details/${id}/`);
    }
  });
});
