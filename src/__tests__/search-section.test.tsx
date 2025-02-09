import { fireEvent, render, screen } from '@testing-library/react';
import SearchSection from '../components/search-section/search-section';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SEARCH_VALUE } from '../consts';

const fetchData = vi.fn(() => Promise.resolve());

const inputValue = 'testValue';

const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

describe('Search section component', () => {
  render(
    <MemoryRouter>
      <SearchSection fetchData={fetchData} />
    </MemoryRouter>
  );

  it('the component retrieves the value from the local storage upon mounting', () => {
    expect(getItemSpy).toHaveBeenCalledWith(SEARCH_VALUE);
  });

  it('Clicking the Search button saves the entered value to the local storage.', () => {
    const input: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: inputValue } });
    expect(input.value).toBe(inputValue);

    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeInstanceOf(HTMLButtonElement);
    fireEvent.click(searchButton);
    expect(setItemSpy).toHaveBeenCalledWith(SEARCH_VALUE, inputValue);
  });
});
