import { People } from "../models/People";
import { Starship } from "../models/Starship";

export class GameService {
  static comparePersonAttributes(
    leftPlayerPeople: People,
    rightPlayerPeople: People
  ): People {
    const leftMass = parseFloat(leftPlayerPeople.mass);
    const rightMass = parseFloat(rightPlayerPeople.mass);

    // Compare masses and return the person with the greater mass
    if (leftMass > rightMass) {
      return leftPlayerPeople;
    } else {
      return rightPlayerPeople;
    }
  }

  static compareStarshipAttributes(
    leftPlayerStarship: Starship,
    rightPlayerStarship: Starship
  ): Starship {
    const leftCrew = parseInt(leftPlayerStarship.crew);
    const rightCrew = parseInt(rightPlayerStarship.crew);

    // Compare crew sizes and return the starship with the larger crew
    if (leftCrew > rightCrew) {
      return leftPlayerStarship;
    } else {
      return rightPlayerStarship;
    }
  }
}
