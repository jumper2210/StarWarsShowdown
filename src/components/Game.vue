<template>
  <v-container class="d-flex flex-column align-center" style="height: 80vh">
    <v-row align="center" justify="center" class="d-flex" style="width: 100%">
      <v-col cols="6" class="d-flex justify-center">
        <div style="height: 300px">
          <Card
            v-if="!isLoaded"
            :cardDetails="leftCard"
            :photo="resourcesPhoto"
          />
        </div>
      </v-col>
      <v-col cols="6" class="d-flex justify-center">
        <Card
          v-if="!isLoaded"
          :cardDetails="rightCard"
          :photo="resourcesPhoto"
        />
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-progress-circular
        v-if="isLoaded"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-row>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <v-btn @click="playGame">Play Game</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, inject, Ref, computed } from "vue";
import { Starship } from "@/domain/models/Starship";
import { Character } from "@/domain/models/Character";
import { Resources } from "@/domain/models/Resources";
import { CharacterRepository } from "@/domain/repositories/CharacterRepository";
import { StarshipRepository } from "@/domain/repositories/StarshipRepository";
import { GameService } from "@/domain/services/GameService";
import Card from "@/components/Card.vue";

const props = defineProps<{
  resources: Resources;
  photo: string;
}>();

const leftCard = ref(null) as Ref<Starship | Character | null>;
const rightCard = ref(null) as Ref<Starship | Character | null>;
const characterRepository = inject<CharacterRepository>("CharacterRepository");
const starshipRepository = inject<StarshipRepository>("StarshipRepository");
const gameService = new GameService();
let isLoaded = ref(false);
let isGameStarted = ref(false);

const resourcesPhoto = computed(() => {
  if (!props.resources) return;

  if (props.resources === Resources.Character) {
    return "https://images.unsplash.com/photo-1617799890023-c7b03d079b1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }

  return "https://images.unsplash.com/photo-1587279484796-61a264afc18b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
});

const resetGame = () => {
  leftCard.value = null;
  rightCard.value = null;
  isLoaded.value = false;
  isLoaded.value = false;
  isGameStarted.value = false;
};

const playGame = async () => {
  resetGame();

  if (!props.resources) return;
  isGameStarted.value = true;

  if (props.resources === Resources.Character) {
    await characterResourcesGame();
  } else {
    await starshipResourcesGame();
  }

  isGameStarted.value = false;
};

const loadAndCompareResources = async (
  resourceGetter: () => Promise<Starship | Character>,
  compareFunction: (
    left: Starship | Character,
    right: Starship | Character
  ) => void
) => {
  isLoaded.value = true;
  while (!leftCard.value) {
    leftCard.value = await resourceGetter();
  }
  isLoaded.value = false;

  isLoaded.value = true;
  while (!rightCard.value) {
    rightCard.value = await resourceGetter();
  }
  isLoaded.value = false;

  compareFunction(leftCard.value, rightCard.value);
};

const characterResourcesGame = async () => {
  await loadAndCompareResources(
    async () => await characterRepository.getRandomCharacter(),
    gameService.compareCharacterAttributes
  );
};

const starshipResourcesGame = async () => {
  await loadAndCompareResources(
    async () => await starshipRepository.getRandomStarship(),
    gameService.compareStarshipAttributes
  );
};
</script>
