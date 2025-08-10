import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getEpisodeDetails } from "../data/episodeDetailsData.ts";
import { API_URL } from "../data/api.ts";
import Card from "../components/Card.tsx";
import ErrorPage from "./ErrorPage.tsx";
import type { Character, Episode } from "../types/api.ts";
import GoBackBtn from "../components/GoBackBtn.tsx";

export default function EpisodeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [episodeObj, setEpisodeObj] = useState<Episode | null>(null);
  const [charactersData, setCharactersData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchEpisodeData() {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(`${API_URL}/episode/${id}`);
        const episode = response.data;
        setEpisodeObj(episode);

        if (episode.characters?.length) {
          const characterIds = episode.characters
            .map((url: string) => url.split("/").pop())
            .join(",");
          const charactersResponse = await axios.get(
            `${API_URL}/character/${characterIds}`
          );

          const charactersData = charactersResponse.data;
          setCharactersData(
            Array.isArray(charactersData) ? charactersData : [charactersData]
          );
        } else {
          setCharactersData([]);
        }
      } catch (error) {
        console.error("Error fetching episode:", error);
        setError(true);
        setEpisodeObj(null);
        setCharactersData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEpisodeData();
  }, [id]);

  if (loading) {
    return (
      <div className="container pt-21 pb-20.5 md:pt-22.5 md:pb-9 container-centered">
        <p>Loading episode...</p>
      </div>
    );
  }

  if (error || !episodeObj) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="container pt-21 pb-20.5 md:pt-22.5 md:pb-9 container-centered">
        <div className="flex flex-col md:flex-row md:gap-40 lg:gap-70 xl:gap-100 md:items-center md:mb-6">
          <GoBackBtn to="/episodes" />

          <p className="text-4xl text-center text-gray7 mb-6">
            {episodeObj.name}
          </p>
        </div>
        <ul className="flex justify-around mb-16">
          {getEpisodeDetails(episodeObj).map(([label, value]) => (
            <li key={label}>
              <p className="font-bold tracking-[0.01em] text-gray7">{label}:</p>
              <p className="text-sm leading-[1.42] tracking-[.02em] text-gray8">
                {value}
              </p>
            </li>
          ))}
        </ul>
        <p className="font-medium text-xl leading-[1.2 tracking-[.01em]] text-gray5 mb-6">
          Cast
        </p>
        <ul className="flex flex-wrap justify-center gap-5">
          {charactersData.map((item) => (
            <Card
              key={item.id}
              item={item}
              route={`/character/${item.id}`}
              title={item.name}
              subtitle={item.species}
              image={item.image}
              height="h-auto md:h-61"
            />
          ))}
        </ul>
      </div>
    </>
  );
}
