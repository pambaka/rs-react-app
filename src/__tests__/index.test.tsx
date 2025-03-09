import Page from '@/pages/index';
import { Response } from '@/types';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { mockEmptySwResponse } from './mocks';

global.fetch = vi.fn();

const text = 'Main page';
vi.mock('@/components/pages/main-page', () => ({
  default: () => <h1>{text}</h1>,
}));

describe('Next.js Pages router main page', () => {
  it('Renders main page', () => {
    const response: Response = {
      swResponse: mockEmptySwResponse,
      message: null,
    };

    render(<Page response={response} />);

    const heading = screen.getByText(text);
    expect(heading).toBeInstanceOf(HTMLHeadingElement);
  });
});
