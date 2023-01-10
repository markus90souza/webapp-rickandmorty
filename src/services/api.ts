import axios from "axios";

import type { LocationModel } from "../models/Location";
import type { CharacterModel } from "models/Character";
import type { EpisodeModel } from "models/Episode";
import type { Page } from "types/Page";

const BASE_URL = "https://rickandmortyapi.com/api/";

async function getCharacters(page: number): Promise<Page<CharacterModel>> {
  const { data } = await axios.get<Page<CharacterModel>>(
    `${BASE_URL}character/?page=${page}`
  );

  return data;
}

async function getEpisodes(page: number): Promise<Page<EpisodeModel>> {
  const { data } = await axios.get<Page<EpisodeModel>>(
    `${BASE_URL}episode/?page=${page}`
  );

  return data;
}

async function getLocations(page: number): Promise<Page<LocationModel>> {
  const { data } = await axios.get<Page<LocationModel>>(
    `${BASE_URL}location/?page=${page}`
  );

  return data;
}

export const api = {
  getCharacters,
  getEpisodes,
  getLocations,
};
