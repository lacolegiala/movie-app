import { render, screen } from '@testing-library/react'
import Home from './Home'
import { beforeEach, expect, test, vi } from 'vitest'

test('renders content when not logged in', () => {
  render(<Home />)

  const newMoviesDisplayText = screen.getByText('New')
  expect(newMoviesDisplayText).toBeDefined()
})