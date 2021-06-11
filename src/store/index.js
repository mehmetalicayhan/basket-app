import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    orderItems: [],
  },
  getters: {
    getOrderItems(state) {
      return state.orderItems;
    },
  },
  mutations: {
    ADD_ITEM_TO_CART(state, payload) {
      const isExist = state.orderItems.find((item) => item.id === payload.id);
      if (!isExist) state.orderItems.push(payload);
    },
    REMOVE_ITEM_FROM_CART(state, id) {
      state.orderItems.filter((item) => item.id !== id);
    },
    INCREMENT_ITEM_QUANTITY(state, id) {
      const currentItem = state.orderItems.find((item) => item.id === id);
      currentItem.quantity += 1;
    },
    DECREMENT_ITEM_QUANTITY(state, id) {
      const currentItem = state.orderItems.find((item) => item.id === id);
      currentItem.quantity -= 1;
    },
  },
  actions: {
    addItem({ commit }, cartItem) {
      commit('ADD_ITEM_TO_CART', cartItem);
    },
    removeItem({ commit }, itemId) {
      commit('REMOVE_ITEM_FROM_CART', itemId);
    },
  },
  modules: {
  },
});
