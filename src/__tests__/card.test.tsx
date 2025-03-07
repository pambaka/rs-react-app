import Card from '@/components/card/';
import { describe, expect, it, Mock, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

const searchQuery = 'searchQuery';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: () => ({ toString: () => searchQuery }),
}));

describe('Detailed card component', () => {
  const mockRouter = {
    push: vi.fn(),
  };
  (useRouter as Mock).mockReturnValue(mockRouter);

  render(<Card />);

  it('Renders detailed card component', () => {
    const card = screen.getByTestId('detailedCard');
    expect(card).toBeDefined();
  });

  it('Close the card on close button click', () => {
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInstanceOf(HTMLButtonElement);
    fireEvent.click(closeButton);
    expect(mockRouter.push).toBeCalledWith(`/?${searchQuery}`);
  });
});
