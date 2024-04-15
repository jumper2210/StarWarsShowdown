<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <Card :cardDetails="leftCard" />
        <Card :cardDetails="rightCard" />
        <v-btn @click="playGame">Play Game</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, inject, Ref } from "vue";
import { Starship } from "@/domain/models/Starship";
import { Character } from "@/domain/models/Character";
import { Resources } from "@/domain/models/Resources";
import { CharacterRepository } from "@/domain/repositories/CharacterRepository";
import { StarshipRepository } from "@/domain/repositories/StarshipRepository";
import { GameService } from "@/domain/services/GameService";
import Card from "@/components/Card.vue";

const props = defineProps<{
  resources: Resources;
}>();

const leftCard = ref(null) as Ref<Starship | Character | null>;
const rightCard = ref(null) as Ref<Starship | Character | null>;
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
