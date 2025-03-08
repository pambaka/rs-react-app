import Loader from '@/components/loader';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useContext: () => ({
      isLoading: true,
    }),
  };
});

describe('Loader component', () => {
  it('Loader is rendered when isLoading true', () => {
    render(<Loader />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInstanceOf(HTMLDivElement);
  });
});
