export interface Character {
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  name: string;
  homeworld: string;
  url: string;
}

export type CharacterProperties = Pick<
  Character,
  | "name"
  | "height"
  | "mass"
  | "hairColor"
  | "skinColor"
  | "eyeColor"
  | "birthYear"
  | "homeworld"
>;
