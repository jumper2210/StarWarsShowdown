import { mount } from "@vue/test-utils";
import Card from "@/components/Card.vue";

describe("Card.vue", () => {
  it("renders card title when passed", () => {
    const cardDetails = { name: "Winner is Left Player" };
    const wrapper = mount(Card, {
      props: { cardDetails },
    });
    expect(wrapper.html()).contain("Winner is Left Player");
  });

  it("renders card details when passed", () => {
    const cardDetails = {
      eyeColor: "brown",
      gender: "male",
      hairColor: "brown",
    };
    const wrapper = mount(Card, {
      props: { cardDetails },
    });
    expect(wrapper.html()).contain(cardDetails.eyeColor);
    expect(wrapper.html()).contain(cardDetails.gender);
    expect(wrapper.html()).contain(cardDetails.hairColor);
  });

  it("does not render when cardDetails is not passed", () => {
    const wrapper = mount(Card);
    expect(wrapper.isVisible()).to.be.false;
  });
});
