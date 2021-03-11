export const createReleaseYear = (date: string) => {
  if (date) {
    return new Date(date).getFullYear()
  }
  else {
    return 'Unknown'
  }
}