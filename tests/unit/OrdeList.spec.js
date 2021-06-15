import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import OrderList from '@/components/OrderList.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
let getters;
let store;
let actions;
let state;
let wrapper;

const $router = {
  push: jest.fn(),
};
beforeEach(() => {
  state = {
    orderItems: [
      {
        id: 2,
        name: 'Deodorant',
        price: '26',
        currency: 'TRY',
        image: 'https://cdn.glitch.com/a28552e7-44e1-4bbd-b298-5745e70c2209%2Fdeodorant.jpeg?v=1561027551696',
      },
    ],
  };
  getters = {
    getOrderItems: () => [{
      id: 2,
      name: 'Deodorant',
      price: '26',
      currency: 'TRY',
      image: 'https://cdn.glitch.com/a28552e7-44e1-4bbd-b298-5745e70c2209%2Fdeodorant.jpeg?v=1561027551696',
    }],
    getOrderCount: () => 0,
    getTotalPrice: () => 0,
  };
  actions = {
    removeAllItems: jest.fn(),
  };
  store = new Vuex.Store({
    getters,
    actions,
    state,
  });

  wrapper = shallowMount(OrderList, {
    store,
    localVue,
    mocks: {
      $router,
    },
  });
});

describe('OrderList.vue', () => {
  it('should instantiated', () => {
    expect(wrapper.find('.order-item'))
      .toBeTruthy();
  });
  it('should render "store.getters.getOrderCount" in first p tag', () => {
    const p = wrapper.find('.order-length');
    expect(p.text())
      .toContain(getters.getOrderCount());
  });
  it('should be order item rendered"', () => {
    const orderItems = wrapper.findAll('.order-item');
    expect(orderItems.length)
      .toBe(getters.getOrderItems().length);
  });
  it('should render "store.getters.getTotalPrice" in div', () => {
    const totalPrice = wrapper.find('.total-price');
    expect(totalPrice.text())
      .toContain(getters.getTotalPrice());
  });
  it('should change route when go back button clicked', () => {
    wrapper.find('.go-back')
      .trigger('click');
    expect($router.push)
      .toHaveBeenCalledTimes(1);
    expect($router.push)
      .toHaveBeenCalledWith({ name: 'Listing' });
  });
});
