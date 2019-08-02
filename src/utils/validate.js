export function isvalidateUsername (str) {
  const validMap = ['admin', 'test']
  return validMap.indexOf(str.trim()) >= 0
}
