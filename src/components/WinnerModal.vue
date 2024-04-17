<template>
  <v-dialog v-model="isOpen" max-width="70%">
    <v-card>
      <v-card-title
        style="background-color: #15142a; color: white; padding: 30px"
        class="headline text-center"
        >{{ title }}</v-card-title
      >
      <v-container style="background-color: #15142a">
        <v-row class="fill-height" align="center" justify="center">
          <v-col class="d-flex justify-center" cols="12" sm="8" md="6">
            <Card :cardDetails="cardDetails" :photo="photoUrl" />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions style="background-color: #15142a">
        <v-spacer></v-spacer>
        <v-btn color="white" @click="close"> Close </v-btn>
        <v-btn color="#eedb00" @click="tryAgain"> Try again </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { PropType, ref, Ref, watch } from "vue";
import Card from "@/components/Card.vue";
import { Starship } from "@/domain/models/Starship";
import { Character } from "@/domain/models/Character";

const emit = defineEmits(["onClose", "onTryAgain"]);

const close = () => {
  emit("onClose", false);
};

const tryAgain = () => {
  emit("onTryAgain");
  isOpen.value = false;
};

const isOpen = ref(false) as Ref<boolean>;

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

watch(
  () => props.isWinnerDialogOpen,
  (newVal, oldVal) => {
    isOpen.value = newVal;
  }
);
</script>
