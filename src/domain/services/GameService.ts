import { Character } from "../models/Character";
import { Starship } from "../models/Starship";

export class GameService {
  public compareCharacterAttributes(
    leftPlayersCharacter: Character,
    rightPlayersCharacter: Character
  ): Character {
    const leftMass = parseFloat(leftPlayersCharacter.mass);
    const rightMass = parseFloat(rightPlayersCharacter.mass);

    if (leftMass > rightMass) {
      return leftPlayersCharacter;
    } else {
      return rightPlayersCharacter;
    }
  }

  public compareStarshipAttributes(
    leftPlayerStarship: Starship,
    rightPlayerStarship: Starship
  ): Starship {
    const leftCrew = parseInt(leftPlayerStarship.crew);
    const rightCrew = parseInt(rightPlayerStarship.crew);

    if (leftCrew > rightCrew) {
      return leftPlayerStarship;
    } else {
      return rightPlayerStarship;
    }
  }
}
