import Loader from '@/components/loader';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Loader component', () => {
  it('Loader is rendered', () => {
    render(<Loader />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInstanceOf(HTMLDivElement);
  });
});
