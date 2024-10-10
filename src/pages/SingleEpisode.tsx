import { useQuery } from "react-query";
import { fetchSingleEpisodeDetails } from "../consts/Api";
import { useParams } from "react-router-dom";
import { formatDate } from "../helperFunctions/global";
import { CharactersList } from "../components/CharactersList";

const SingleEpisode = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery(
    ["character", id],
    () => fetchSingleEpisodeDetails(Number(id)),
    {
      enabled: !!id,
    }
  );

  isLoading && <p className="text-center text-lg">Loading...</p>;
  error && <p className="text-red-500 text-center">Error loading episode.</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">{data?.name}</h2>
        <p className="text-md text-gray-700">
          <strong>Episode:</strong> {data?.episode}
        </p>

        <p className="text-md text-gray-700">
          <strong>Air date:</strong> {data?.air_date}
        </p>
        <p className="text-md text-gray-700">
          <strong>Created:</strong> {data?.created && formatDate(data?.created)}
        </p>
      </div>
      <CharactersList data1={data} />
    </div>
  );
};

export default SingleEpisode;
