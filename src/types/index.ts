export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  url: string;
}

export interface SwResponse {
  results: Character[];
  next: string | null;
  previous: string | null;
}

export type PageAction = 'increment' | 'decrement';

export type SearchParam = string | string[] | undefined;

export type Response = {
  swResponse: SwResponse | null;
  message: string | null;
};
export type CharResponse = {
  character: Character | null;
  message: string | null;
};
