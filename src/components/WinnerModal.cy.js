import { mount } from "@vue/test-utils";
import { ref } from "vue";
import WinnerModal from "@/components/WinnerModal.vue";

describe("WinnerModal.vue", () => {
  it("renders title when passed", async () => {
    const title = ref("Winner is Left Player");
    const wrapper = mount(WinnerModal, {
      props: { title },
      setup() {
        return { title };
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).contain("Winner is Left Player");
  });

  it("renders when isWinnerDialogOpen is true", async () => {
    const isWinnerDialogOpen = ref(true);
    const wrapper = mount(WinnerModal, {
      props: { isWinnerDialogOpen },
      setup() {
        return {};
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.isVisible()).to.be.true;
  });
});
