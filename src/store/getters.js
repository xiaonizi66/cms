const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  name: state => state.user.name,
  token: state => state.user.token,
  roles: state => state.user.roles,
  theme: state => state.app.theme
}
export default getters
