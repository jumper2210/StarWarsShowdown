import { Character } from "../models/Character";
import { Starship } from "../models/Starship";

export interface RoundResult {
  cardDetails: Character | Starship;
  winner: "Left Player" | "Right Player";
}
