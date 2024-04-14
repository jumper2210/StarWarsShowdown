<template>
  <v-app>
    <v-main>
      <Game :resources="character"></Game>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { Resources } from "@/domain/models/Resources";
import Game from "@/components/Game.vue";

const character = Resources.Character;
</script>
