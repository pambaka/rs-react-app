import Page from '@/app/details/[charid]/page';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(),
  })
) as Mock;

vi.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '',
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
  it('Renders char details if there is a charId', async () => {
    const charid = '1';

    render(
      await Page({
        params: Promise.resolve({ charid }),
        searchParams: Promise.resolve({}),
      })
    );

    const cardTitle = screen.getByText(cardText);
    expect(cardTitle).toBeInstanceOf(HTMLHeadingElement);
  });
});
