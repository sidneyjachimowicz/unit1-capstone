import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Landing from './Landing';

describe('Landing', () => {
  it('renders a welcome heading', () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /welcome to spoonful/i })).toBeInTheDocument();
  });

  it('has a link to explore recipes', () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    const exploreLink = screen.getByText('Explore Recipes').closest('a');
    expect(exploreLink).toHaveAttribute('href', '/recipes');
  });

  it('has a link to login', () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    const loginLink = screen.getByText('Login').closest('a');
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});