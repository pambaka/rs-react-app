import Page from '@/pages/details/[charid]';
import { CharResponse, Response } from '@/types';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { mockChar, mockEmptySwResponse } from './mocks';

global.fetch = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => ({
    pathname: 'details',
  }),
}));

const text = 'Main page';
vi.mock('@/components/pages/main-page', () => ({
  default: () => <h1>{text}</h1>,
}));

const cardText = 'The card with details';
vi.mock('@/components/card', () => ({
  default: () => <h2>{cardText}</h2>,
}));

describe('Next.js Pages router details page', () => {
  it('Renders char details if the path is "/details"', () => {
    const response: Response = {
      swResponse: mockEmptySwResponse,
      message: null,
    };
    const charResponse: CharResponse = { character: mockChar, message: null };

    render(<Page response={response} charResponse={charResponse} />);

    const cardTitle = screen.getByText(cardText);
    expect(cardTitle).toBeInstanceOf(HTMLHeadingElement);
  });
});
