import { Starship, StarshipDto } from "../models/Starship";
import _ from "lodash";

export class StarshipRepository {
  public async getRandomStarship(): Promise<Starship | null> {
    try {
      const randomId = _.random(9, 41);
      const response = await fetch(
        `https://www.swapi.tech/api/starships/${randomId}`
      );
      const data = await response.json();

      const starshipItem: StarshipDto = data.result.properties;
      const mappedStarship: Starship = {
        model: starshipItem.model,
        starshipClass: starshipItem.starship_class,
        manufacturer: starshipItem.manufacturer,
        costInCredits: starshipItem.cost_in_credits,
        length: starshipItem.length,
        crew: starshipItem.crew,
        passengers: starshipItem.passengers,
        maxAtmospheringSpeed: starshipItem.max_atmosphering_speed,
        hyperdriveRating: starshipItem.hyperdrive_rating,
        name: starshipItem.name,
      };

      return mappedStarship;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
