<template>
  <v-dialog v-model="isOpen" max-width="60%">
    <v-card>
      <v-card-title
        style="background-color: #15142a; color: white; padding: 30px"
        class="headline text-center"
        >{{ title }}</v-card-title
      >
      <v-container style="background-color: #15142a">
        <v-row class="fill-height" align="center" justify="center">
          <v-col class="d-flex" cols="12" sm="8" md="6">
            <Card :cardDetails="cardDetails" :photo="photo" />
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
    type: Object as PropType<boolean>,
    required: true,
  },
  title: {
    type: Object as PropType<String>,
    required: true,
  },
  photo: {
    type: Object as PropType<string>,
    required: true,
  },
  cardDetails: {
    type: Object as PropType<Starship | Character | null>,
    required: true,
  },
});

watch(
  () => props.isWinnerDialogOpen,
  (newVal, oldVal) => {
    console.log("here?");
    isOpen.value = newVal;
  }
);
</script>
