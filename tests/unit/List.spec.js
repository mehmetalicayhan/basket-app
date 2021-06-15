import { shallowMount } from '@vue/test-utils';
import List from '@/components/List.vue';

describe('List.vue', () => {
  it('should instantiated', () => {
    const wrapper = shallowMount(List);
    expect(wrapper.find('.list-item'))
      .toBeTruthy();
  });
});
