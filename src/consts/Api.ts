import axios from "axios";
import { useQuery } from "react-query";

export const base = "https://rickandmortyapi.com/api";
export const fetchCharacters = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(`${base}/character`, {
    params: { page: pageParam },
  });
  return data;
};

export const fetchSingleCharacter = async (nameOfCharacter: string) => {
  const { data } = await axios.get(`${base}/character`, {
    params: { name: nameOfCharacter },
  });
  return data;
};

export const fetchSingleCharacterDetails = async (id: number) => {
  const { data } = await axios.get(`${base}/character/${id}`, {});
  return data;
};

export const fetchSingleLocationData = async (id: number) => {
  const { data } = await axios.get(`${base}/location/${id}`, {});
  return data;
};

export const fetchMultipleCharacterDataInLocation = async (ids: number[]) => {
  const { data } = await axios.get(`${base}/character/${ids}`, {});
  return data;
};
export const fetchSingleEpisodeDetails = async (id: number) => {
  const { data } = await axios.get(`${base}/episode/${id}`, {});
  return data;
};

const useEpisodeQuery = (id: string | undefined) => {
  return useQuery(
    ["character", id],
    () => fetchSingleEpisodeDetails(Number(id)),
    {
      enabled: !!id,
    }
  );
};

const useSingleCharacterDetailsQuery = (id: string | undefined) => {
  return useQuery(
    ["character", id],
    () => fetchSingleCharacterDetails(Number(id)),
    {
      enabled: !!id,
    }
  );
};

const useSingleLocationDataQuery = (id: string | undefined) => {
  return useQuery(["location", id], () => fetchSingleLocationData(Number(id)), {
    enabled: !!id,
  });
};

const useMultipleCharacterDataInLocationQuery = (residentIds:number[])=>{
  return useQuery(
    ["character", residentIds],
    () => fetchMultipleCharacterDataInLocation(residentIds),
    {
      enabled: !!residentIds,
    }
  );
}

const useSingleCharacterQuery = (characterName:string)=>{
  return useQuery(
    ["character", characterName],
    () => fetchSingleCharacter(characterName),
    {
      enabled: !!characterName,
    }
  );
}

export {
  useEpisodeQuery,
  useSingleCharacterDetailsQuery,
  useSingleLocationDataQuery,
  useMultipleCharacterDataInLocationQuery,
  useSingleCharacterQuery
};
