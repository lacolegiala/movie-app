
export const createImageUrl = (poster_path: string, options: {width: number}) => {
  const posterBaseUrl = 'http://image.tmdb.org/t/p/'
  return `${posterBaseUrl}w${options.width}${poster_path}`
}