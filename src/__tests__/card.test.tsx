import Card from '../components/cards/cards';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { mockChar } from './mocks';

describe('Card component', () => {
  render(
    <BrowserRouter>
      <Card people={[mockChar]} />
    </BrowserRouter>
  );

  it('The card component renders the relevant card data', () => {
    const title = screen.getByText(mockChar.name);
    expect(title).toBeDefined();
  });
});
