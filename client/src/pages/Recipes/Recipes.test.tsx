import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Recipes from './Recipes';

vi.mock('axios');

describe('Recipes', () => {
  it('shows a loading state initially', () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <Recipes />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading recipes/i)).toBeInTheDocument();
  });

  it('renders recipe cards once data loads', async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: [
        {
          _id: '1',
          title: 'Test Recipe',
          description: 'A tasty test recipe',
          image: 'https://example.com/image.jpg',
          ingredients: [{ name: 'Salt', quantity: '1 tsp' }],
          instructions: [{ step: 1, description: 'Mix it' }],
          tags: ['test'],
        },
      ],
    });

    render(
      <MemoryRouter>
        <Recipes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    });
  });

  it('shows "No matching recipes found" when the list is empty', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <Recipes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/no matching recipes found/i)).toBeInTheDocument();
    });
  });
});