import axios from 'axios'

export const state = {
  data: {},
  items: {},
}

export const getters = {
  data(state) {
    return (route) => state.data[route]
  },
  item(state) {
    return (route, id) => state.items[route][id]
  },
}

export const mutations = {
  SECTION_DATA(state, payload) {
    state.data[payload.route] = payload.data
  },
}

export const actions = {
  fetchIndex({ commit, state, rootState }, { route }) {
    return axios.get(`/api/${route}`).then(({ data } = response) => {
      commit('SECTION_DATA', { route, data })
    })
  },

  fetchPaginated({ commit }, { route, url }) {
    return axios.get(url).then(({ data } = response) => {
      commit('SECTION_DATA', { route, data })
    })
  },

  fetchItem({ commit }, { route, id }) {
    return axios.get(`/api/${route}/${id}`)
  },
}
