import { describe, expect, it, vi } from 'vitest';
import Pagination from '../components/pagination/pagination';
import { PARAMS } from '../consts';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const fetchData = vi.fn(() => Promise.resolve());

describe('Pagination component', () => {
  it('The component updates URL query parameter when page changes', async () => {
    render(
      <BrowserRouter>
        <Pagination
          fetchData={fetchData}
          isNextDisabled={false}
          isPrevDisabled={false}
        />
      </BrowserRouter>
    );

    const nextButton = await screen.findByRole('button', { name: '>' });
    fireEvent.click(nextButton);
    await waitFor(() =>
      expect(new URLSearchParams(location.search).get(PARAMS.page)).toBe('2')
    );
    fireEvent.click(nextButton);
    await waitFor(() =>
      expect(new URLSearchParams(location.search).get(PARAMS.page)).toBe('3')
    );

    const prevButton = screen.getByRole('button', { name: '<' });
    fireEvent.click(prevButton);
    await waitFor(() =>
      expect(new URLSearchParams(location.search).get(PARAMS.page)).toBe('2')
    );
  });
});
