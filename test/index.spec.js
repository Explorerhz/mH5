import { mount } from '@vue/test-utils';
import index from '@/pages/index.vue';

describe('index', () => {
  test('is a index a == abc', () => {
    const wrapper = mount(index);
    const vm = wrapper.vm;
    //console.log("wrapper.a="+vm.a)
    //wrapper.setProps({ messages: ['Cat'] })
    //expect(vm.requestState).toMatch(/abc/i);
    expect(vm.requestState).toBe(true);

    //expect(wrapper.isVueInstance()).toBeTruthy()
  })
})