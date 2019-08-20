export function isvalidateUsername (str) {
  const validMap = ['admin', 'test']
  return validMap.indexOf(str.trim()) >= 0
}

/**
 * 6-18位密码
 */
export function validatePassword (str) {
  const reg = /^[A-Za-z0-9]{6,18}$/
  return reg.test(str)
}
