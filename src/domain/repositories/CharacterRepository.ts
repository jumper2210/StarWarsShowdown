import { Character, CharacterDto } from "../models/Character";
import _ from "lodash";

export class CharacterRepository {
  public async getRandomCharacter(): Promise<Character | null> {
    try {
      const randomId = _.random(1, 41);
      const response = await fetch(
        `https://www.swapi.tech/api/people/${randomId}`
      );
      const data = await response.json();

      const characterItem: CharacterDto = data.result.properties;
      const mappedCharacter: Character = {
        height: characterItem.height,
        mass: characterItem.mass,
        hairColor: characterItem.hair_color,
        skinColor: characterItem.skin_color,
        eyeColor: characterItem.eye_color,
        birthYear: characterItem.birth_year,
        gender: characterItem.gender,
        name: characterItem.name,
      };

      return mappedCharacter;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
