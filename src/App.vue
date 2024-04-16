<template>
  <v-app style="background-color: #15142a">
    <v-main>
      <Game :resources="selectedResource"></Game>
      <v-dialog v-model="dialog" max-width="50%">
        <v-card>
          <v-card-title class="headline text-center"
            >Select Resource and may the force be with you!</v-card-title
          >
          <v-card-text>
            <v-select
              :items="resourceOptions"
              label="Resources"
              v-model="selectedResource"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" @click="onClick">Start</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
import { Resources } from "@/domain/models/Resources";
import Game from "@/components/Game.vue";

const resources = ref(null) as Ref<Resources | null>;
const dialog = ref(true);
const selectedResource = ref(null) as Ref<Resources | null>;
const resourceOptions = ref([Resources.Character, Resources.Starship]);

const onClick = () => {
  dialog.value = false;
};
</script>
