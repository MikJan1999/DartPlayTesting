import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HomePage from '../../src/pages/home/HomePage.jsx';

// Mock dekoracyjnych komponentów
vi.mock('../../src/components/headers/DecorativeHeader.jsx', () => ({
  DecorativeHeader: () => <div data-testid="header" />,
  DecorativeHeaderSpace: ({ children }) => <div data-testid="space">{children}</div>,
}));

// Mock hooka useHomePage
vi.mock('../../src/pages/home/hooks/useHomePage.jsx', () => ({
  default: vi.fn(),
}));

import useHomePage from '../../src/pages/home/hooks/useHomePage.jsx';

/** @type {import('vitest').Mock} */
const mockedUseHomePage = useHomePage;

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('nie pokazuje linku do niedokończonej gry, gdy hasUnfinishedGame = false', () => {
    mockedUseHomePage.mockReturnValue({
      unfinishedGame: { hasUnfinishedGame: false, url: '' },
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.queryByText('Jest zapisana niedokończona rozgrywka.')).toBeNull();
  });

  it('pokazuje link do niedokończonej gry, gdy hasUnfinishedGame = true', () => {
    mockedUseHomePage.mockReturnValue({
      unfinishedGame: { hasUnfinishedGame: true, url: '/games/type/cricket/game/board' },
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Jest zapisana niedokończona rozgrywka.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Kontynuuj rozgrywkę' })).toHaveAttribute(
      'href',
      '/games/type/cricket/game/board'
    );
  });

  it('renderuje linki: Graj, O aplikacji, Historia zmian', () => {
    mockedUseHomePage.mockReturnValue({
      unfinishedGame: { hasUnfinishedGame: false, url: '' },
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Graj' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'O aplikacji' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Historia zmian' })).toBeInTheDocument();
  });
});
