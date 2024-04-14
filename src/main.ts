import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import StarshipRepository from "./domain/repositories/StarshipRepository";
import PeopleRepository from "./domain/repositories/PeopleRepository";
import { GameService } from "./domain/services/GameService";

const app = createApp(App);

app.provide("StarshipRepository", new StarshipRepository());
app.provide("PersonRepository", new PeopleRepository());
app.provide("GameService", GameService);

app.use(vuetify).mount("#app");
loadFonts();
