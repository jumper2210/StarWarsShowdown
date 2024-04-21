<template>
  <v-app style="background-color: #15142a; overflow: auto">
    <v-main style="height: 100svh">
      <Game :resources="selectedResource"></Game>
      <v-dialog
        :width="widthOfResourcesDialog"
        data-testid="dialog-resources"
        v-model="dialog"
      >
        <v-card>
          <v-card-title class="headline text-center text-wrap"
            >Select Resource and may the force be with you!</v-card-title
          >
          <v-card-text>
            <v-select
              data-testid="resources"
              :items="resourceOptions"
              label="Resources"
              v-model="selectedResource"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn data-testid="start-btn" color="black" @click="onClick"
              >Start</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, Ref, computed } from "vue";
import { Resources } from "@/domain/models/Resources";
import Game from "@/components/Game.vue";
import { useDisplay } from "vuetify";

const dialog = ref(true);
const selectedResource = ref(Resources.Character) as Ref<Resources | null>;
const resourceOptions = ref([Resources.Character, Resources.Starship]) as Ref<
  Resources[]
>;
const { width } = useDisplay();

const widthOfResourcesDialog = computed(() => {
  return width.value < 600 ? "100%" : "40%";
});

const onClick = () => {
  dialog.value = false;
};
</script>
