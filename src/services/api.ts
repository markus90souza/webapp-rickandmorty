import axios from "axios";

import type { CharacterModel } from "models/Character";
import type { Page } from "types/Page";

const BASE_URL = "https://rickandmortyapi.com/api/";

async function getCharacters(page: number): Promise<Page<CharacterModel>> {
  const { data } = await axios.get<Page<CharacterModel>>(
    `${BASE_URL}character/?page=${page}`
  );

  return data;
}

export const api = {
  getCharacters,
};
