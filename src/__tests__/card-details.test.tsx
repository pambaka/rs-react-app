import { describe, expect, it, vi } from 'vitest';
import CardDetails from '@/components/card-details';
import { render, screen } from '@testing-library/react';
import { mockChar } from './mocks';
import { CharResponse } from '@/types';

vi.mock('react', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useContext: (): CharResponse => ({
      character: mockChar,
      message: null,
    }),
  };
});

describe('Card details component', () => {
  it('Renders card details', () => {
    render(<CardDetails />);

    const title = screen.getByText('someName');
    expect(title).toBeInstanceOf(HTMLHeadingElement);
  });
});
