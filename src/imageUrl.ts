
export const createImageUrl = (poster_path: string, options: {width: number}) => {
  const posterBaseUrl = 'http://image.tmdb.org/t/p/'
  console.log('raaaa', `${posterBaseUrl}w${options.width}${poster_path}`)
  return `${posterBaseUrl}w${options.width}${poster_path}`
}