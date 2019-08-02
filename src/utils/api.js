var modules = {
  root: '',
  admin: 'admin/'
}
module.exports.post = {
  'login': modules.admin + 'login', // 登录
  'getInfo': modules.admin + 'info', // 用户信息
  'logout': modules.admin + 'logout' // 退出登录
}
module.exports.get = {
  'Login': modules.admin + 'login', // 登录
  'Info': modules.admin + 'info', // 用户信息
  'Logout': modules.admin + 'logout' // 退出登录
}
