import { describe, expect, it, Mock, vi } from 'vitest';
import Pagination from '@/components/pagination';
import { PARAMS } from '@/consts';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { Response } from '@/types';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('react', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useContext: (): Response => ({
      swResponse: {
        previous: 'previous page',
        next: 'next page',
        results: [],
      },
      message: null,
    }),
  };
});

describe('Pagination component', () => {
  const page: string = '5';
  const mockRouter = {
    query: { [PARAMS.search]: '', [PARAMS.page]: page },
    push: vi.fn(() => new Promise(() => {})),
  };
  (useRouter as Mock).mockReturnValue(mockRouter);

  it('The component updates URL query parameter when page changes', async () => {
    render(<Pagination />);

    const nextButton = screen.getByRole('button', { name: '>' });
    fireEvent.click(nextButton);
    expect(mockRouter.push).toBeCalledWith(`?page=${+page + 1}`);

    const prevButton = screen.getByRole('button', { name: '<' });
    fireEvent.click(prevButton);
    expect(mockRouter.push).toBeCalledWith(`?page=${+page - 1}`);
  });
});
