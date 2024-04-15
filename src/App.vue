<template>
  <v-app>
    <v-main>
      <Game :resources="resources"></Game>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { Resources } from "@/domain/models/Resources";
import Game from "@/components/Game.vue";

const resources = Resources.Starship;
</script>
