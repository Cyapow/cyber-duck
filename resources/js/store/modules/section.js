import axios from "axios";

export const state = {
  data: {},
  counters: {}
};

export const getters = {
  data(state) {
    return route => state.data[route];
  },
  counter(state) {
    return route => state.counters[route];
  }
};

export const mutations = {
  SECTION_DATA(state, payload) {
    state.data[payload.route] = payload.data;
  },
  SET_ROUTE_COUNT(state, payload) {
    state.counters[payload.route] = payload.data.total;
  }
};

export const actions = {
  counter({ commit }, { route }) {
    return axios.get(`/api/counters/${route}`).then(({ data } = response) => {
      commit("SET_ROUTE_COUNT", { route, data });
    });
  },

  fetchIndex({ commit, state, rootState }, { route }) {
    return axios.get(`/api/${route}`).then(({ data } = response) => {
      commit("SECTION_DATA", { route, data });
    });
  },

  fetchPaginated({ commit }, { route, url }) {
    return axios.get(url).then(({ data } = response) => {
      commit("SECTION_DATA", { route, data });
    });
  },

  fetchItem({ commit }, { route, id }) {
    return axios.get(`/api/${route}/${id}`);
  },

  createItem({ commit }, { route, data }) {
    return axios.post(`/api/${route}`, data);
  },

  updateItem({ commit }, { route, id, data }) {
    return axios.post(`/api/${route}/${id}`, data);
  },

  deleteItem({ commit }, { route, id }) {
    return axios.delete(`/api/${route}/${id}`);
  }
};
