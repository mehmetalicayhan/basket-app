import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import OrderList from '@/components/OrderList.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
let getters;
let store;
let wrapper;

beforeEach(() => {
  getters = {
    getOrderItems: () => [],
    getOrderCount: () => 0,
    getTotalPrice: () => 0,
  };

  store = new Vuex.Store({
    getters,
  });

  wrapper = shallowMount(OrderList, {
    store,
    localVue,
  });
});

describe('OrderList.vue', () => {
  it('should render "store.getters.getOrderCount" in first p tag', () => {
    const p = wrapper.find('.order-length');
    expect(p.text())
      .toContain(getters.getOrderCount());
  });
});
