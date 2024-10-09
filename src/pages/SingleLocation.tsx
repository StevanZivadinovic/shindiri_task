import { useParams } from 'react-router-dom';
import { fetchMultipleCharacterDataInLocation, fetchSingleLocationData } from '../consts/Api';
import { useQuery } from 'react-query';
import { getNumbersFromEndOfURL } from '../helperFunctions/global';

const SingleLocation = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery(
    ['location', id],
    () => fetchSingleLocationData(Number(id)),
    {
      enabled: !!id,
    }
  );

 const residentIds = getNumbersFromEndOfURL(data?.residents)
  console.log(residentIds)

  const { data:characterData, error:characterError, isLoading:CharacterIsLoading } = useQuery(
    ['character', residentIds],
    () => fetchMultipleCharacterDataInLocation(residentIds),
    {
      enabled: !!residentIds,
    }
  );
console.log(characterData)
  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading location details.</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
        <div className="mb-4">
          <p className="text-lg">
            <strong>Type:</strong> {data.type}
          </p>
          <p className="text-lg">
            <strong>Dimension:</strong> {data.dimension}
          </p>
          <p className="text-lg">
            <strong>Created:</strong> {new Date(data.created).toLocaleString()}
          </p>
          <p className="text-lg">
            <strong>Number of Residents:</strong> {data.residents.length}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-2">Residents:</h2>
        <p>
          Number of residents: {data.residents.length > 0 ? data.residents.length : 'There are no residents.'}
        </p>
      </div>

    
      {
       
              <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Characters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characterData?.results?.map((character:any) => (
          <div key={character.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
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
                <strong>Origin:</strong> {character.origin?.name || 'Unknown'}
              </p>
              <p className="text-gray-600">
                <strong>Location:</strong> {character.location?.name || 'Unknown'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
        })
      
    </div>
  );
};

export default SingleLocation;
