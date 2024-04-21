import { mount } from "@vue/test-utils";
import Card from "@/components/Card.vue";

describe("Card.vue", () => {
  it("does not render when cardDetails is not passed", () => {
    const wrapper = mount(Card, {
      setup() {
        return { cardDetails: null };
      },
    });
    expect(wrapper.isVisible()).to.be.false;
  });
});
