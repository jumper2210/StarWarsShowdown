import { Starship } from "../models/Starship";
import _ from "lodash";

export default class StarshipRepository {
  public async getRandomStarship(): Promise<Starship | null> {
    try {
      const randomId = _.random(1, 41);
      const response = await fetch(
        `https://www.swapi.tech/api/starships/${randomId}`
      );
      const data = await response.json();

      return data.result.properties as Starship;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}