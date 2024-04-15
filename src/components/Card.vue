<template>
  <v-card v-if="cardDetails" ma="10" pa="10">
    <v-card-title>{{ header }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6" v-for="(value, key) in cardDetails" :key="key">
          <strong>{{ formatKey(key) }}:</strong> {{ formatValue(value) }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { StarshipProperties } from "@/domain/models/Starship";
import { CharacterProperties } from "@/domain/models/Character";
import { PropType, computed } from "vue";

const props = defineProps({
  cardDetails: {
    type: Object as PropType<StarshipProperties | CharacterProperties>,
    required: true,
  },
});

const header = computed(() => {
  if (!props.cardDetails?.name) return "";
  return props.cardDetails.name;
});

const formatKey = (key: string): string => {
  return key.replace(/([A-Z])/g, " $1").trim();
};

const formatValue = (value: string | number): string => {
  return typeof value === "number" ? value.toString() : value;
};
</script>

<style scoped></style>
