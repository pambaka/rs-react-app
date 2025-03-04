import Page from '@/pages/404';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Not found page', () => {
  it('Renders not found page', () => {
    render(<Page />);

    const message = screen.getByText('Page not found');
    expect(message).toBeInstanceOf(HTMLHeadingElement);
  });
});
