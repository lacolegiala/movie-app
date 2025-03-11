import { render, screen } from '@testing-library/react'
import Home from './Home'
import { expect, test } from 'vitest'

test('renders the basic headers', () => {
  render(<Home />)

  const newMoviesDisplayText = screen.getByText('New')
  expect(newMoviesDisplayText).toBeDefined()

  const mostPopularMoviesDisplayText = screen.getByText('Most popular')
  expect(mostPopularMoviesDisplayText).toBeDefined()

  const genreText = screen.getByText('Genres')
  expect(genreText).toBeDefined()

  const topRatedMoviesDisplayText = screen.getByText('Top rated')
  expect(topRatedMoviesDisplayText).toBeDefined()
})