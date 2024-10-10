import { useSingleCharacterDetailsQuery } from "../consts/Api";
import { useParams, Link } from "react-router-dom";

const SingleCharacter = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useSingleCharacterDetailsQuery(id)

  if (isLoading)
    return <p className="text-center text-lg">Loading character details...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center">
        Error loading character details.
      </p>
    );

  const { name, status, gender, species, image, location, episode } = data;
  const urlObj = location?.url?.length>0 ? new URL(location?.url) :'';
  const locationPath = urlObj!=='' ? urlObj?.pathname?.replace("/api/", ""):'#';
  const episodeId = episode.length === 1 && episode[0]?.split("/").pop();
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
        <img
          src={image}
          alt={name}
          className="w-48 h-48 object-cover rounded-full mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-md text-gray-700">
          <strong>Status:</strong> {status}
        </p>
        <p className="text-md text-gray-700">
          <strong>Gender:</strong> {gender}
        </p>
        <p className="text-md text-gray-700">
          <strong>Species:</strong> {species}
        </p>
        <p className="text-md text-gray-700">
          <strong>Location:</strong>
          <Link
            to={`/${locationPath}`}
            className="text-blue-500 underline ml-1"
          >
            {location?.name}
          </Link>
        </p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Episodes:</h3>
          <ul className="list-disc pl-5">
            {Array.isArray(episode) ? (
              episode?.map((epUrl: string) => {
                const episodeId = epUrl?.split("/").pop();
                return (
                  <li key={episodeId}>
                    <Link
                      to={`/episode/${episodeId}`}
                      className="text-blue-500 underline"
                    >
                      Episode {episodeId}
                    </Link>
                  </li>
                );
              })
            ) : (
              <li key={episodeId}>
                <Link
                  to={`/episode/${episodeId}`}
                  className="text-blue-500 underline"
                >
                  Episode {episodeId}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleCharacter;
