import { fireEvent, render, screen } from '@testing-library/react';
import SearchSection from '@/components/search-section';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { PARAMS } from '@/consts';

const searchTerm = 'something';
const searchParams = {
  get: (param: string) => {
    if (param === PARAMS.search) return searchTerm;
  },
};

const setSearchParams = vi.fn();

vi.mock('react-router', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useSearchParams: () => [searchParams, setSearchParams],
  };
});

describe('Search section component', () => {
  render(
    <MemoryRouter>
      <SearchSection />
    </MemoryRouter>
  );

  it('the component retrives the value from the url', () => {
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input.value).toBe(searchTerm);
  });

  it('Clicking the Search button add search term to the url search query.', () => {
    const inputValue = 'something new';
    const input: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: inputValue } });
    expect(input.value).toBe(inputValue);

    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeInstanceOf(HTMLButtonElement);
    fireEvent.click(searchButton);
    expect(setSearchParams).toBeCalledWith({ search: inputValue });
  });
});
