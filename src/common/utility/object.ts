export const isEmpty = (obj: Object | undefined) => {
  if (obj === undefined) return true
  return Object.keys(obj).length !== 0
}