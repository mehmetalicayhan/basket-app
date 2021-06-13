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
    getOrderCount(state) {
      return state.orderItems.length;
    },
    getTotalPrice(state) {
      let total = 0;
      state.orderItems.forEach(((item) => {
        total += (parseFloat(item.price) * item.quantity);
      }));
      return total.toFixed(2);
    },
  },
  mutations: {
    ADD_ITEM_TO_CART(state, payload) {
      const isExist = state.orderItems.find((item) => item.id === payload.id);
      console.log(isExist);
      if (!isExist) state.orderItems.push(payload);
    },
    REMOVE_ITEM_FROM_CART(state, id) {
      state.orderItems = state.orderItems.filter((item) => item.id !== id);
    },

    UPDATE_ITEM(state, item) {
      const index = state.orderItems.findIndex((element) => element.id === item.id);
      if (index !== -1) {
        state.orderItems.splice(index, 1, item);
      }
    },
    REMOVE_ALL_FROM_CART(state) {
      state.orderItems = [];
    },

  },
  actions: {
    addItem({ commit }, cartItem) {
      commit('ADD_ITEM_TO_CART', cartItem);
    },
    removeItem({ commit }, itemId) {
      commit('REMOVE_ITEM_FROM_CART', itemId);
    },
    updateItem({ commit }, item) {
      commit('UPDATE_ITEM', item);
    },
    removeAllItems({ commit }) {
      commit('REMOVE_ALL_FROM_CART');
    },
  },
  modules: {},
});
