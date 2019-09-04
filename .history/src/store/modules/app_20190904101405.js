import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    theme: Cookies.get('theme') || 'themea'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    UPDATE_THEME: (state, theme) => {
      state.theme = theme
      Cookies.set('theme')
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar: ({ commit }, { withoutAnimation }) => {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice: ({ commit }, device) => {
      commit('TOGGLE_DEVICE', device)
    },
    UpdateTheme: ({ commit }, device) => {
      commit('UPDATE_THEME', device)
    }
  }
}

export default app
