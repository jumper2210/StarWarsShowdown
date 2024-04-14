<template>
  <div>
    <Card :cardDetails="leftCard" />
    <Card :cardDetails="rightCard" />
    <v-btn @click="playGame">Play Game</v-btn>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, Ref } from "vue";
import { StarshipProperties } from "@/domain/models/Starship";
import { CharacterProperties } from "@/domain/models/Character";
import { Resources } from "@/domain/models/Resources";
import { CharacterRepository } from "@/domain/repositories/CharacterRepository";
import { StarshipRepository } from "@/domain/repositories/StarshipRepository";
import { GameService } from "@/domain/services/GameService";
import Card from "@/components/Card.vue";

const props = defineProps<{
  resources: Resources;
}>();

const leftCard = ref(null) as Ref<
  StarshipProperties | CharacterProperties | null
>;
const rightCard = ref(null) as Ref<
  StarshipProperties | CharacterProperties | null
>;
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
