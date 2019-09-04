var modules = {
  root: '',
  admin: 'admin/',
  order: 'order/'
}
module.exports.post = {
  'login': modules.admin + 'login', // 登录
  'logout': modules.admin + 'logout', // 退出登录
  'deleteAdminUser': modules.admin + 'deleteAdminUser', // 删除管理员及普通管理员
  'orderDelete': modules.order + 'delete', // 删除订单
  'addRole': modules.admin + 'addRole' // 添加角色
}
module.exports.get = {
  'getInfo': modules.admin + 'info', // 用户信息
  'orderList': modules.order + 'list' // 订单列表
}
