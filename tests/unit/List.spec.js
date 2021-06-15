import { shallowMount } from '@vue/test-utils';
import List from '@/components/List.vue';

describe('List.vue', () => {
  it('should instantiated', () => {
    const wrapper = shallowMount(List);
    expect(wrapper.find('.list-item'))
      .toBeTruthy();
  });
  it('should render products', () => {
    const wrapper = shallowMount(List, {
      data() {
        return {
          products: [{
            id: 1,
            name: 'Şampuan',
            price: '13',
            currency: 'TRY',
            image: 'https://cdn.glitch.com/a28552e7-44e1-4bbd-b298-5745e70c2209%2Fsampuan.jpeg?v=1561027551321',
          }, {
            id: 2,
            name: 'Deodorant',
            price: '26',
            currency: 'TRY',
            image: 'https://cdn.glitch.com/a28552e7-44e1-4bbd-b298-5745e70c2209%2Fdeodorant.jpeg?v=1561027551696',
          }],
        };
      },
    });
    const listItems = wrapper.findAll('.list-item');
    expect(listItems)
      .toHaveLength(2);
  });
});
