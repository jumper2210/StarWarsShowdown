import { CharacterProperties } from "../models/Character";
import { StarshipProperties } from "../models/Starship";

export class GameService {
  public compareCharacterAttributes(
    leftPlayersCharacter: CharacterProperties,
    rightPlayersCharacter: CharacterProperties
  ): CharacterProperties {
    const leftMass = parseFloat(leftPlayersCharacter.mass);
    const rightMass = parseFloat(rightPlayersCharacter.mass);

    if (leftMass > rightMass) {
      return leftPlayersCharacter;
    } else {
      return rightPlayersCharacter;
    }
  }

  public compareStarshipAttributes(
    leftPlayerStarship: StarshipProperties,
    rightPlayerStarship: StarshipProperties
  ): StarshipProperties {
    const leftCrew = parseInt(leftPlayerStarship.crew);
    const rightCrew = parseInt(rightPlayerStarship.crew);

    if (leftCrew > rightCrew) {
      return leftPlayerStarship;
    } else {
      return rightPlayerStarship;
    }
  }
}
