type PosterWidth = 45 | 92 | 154 | 185 | 300 | 342 | 500 | 780

export const createPosterUrl = (poster_path: string, options: {width: PosterWidth}) => {
  const posterBaseUrl = 'http://image.tmdb.org/t/p/'
  return `${posterBaseUrl}w${options.width}${poster_path}`
}