<template>
  <v-container class="d-flex flex-row align-center justify-space-evenly mb-7">
    <v-row align="center" justify="space-evenly">
      <v-col cols="12" sm="5" xs="6">
        <v-container
          class="mb-1"
          style="color: #eedb00; background-color: #15142a; text-align: center"
        >
          Left Player Score: {{ leftPlayerScore }}
        </v-container>
      </v-col>
      <v-col cols="12" sm="5">
        <v-container
          class="mb-1"
          style="color: #eedb00; background-color: #15142a; text-align: center"
        >
          Right Player Score: {{ rightPlayerRightScore }}
        </v-container>
      </v-col>
    </v-row>
  </v-container>
  <v-row
    align="center"
    justify="center"
    class="d-flex mb-5"
    style="width: 100%"
  >
    <v-col cols="12" md="5" class="d-flex justify-center">
      <div style="height: 300px">
        <Card
          v-if="!isLoaded"
          :cardDetails="leftCard"
          :photo="resourcesPhoto"
        />
      </div>
    </v-col>
    <v-col cols="12" md="5" class="d-flex justify-center">
      <Card v-if="!isLoaded" :cardDetails="rightCard" :photo="resourcesPhoto" />
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
  <WinnerModal
    :isWinnerDialogOpen="isWinnerDialogOpen"
    :title="winnerTitle"
    :cardDetails="winnerCard"
    :photo-url="resourcesPhoto"
    @onClose="onClose"
    @onTryAgain="onTryAgain"
  ></WinnerModal>
</template>

<script lang="ts" setup>
import { ref, inject, Ref, computed, PropType } from "vue";
import { Starship } from "@/domain/models/Starship";
import { Character } from "@/domain/models/Character";
import { Resources } from "@/domain/models/Resources";
import { CharacterRepository } from "@/domain/repositories/CharacterRepository";
import { StarshipRepository } from "@/domain/repositories/StarshipRepository";
import { GameService } from "@/domain/services/GameService";
import Card from "@/components/Card.vue";
import WinnerModal from "./WinnerModal.vue";
import { RoundResult } from "../domain/models/RoundResult";

const props = defineProps({
  resources: {
    type: String as PropType<string | null>,
  },
});

const leftStarshipCard = ref(null) as Ref<Starship | null>;
const rightStarshipCard = ref(null) as Ref<Starship | null>;
const leftCharacterCard = ref(null) as Ref<Character | null>;
const rightCharacterCard = ref(null) as Ref<Character | null>;
const starshipCardWinner = ref(null) as Ref<RoundResult>;
const characterCardWinner = ref(null) as Ref<RoundResult>;
const characterRepository = inject<CharacterRepository>("CharacterRepository");
const starshipRepository = inject<StarshipRepository>("StarshipRepository");
const gameService = new GameService();
const isWinnerDialogOpen = ref(false) as Ref<boolean>;
const winnerCard = ref(null) as Ref<Starship | Character | null>;
const winnerTitle = ref("") as Ref<string>;
const leftPlayerScore = ref(0) as Ref<number>;
const rightPlayerRightScore = ref(0) as Ref<number>;

let isLoaded = ref(false);
let isGameStarted = ref(false);

const resourcesPhoto = computed(() => {
  if (props.resources === Resources.Character) {
    return "https://images.unsplash.com/photo-1617799890023-c7b03d079b1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }

  return "https://images.unsplash.com/photo-1587279484796-61a264afc18b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
});

const onClose = (value: boolean) => {
  isWinnerDialogOpen.value = value;
};

const onTryAgain = () => {
  playGame();
};

const leftCard = computed(() => {
  if (props.resources === Resources.Character) {
    return leftCharacterCard.value;
  }

  return leftStarshipCard.value;
});

const rightCard = computed(() => {
  if (props.resources === Resources.Character) {
    return rightCharacterCard.value;
  }

  return rightStarshipCard.value;
});

const resetGame = () => {
  leftCharacterCard.value = null;
  rightCharacterCard.value = null;
  leftStarshipCard.value = null;
  rightStarshipCard.value = null;
  isWinnerDialogOpen.value = false;
  isLoaded.value = false;
  isLoaded.value = false;
  isGameStarted.value = false;
};

const playGame = async () => {
  resetGame();

  isGameStarted.value = true;

  if (props.resources === Resources.Character) {
    await characterResourcesGame();
  } else {
    await starshipResourcesGame();
  }

  isGameStarted.value = false;
};

const characterResourcesGame = async () => {
  isLoaded.value = true;
  while (!leftCharacterCard.value) {
    leftCharacterCard.value = await characterRepository.getRandomCharacter();
  }
  isLoaded.value = false;

  isLoaded.value = true;
  while (!rightCharacterCard.value) {
    rightCharacterCard.value = await characterRepository.getRandomCharacter();
  }
  isLoaded.value = false;

  characterCardWinner.value = gameService.compareCharacterAttributes(
    leftCharacterCard.value,
    rightCharacterCard.value
  );

  winnerCard.value = characterCardWinner.value.cardDetails;
  winnerTitle.value = `Winner is ${characterCardWinner.value.winner}`;

  setTimeout(() => {
    isWinnerDialogOpen.value = true;
    characterCardWinner.value.winner === "Left Player"
      ? leftPlayerScore.value++
      : rightPlayerRightScore.value++;
  }, 1500);
};

const starshipResourcesGame = async () => {
  isLoaded.value = true;
  while (!leftStarshipCard.value) {
    leftStarshipCard.value = await starshipRepository.getRandomStarship();
  }
  isLoaded.value = false;

  isLoaded.value = true;
  while (!rightStarshipCard.value) {
    rightStarshipCard.value = await starshipRepository.getRandomStarship();
  }
  isLoaded.value = false;

  starshipCardWinner.value = gameService.compareStarshipAttributes(
    leftStarshipCard.value,
    rightStarshipCard.value
  );

  winnerCard.value = starshipCardWinner.value.cardDetails;
  winnerTitle.value = `Winner is ${starshipCardWinner.value.winner}`;

  setTimeout(() => {
    isWinnerDialogOpen.value = true;
    starshipCardWinner.value.winner === "Left Player"
      ? leftPlayerScore.value++
      : rightPlayerRightScore.value++;
  }, 1500);
};
</script>
