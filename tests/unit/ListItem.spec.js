import { shallowMount, createLocalVue } from '@vue/test-utils';
import ListItem from '@/components/ListItem.vue';
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
    addItem: jest.fn(),
  };
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

  store = new Vuex.Store({
    actions,
    state,
  });

  const product = {
    id: 1,
    name: 'Şampuan',
    price: '13',
    currency: 'TRY',
    image: 'https://cdn.glitch.com/a28552e7-44e1-4bbd-b298-5745e70c2209%2Fsampuan.jpeg?v=1561027551321',
  };

  wrapper = shallowMount(ListItem, {
    propsData: { product },
    store,
    localVue,
    mocks: {
      $router,
    },
  });
});

describe('ListItem.vue', () => {
  it('should render props.product when passed', () => {
    expect(wrapper.props().product.id)
      .toBe(1);
  });
  it('should add item when button click', () => {
    wrapper.find('.add-to-basket-button')
      .trigger('click');
    expect(actions.addItem)
      .toHaveBeenCalled();
  });
  it('should be item name equals props.product.name', () => {
    const item = wrapper.find('.item-name');

    expect(item.text())
      .toBe(wrapper.props().product.name);
  });
  it('should be item price equals props.product.price', () => {
    const item = wrapper.find('.item-price');
    const price = parseFloat(wrapper.props().product.price)
      .toFixed(2);
    expect(item.text())
      .toBe(`${price} ${wrapper.props().product.currency}`);
  });
  it('should be item image equals props.product.image', () => {
    const item = wrapper.find('.item-image');
    expect(item.attributes('src'))
      .toBe(wrapper.props().product.image);
  });
  it('should be item have one image', () => {
    const img = wrapper.findAll('.item-image');
    expect(img.length)
      .toBe(1);
  });
});
