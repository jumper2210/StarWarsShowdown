import { CharacterProperties } from "../models/Character";
import _ from "lodash";

export class CharacterRepository {
  public async getRandomCharacter(): Promise<CharacterProperties | null> {
    try {
      const randomId = _.random(1, 41);
      const response = await fetch(
        `https://www.swapi.tech/api/people/${randomId}`
      );
      const data = await response.json();

      return data.result.properties as CharacterProperties;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
