import React from "react";
import { getNumbersFromEndOfURL } from "../helperFunctions/global";
import { fetchMultipleCharacterDataInLocation } from "../consts/Api";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export const CharactersList = ({ data1 }: any) => {
  const residentIds = data1?.residents
    ? getNumbersFromEndOfURL(data1?.residents)
    : data1?.characters
    ? getNumbersFromEndOfURL(data1?.characters)
    : [];

  const { data, isLoading, isError } = useQuery(
    ["character", residentIds],
    () => fetchMultipleCharacterDataInLocation(residentIds),
    {
      enabled: !!residentIds,
    }
  );

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">
        Error loading character list...
      </p>
    );
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Characters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.length > 0 ? (
          data?.map((character: any) => (
            <Link to={`/characters/${character?.id}`} key={character?.id}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={character?.image}
                  alt={character?.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{character?.name}</h2>
                  <p className="text-gray-600">
                    <strong>Status:</strong> {character?.status}
                  </p>
                  <p className="text-gray-600">
                    <strong>Species:</strong> {character?.species}
                  </p>
                  <p className="text-gray-600">
                    <strong>Origin:</strong>{" "}
                    {character?.origin?.name || "Unknown"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Location:</strong>{" "}
                    {character?.location?.name || "Unknown"}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <Link to={`/characters/${data?.id}`} key={data?.id}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={data?.image}
                alt={data?.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{data?.name}</h2>
                <p className="text-gray-600">
                  <strong>Status:</strong> {data?.status}
                </p>
                <p className="text-gray-600">
                  <strong>Species:</strong> {data?.species}
                </p>
                <p className="text-gray-600">
                  <strong>Origin:</strong> {data?.origin?.name || "Unknown"}
                </p>
                <p className="text-gray-600">
                  <strong>Location:</strong> {data?.location?.name || "Unknown"}
                </p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
