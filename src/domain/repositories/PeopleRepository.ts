import { People } from "../models/People";
import _ from "lodash";

export default class CharacterRepository {
  public async getRandomCharacter(): Promise<People | null> {
    try {
      const randomId = _.random(1, 41);
      const response = await fetch(
        `https://www.swapi.tech/api/people/${randomId}`
      );
      const data = await response.json();

      return data.result.properties as People;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
