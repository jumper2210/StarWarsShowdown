<template>
  <v-dialog
    data-testid="winner-dialog"
    v-model="isOpen"
    :persistent="true"
    :width="widthOfDialog"
  >
    <v-card>
      <v-card-title
        style="background-color: #15142a; color: white; padding: 30px"
        class="headline text-center"
        data-testid="card-title"
        >{{ title }}</v-card-title
      >
      <v-container style="background-color: #15142a">
        <v-row class="fill-height" align="center" justify="center">
          <v-col class="d-flex justify-center" cols="12" sm="8" md="6">
            <Card
              data-testid="card-details"
              :card-details="cardDetails"
              :photo="photoUrl"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions style="background-color: #15142a">
        <v-spacer></v-spacer>
        <v-btn data-testid="close-btn" color="white" @click="close">
          Close
        </v-btn>
        <v-btn data-testid="try-again-btn" color="#eedb00" @click="tryAgain">
          Try again
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { PropType, ref, Ref, watch, computed } from "vue";
import Card from "@/components/Card.vue";
import { Starship } from "@/domain/models/Starship";
import { Character } from "@/domain/models/Character";
import { useDisplay } from "vuetify";

const props = defineProps({
  isWinnerDialogOpen: {
    type: Boolean as PropType<boolean>,
  },
  title: {
    type: String as PropType<String>,
  },
  photoUrl: {
    type: String as PropType<string>,
  },
  cardDetails: {
    type: Object as PropType<Starship | Character | null>,
  },
});

const emit = defineEmits(["onClose", "onTryAgain"]);
const { width } = useDisplay();

const widthOfDialog = computed(() => {
  return width.value < 600 ? "100%" : "50%";
});

const isOpen = ref(false) as Ref<boolean>;

const close = () => {
  emit("onClose");
};

const tryAgain = () => {
  emit("onTryAgain");
  isOpen.value = false;
};

watch(
  () => props.isWinnerDialogOpen,
  (newVal, oldVal) => {
    isOpen.value = newVal;
  }
);
</script>
