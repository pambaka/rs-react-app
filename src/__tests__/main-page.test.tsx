import MainPage from '@/components/pages/main-page';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import StoreProvider from '@/providers/store-provider';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => ({ get: vi.fn() }),
}));

describe('Main page component', () => {
  it('Render test', () => {
    render(
      <StoreProvider>
        <MainPage />
      </StoreProvider>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(3);
  });
});
