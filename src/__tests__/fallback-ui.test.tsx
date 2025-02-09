import FallbackUi from '../components/fallback-ui/fallback-ui';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Fallback UI component', () => {
  it('Render test', () => {
    render(<FallbackUi />);

    const message = screen.getByText(
      'Something went wrong, please reload the page'
    );
    expect(message).toBeDefined();
  });
});
