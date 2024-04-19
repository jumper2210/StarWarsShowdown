import { mount } from "@vue/test-utils";
import { ref } from "vue";
import WinnerModal from "@/components/WinnerModal.vue";
import Card from "@/components/Card.vue";

describe("WinnerModal.vue", () => {
  it("renders title when passed", async () => {
    const title = ref("Winner is Left Player");
    const wrapper = mount(WinnerModal, {
      props: { title },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).contain("Winner is Left Player");
  });

  it("renders Card component", () => {
    const wrapper = mount(WinnerModal);
    expect(wrapper.findComponent(Card).exists()).to.be.true;
  });

  it("renders when isWinnerDialogOpen is true", async () => {
    const isWinnerDialogOpen = ref(true);
    const wrapper = mount(WinnerModal, {
      props: { isWinnerDialogOpen },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.isVisible()).to.be.true;
  });

  it("emits onClose event when close button is clicked", async () => {
    const wrapper = mount(WinnerModal);
    await wrapper.find('[data-testid="close-btn"]').trigger("click");
    expect(wrapper.emitted()).to.have.property("onClose");
  });

  it("emits onTryAgain event when try again button is clicked", async () => {
    const wrapper = mount(WinnerModal);
    await wrapper.find('[data-testid="try-again-btn"]').trigger("click");
    expect(wrapper.emitted()).to.have.property("onTryAgain");
  });
});
