import { shallowMount, createLocalVue } from '@vue/test-utils';
import OrderItem from '@/components/OrderItem.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

let actions;
let store;
let state;
let wrapper;

const $router = {
  push: jest.fn(),
};

beforeEach(() => {
  actions = {
    removeItem: jest.fn(),
    updateItem: jest.fn(),
  };

  store = new Vuex.Store({
    actions,
    state,
  });

  const orderItem = {
    id: 1,
    name: 'Şampuan',
    price: '13',
    currency: 'TRY',
    quantity: 2,
    image: 'https://cdn.glitch.com/a28552e7-44e1-4bbd-b298-5745e70c2209%2Fsampuan.jpeg?v=1561027551321',
  };

  wrapper = shallowMount(OrderItem, {
    propsData: { orderItem },
    store,
    localVue,
    mocks: {
      $router,
    },
  });
});

describe('OrderItem.vue', () => {
  it('should render props.orderItem.image when passed', () => {
    const item = wrapper.find('.order-image');
    expect(item.attributes('src'))
      .toBe(wrapper.props().orderItem.image);
  });
  it('should remove item when button click', () => {
    wrapper.find('.remove-item-button')
      .trigger('click');
    expect(actions.removeItem)
      .toHaveBeenCalled();
  });
  it('should be item name equals props.orderItem.name', () => {
    const item = wrapper.find('.order-item-name');

    expect(item.text())
      .toBe(wrapper.props().orderItem.name);
  });
  it('should be item price equals props.orderItem.price', () => {
    const item = wrapper.find('.order-item-price');
    const price = parseFloat(wrapper.props().orderItem.price * wrapper.props().orderItem.quantity)
      .toFixed(2);
    expect(item.text())
      .toContain(price);
  });
  it('should updateItem action calls when increment button clicked', () => {
    const item = wrapper.find('.increment');
    item.trigger('click');
    expect(actions.updateItem)
      .toHaveBeenCalled();
  });
  it('should updateItem action calls when decrement button clicked', () => {
    const item = wrapper.find('.decrement');
    item.trigger('click');
    expect(actions.updateItem)
      .toHaveBeenCalled();
  });
});
