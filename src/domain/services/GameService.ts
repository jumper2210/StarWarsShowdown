import { Character } from "../models/Character";
import { RoundResult } from "../models/RoundResult";
import { Starship } from "../models/Starship";

export class GameService {
  public compareCharacterAttributes(
    leftPlayersCharacter: Character,
    rightPlayersCharacter: Character
  ): RoundResult {
    const leftMass = parseFloat(leftPlayersCharacter.mass);
    const rightMass = parseFloat(rightPlayersCharacter.mass);

    if (leftMass > rightMass) {
      return { cardDetails: leftPlayersCharacter, winner: "Left Player" };
    } else {
      return { cardDetails: rightPlayersCharacter, winner: "Right Player" };
    }
  }

  public compareStarshipAttributes(
    leftPlayerStarship: Starship,
    rightPlayerStarship: Starship
  ): RoundResult {
    const leftCrew = parseInt(leftPlayerStarship.crew);
    const rightCrew = parseInt(rightPlayerStarship.crew);

    if (leftCrew > rightCrew) {
      return { cardDetails: leftPlayerStarship, winner: "Left Player" };
    } else {
      return { cardDetails: rightPlayerStarship, winner: "Right Player" };
    }
  }
}
