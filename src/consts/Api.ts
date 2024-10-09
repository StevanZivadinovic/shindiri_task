import axios from "axios";

export const base = 'https://rickandmortyapi.com/api'
export const fetchCharacters = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(`${base}/character`, {
      params: { page: pageParam },
    });
    return data;
  };

  export const fetchSingleCharacter = async (nameOfCharacter:string) => {
    const { data } = await axios.get(`${base}/character`, {
      params: { name: nameOfCharacter },
    });
    return data;
  };

  export const fetchSingleCharacterDetails = async (id:number) => {
    const { data } = await axios.get(`${base}/character/${id}`, {
     
    });
    return data;
  };

  export const fetchSingleLocationData = async (id:number) => {
    const { data } = await axios.get(`${base}/location/${id}`, {
       
    });
    return data;
  };

  export const fetchMultipleCharacterDataInLocation = async (ids:number[]) => {
    const { data } = await axios.get(`${base}/character`, {
        params: { ids : ids }
    });
    return data;
  };

  //https://rickandmortyapi.com/api/location/3
//   https://rickandmortyapi.com/api/character/1,183
