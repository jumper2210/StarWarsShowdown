export class Starship {
  model: string;
  starshipClass: string;
  manufacturer: string;
  costInCredits: string;
  length: string;
  crew: string;
  passengers: string;
  maxAtmospheringSpeed: string;
  hyperdriveRating: string;
  MGLT: string;
  cargoCapacity: string;
  consumables: string;
  name: string;
  created: string;
  edited: string;
  url: string;
}

export type StarshipProperties = Pick<
  Starship,
  | "name"
  | "model"
  | "starshipClass"
  | "manufacturer"
  | "costInCredits"
  | "length"
  | "crew"
  | "passengers"
  | "maxAtmospheringSpeed"
  | "cargoCapacity"
  | "consumables"
  | "hyperdriveRating"
>;
