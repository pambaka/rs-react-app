import Card from '../components/card/card';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { mockChar } from './mocks';

const navigate = vi.fn();

vi.mock('react-router', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe('Detailed card component', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Card char={mockChar} message={undefined} />
      </BrowserRouter>
    </Provider>
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
