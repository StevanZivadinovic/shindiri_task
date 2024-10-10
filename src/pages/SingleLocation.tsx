import { useParams } from 'react-router-dom';
import { fetchSingleLocationData } from '../consts/Api';
import { useQuery } from 'react-query';
import { CharactersList } from '../components/CharactersList';

const SingleLocation = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(
    ['location', id],
    () => fetchSingleLocationData(Number(id)),
    {
      enabled: !!id,
    }
  );


  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading location details.</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4">{data?.name}</h1>
        <div className="mb-4">
          <p className="text-lg">
            <strong>Type:</strong> {data?.type}
          </p>
          <p className="text-lg">
            <strong>Dimension:</strong> {data?.dimension}
          </p>
          <p className="text-lg">
            <strong>Created:</strong> {new Date(data?.created).toLocaleString()}
          </p>
          <p className="text-lg">
            <strong>Number of Residents:</strong> {data?.residents?.length}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-2">Residents:</h2>
        <p>
          Number of residents: {data?.residents?.length > 0 ? data?.residents?.length : 'There are no residents.'}
        </p>
      </div>

    <CharactersList data1={data}/>
      
      
    </div>
  );
};

export default SingleLocation;
