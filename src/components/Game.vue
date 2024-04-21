<template>
  <v-container
    fill-height
    class="d-flex flex-column align-center justify-space-evenly"
    style="height: 100%"
  >
    <v-row style="width: 100%" align="center" dense>
      <v-col cols="12" sm="6">
        <v-container
          class="mb-1"
          style="color: #eedb00; background-color: #15142a; text-align: center"
        >
          Left Player Score: {{ leftPlayerScore }}
        </v-container>
      </v-col>
      <v-col cols="12" sm="6">
        <v-container
          class="mb-1"
          style="color: #eedb00; background-color: #15142a; text-align: center"
        >
          Right Player Score: {{ rightPlayerScore }}
        </v-container>
      </v-col>
    </v-row>
    <v-row
      dense
      align="center"
      justify="center"
      class="d-flex mb-5"
      style="width: 100%; height: 80%"
    >
      <v-col cols="12" sm="6" class="d-flex justify-center pl-6">
        <Card
          data-testid="left-card"
          v-if="!isLoaded"
          :card-details="leftCard"
          :photo="resourcesPhoto"
        />
      </v-col>
      <v-col cols="12" sm="6" class="d-flex justify-center pl-6">
        <Card
          data-testid="right-card"
          v-if="!isLoaded"
          :card-details="rightCard"
          :photo="resourcesPhoto"
        />
      </v-col>
    </v-row>
    <v-row dense align="center" justify="center" style="height: 10%">
      <template v-if="isLoaded">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </template>
      <template v-else>
        <v-col class="text-center mb-4">
          <v-btn data-testid="play-btn" @click="playGame">Play Game</v-btn>
        </v-col>
      </template>
    </v-row>
    <WinnerModal
      data-testid="winner-modal"
      :is-winner-dialog-open="isWinnerDialogOpen"
      :title="winnerTitle"
      :card-details="winnerCard"
      :photo-url="resourcesPhoto"
      @onClose="onClose"
      @onTryAgain="onTryAgain"
    ></WinnerModal>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, inject, computed, defineProps, PropType, Ref } from "vue";
import { Starship } from "@/domain/models/Starship";
import { Character } from "@/domain/models/Character";
import { Resources } from "@/domain/models/Resources";
import { CharacterRepository } from "@/domain/repositories/CharacterRepository";
import { StarshipRepository } from "@/domain/repositories/StarshipRepository";
import { GameService } from "@/domain/services/GameService";
import Card from "@/components/Card.vue";
import WinnerModal from "./WinnerModal.vue";

const leftStarshipCard = ref(null) as Ref<Starship | null>;
const rightStarshipCard = ref(null) as Ref<Starship | null>;
const leftCharacterCard = ref(null) as Ref<Character | null>;
const rightCharacterCard = ref(null) as Ref<Character | null>;
const characterRepository = inject<CharacterRepository>("CharacterRepository");
const starshipRepository = inject<StarshipRepository>("StarshipRepository");
const gameService = new GameService();
const isWinnerDialogOpen = ref(false) as Ref<boolean>;
const winnerCard = ref(null) as Ref<Starship | Character | null>;
const winnerTitle = ref("") as Ref<string>;
const leftPlayerScore = ref(0) as Ref<number>;
const rightPlayerScore = ref(0) as Ref<number>;
const isLoaded = ref(false);

const props = defineProps({
  resources: {
    type: String as PropType<string | null>,
  },
});

const resourcesPhoto = computed(() => {
  if (props.resources === Resources.Character) {
    return "https://images.unsplash.com/photo-1617799890023-c7b03d079b1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }

  return "https://images.unsplash.com/photo-1587279484796-61a264afc18b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
});

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

const onClose = () => {
  isWinnerDialogOpen.value = false;
};

const onTryAgain = () => {
  resetGame();
  playGame();
};

const resetGame = () => {
  leftCharacterCard.value = null;
  rightCharacterCard.value = null;
  leftStarshipCard.value = null;
  rightStarshipCard.value = null;
  isWinnerDialogOpen.value = false;
  isLoaded.value = false;
};

const playGame = async () => {
  isLoaded.value = true;
  let leftCardValue,
    rightCardValue,
    leftCardGetter,
    rightCardGetter,
    compareAttributes;

  if (props.resources === Resources.Character) {
    leftCardGetter = () => characterRepository.getRandomCharacter();
    rightCardGetter = leftCardGetter;
    compareAttributes = gameService.compareCharacterAttributes;
  } else {
    leftCardGetter = () => starshipRepository.getRandomStarship();
    rightCardGetter = leftCardGetter;
    compareAttributes = gameService.compareStarshipAttributes;
  }

  while (!leftCardValue) {
    leftCardValue = await leftCardGetter();
  }

  while (!rightCardValue) {
    rightCardValue = await rightCardGetter();
  }

  leftCharacterCard.value =
    props.resources === Resources.Character ? leftCardValue : null;
  leftStarshipCard.value =
    props.resources === Resources.Starship ? leftCardValue : null;
  rightCharacterCard.value =
    props.resources === Resources.Character ? rightCardValue : null;
  rightStarshipCard.value =
    props.resources === Resources.Starship ? rightCardValue : null;

  const cardWinner = compareAttributes(leftCardValue, rightCardValue);

  winnerCard.value = cardWinner.cardDetails;
  winnerTitle.value = `Winner is ${cardWinner.winner}`;

  setTimeout(() => {
    isWinnerDialogOpen.value = true;
    cardWinner.winner === "Left Player"
      ? leftPlayerScore.value++
      : rightPlayerScore.value++;
  }, 2500);

  isLoaded.value = false;
};
</script>
