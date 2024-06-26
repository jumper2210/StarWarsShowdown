import { mount } from "@vue/test-utils";
import { ref } from "vue";
import Game from "@/components/Game.vue";
import Card from "@/components/Card.vue";

describe("Game.vue", () => {
  it("renders left player score", async () => {
    const leftPlayerScore = ref(5);
    const wrapper = mount(Game, {
      setup() {
        return { leftPlayerScore };
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).contain("Left Player Score: 5");
  });

  it("does not render Card components when isLoaded is true", async () => {
    const isLoaded = ref(true);
    const wrapper = mount(Game, {
      setup() {
        return { isLoaded };
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Card).exists()).to.be.false;
  });

  it("renders v-progress-circular when isLoaded is true", async () => {
    const isLoaded = ref(true);
    const wrapper = mount(Game, {
      setup() {
        return { isLoaded };
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find("v-progress-circular").exists()).to.be.true;
  });
});
