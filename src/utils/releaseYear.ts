export const createReleaseYear = (date: string | Date) => {
  if (date) {
    return new Date(date).getFullYear();
  } else {
    return 'Unknown';
  }
};
