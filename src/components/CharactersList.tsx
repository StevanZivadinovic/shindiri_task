import React from "react";
import { getNumbersFromEndOfURL } from "../helperFunctions/global";
import { fetchMultipleCharacterDataInLocation } from "../consts/Api";
import { useQuery } from "react-query";

export const CharactersList = ({ data1 }: any) => {
    
  const residentIds = getNumbersFromEndOfURL(data1?.residents);
  console.log(residentIds);

  const {
    data: characterData,
    error: characterError,
    isLoading: CharacterIsLoading,
  } = useQuery(
    ["character", residentIds],
    () => fetchMultipleCharacterDataInLocation(residentIds),
    {
      enabled: !!residentIds,
    }
  );
  console.log(characterData);
  return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Characters</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {characterData?.results?.map((character: any) => (
              <div
                key={character.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{character.name}</h2>
                  <p className="text-gray-600">
                    <strong>Status:</strong> {character.status}
                  </p>
                  <p className="text-gray-600">
                    <strong>Species:</strong> {character.species}
                  </p>
                  <p className="text-gray-600">
                    <strong>Origin:</strong>{" "}
                    {character.origin?.name || "Unknown"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Location:</strong>{" "}
                    {character.location?.name || "Unknown"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
     
  );
};
