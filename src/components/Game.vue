<template>
  <v-div>
    <Card :data="leftCard" />
    <Card :data="rightCard" />
    <v-button @click="playGame">Play Game</v-button>
  </v-div>
</template>

<script lang="ts" setup>
import { ref, inject } from "vue";
import { Starship } from "@/domain/models/Starship";
import { Character } from "@/domain/models/Character";
import { Resources } from "@/domain/models/Resources";
import { CharacterRepository } from "@/domain/repositories/CharacterRepository";
import { StarshipRepository } from "@/domain/repositories/StarshipRepository";
import { GameService } from "@/domain/services/GameService";

const props = defineProps<{
  resources: Resources;
}>();

const leftCard = ref<Starship | Character | null>(null);
const rightCard = ref<Starship | Character | null>(null);
const characterRepository = inject<CharacterRepository>("CharacterRepository");
const starshipRepository = inject<StarshipRepository>("StarshipRepository");
const gameService = new GameService();

async function playGame() {
  if (!props.resources) return;

  if (props.resources === Resources.Character) {
    leftCard.value = await characterRepository.getRandomCharacter();
    rightCard.value = await characterRepository.getRandomCharacter();
    gameService.compareCharacterAttributes(leftCard.value, rightCard.value);
  } else {
    leftCard.value = await starshipRepository.getRandomStarship();
    rightCard.value = await starshipRepository.getRandomStarship();
    gameService.compareStarshipAttributes(leftCard.value, rightCard.value);
  }
}
</script>
