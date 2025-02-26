import { render, screen } from '@testing-library/react'
import Home from './Home'
import { beforeEach, expect, test, vi } from 'vitest'

// vi.mock('react-router-dom', async () => {
//   const actual = await vi.importActual('react-router-dom')
//   return {
//     ...actual,
//     useHistory: () => ({
//       push: vi.fn(),
//     }),
//   }
// })
// vi.mock('../utils/tmdbApiClient', () => ({
//   tmdbApiClient: {
//     get: vi.fn(() => Promise.resolve({ data: { results: [], genres: [] } })),
//   },
// }));

// beforeEach(() => {
//   vi.clearAllMocks()
// })
test('renders content when not logged in', () => {
  render(<Home />)

  const newMoviesDisplayText = screen.getByText('New')
  expect(newMoviesDisplayText).toBeDefined()
})