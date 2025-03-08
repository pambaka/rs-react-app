import { describe, expect, it, Mock, vi } from 'vitest';
import Pagination from '@/components/pagination';
import { PARAMS } from '@/consts';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

const page = '5';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: () => '',
  useSearchParams: () => ({
    get: (param: string) => {
      if (param === PARAMS.page) return page;
    },
  }),
}));

vi.mock('react', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useContext: () => ({
      swResponse: {
        previous: 'previous page',
        next: 'next page',
        results: [],
      },
      message: null,
      changeIsLoading: vi.fn(),
    }),
  };
});

describe('Pagination component', () => {
  const mockRouter = {
    push: vi.fn(),
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
