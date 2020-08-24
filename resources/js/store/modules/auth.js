import axios from 'axios'

export const state = {
  currentUser: getSavedState('auth.currentUser'),
}

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue
    saveState('auth.currentUser', newValue)
    setDefaultAuthHeaders()
  },
}

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser
  },
}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ dispatch }) {
    setDefaultAuthHeaders()
    dispatch('validate')
  },

  // Logs in the current user.
  logIn({ commit, dispatch, getters }, { email, password } = {}) {
    if (getters.loggedIn) return dispatch('validate')

    return axios.post('/api/login', { email, password }).then((response) => {
      localStorage.setItem('auth_token', response.data.access_token)

      const user = response.data.user
      commit('SET_CURRENT_USER', user)
      return user
    })
  },

  // Logs out the current user.
  logOut({ commit }) {
    return axios.post('/api/logout').then((response) => {
      localStorage.removeItem('auth_token')
      commit('SET_CURRENT_USER', null)
    })
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  validate({ commit, state }) {
    if (!state.currentUser) return Promise.resolve(null)

    return axios
      .post('/api/me')
      .then((response) => {
        const user = response.data
        commit('SET_CURRENT_USER', user)
        return user
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          commit('SET_CURRENT_USER', null)
        } else {
          console.warn(error)
        }
        return null
      })
  },
}

// ===
// Private helpers
// ===

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}

function setDefaultAuthHeaders() {
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('auth_token')
}
