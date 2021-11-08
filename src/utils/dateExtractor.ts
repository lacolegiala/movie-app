export const extractDate = (date: string | Date) => {
  if (date) {
    const year = new Date(date).getFullYear()
    const month = new Date(date).getMonth()
    const day = new Date(date).getDate()
    return [year, month, day]
  }
  else {
    return null
  }
}