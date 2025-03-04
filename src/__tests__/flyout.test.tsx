import Flyout from '@/components/flyout';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore } from './mocks';

URL.createObjectURL = vi.fn();

describe('Flyout component', () => {
  it('Flyout component is visible when selected cards array is not empty', () => {
    render(
      <Provider store={mockStore}>
        <Flyout />
      </Provider>
    );

    const unselectButton = screen.getByRole('button', {
      name: 'Unselect\xa0all',
    });
    expect(unselectButton).toBeDefined();
  });
});
