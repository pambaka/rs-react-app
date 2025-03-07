import Page from '@/app/page';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(),
  })
) as Mock;

const text = 'Main page';
vi.mock('@/components/pages/main-page', () => ({
  default: () => <h1>{text}</h1>,
}));

describe('Next.js App router main page', () => {
  it('Renders main page', async () => {
    render(
      await Page({
        searchParams: Promise.resolve({ search: '' }),
      })
    );

    const heading = screen.getByText(text);
    expect(heading).toBeInstanceOf(HTMLHeadingElement);
  });
});
