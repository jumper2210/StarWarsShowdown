<template>
  <v-card
    align="center"
    justify="center"
    v-if="cardDetails"
    class="hide-scrollbar card"
    :style="{ 'max-height': heightOfCard }"
  >
    <v-card-title :style="{ color: '#eedb00', marginBottom: '10px' }">{{
      header
    }}</v-card-title>
    <v-img :src="photo" width="50%" aspect-ratio="1.7"></v-img>
    <v-card-text>
      <v-row>
        <v-col
          class="text-start"
          cols="12"
          v-for="(value, key) in cardDetails"
          :key="key"
        >
          <strong>{{ formatKey(key) }}:</strong> {{ formatValue(value) }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Starship } from "@/domain/models/Starship";
import { Character } from "@/domain/models/Character";
import { PropType, computed } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps({
  cardDetails: {
    type: Object as PropType<Starship | Character>,
  },
  photo: {
    type: String,
  },
});

const { width } = useDisplay();

const heightOfCard = computed(() => {
  return width.value < 600 ? "200px" : "300px";
});

const header = computed(() => {
  if (!props.cardDetails?.name) return "";
  return props.cardDetails.name;
});

const formatKey = (key: string): string => {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .trim();
};

const formatValue = (value: string | number): string => {
  return typeof value === "number" ? value.toString() : value;
};
</script>

<style scoped>
.card {
  max-height: 170px;
  width: 350px;
  overflow-y: auto;
  box-shadow: rgba(0, 0, 0, 0.51) 0px -1px 26px 10px;
  border-radius: 20px;
  background-color: #15142a;
  color: white;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
