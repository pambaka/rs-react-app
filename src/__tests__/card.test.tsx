import Card from '../components/card/card';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const navigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe('Detailed card component', () => {
  render(
    <BrowserRouter>
      <Card />
    </BrowserRouter>
  );

  it('Renders detailed card component', () => {
    const card = screen.getByTestId('detailedCard');
    expect(card).toBeDefined();
  });

  it('Close the card on close button click', () => {
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInstanceOf(HTMLButtonElement);
    fireEvent.click(closeButton);
    expect(navigate).toBeCalledWith('/?');
  });
});
