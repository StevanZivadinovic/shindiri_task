// src/pages/Characters.tsx

import React, { useState } from "react";
import { useCharacters } from "../context/CharacterContext";
import useScrollFetch from "../hooks/useScrollFatch";
import { useSingleCharacterQuery } from "../consts/Api";
import { Link } from "react-router-dom";
import SearchInput from "../components/SearchInput";

const Characters: React.FC = () => {
  const [characterName, setCharacterName] = useState("");
  const { characters, isLoading, isError, fetchNextPage, hasNextPage } =
  useCharacters();
  useScrollFetch(fetchNextPage, hasNextPage, isLoading);
  
  const { data, isError:singleCharacterIsError, isLoading:singleCharacterisLoading } = useSingleCharacterQuery(characterName)
  if (singleCharacterisLoading) return (
    <div className="container mx-auto p-4 relative">
    <SearchInput characterName={characterName} setCharacterName={setCharacterName}/>
    <p className="text-center text-lg">Loading...</p>
  </div>
  

);
  if (singleCharacterIsError)
    return (
      <div className="container mx-auto p-4 relative">
        <SearchInput characterName={characterName} setCharacterName={setCharacterName}/>
      <p className="text-center text-red-500">
        Error loading character list...
      </p>
      </div>
    );
  return (
    <div className="container mx-auto p-4 relative">
      <SearchInput characterName={characterName} setCharacterName={setCharacterName}/>
      {isLoading && <p className="text-center text-lg">Loading...</p>}
      {isError && (
        <p className="text-red-500 text-center">Error loading characters.</p>
      )}
      {data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.results &&
            data?.results?.map((character: any) => (
              <Link to={`/characters/${12}`} key={character.id}>
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-lg font-semibold">{character.name}</h3>
                  <p className="text-sm text-gray-500">{character.status}</p>
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {characters &&
            characters.map((character) => (
              <Link to={`/characters/${character.id}`} key={character.id}>
                <div
                  key={character.id}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-lg font-semibold">{character.name}</h3>
                  <p className="text-sm text-gray-500">{character.status}</p>
                </div>
              </Link>
            ))}
        </div>
      )}
      {isLoading && (
        <p className="text-center text-lg mt-4">Loading more characters...</p>
      )}
    </div>
  );
};

export default Characters;
