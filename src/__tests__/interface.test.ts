import { mount } from "@vue/test-utils";
import InterfaceComponent from "./../interface.vue";
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
})

const props = [
  {
    value: 0,
    step: 1,
  },
];

describe("duration", () => {
  describe("interface", () => {
    it.each(props)("should render %s", (props: any) => {
      const wrapper = mount(InterfaceComponent, {
        props: props,
        global: {
          plugins: [i18n],
        },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
