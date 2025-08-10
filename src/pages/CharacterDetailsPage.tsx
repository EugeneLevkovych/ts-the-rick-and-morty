import axios from "axios";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getCharacterDetails } from "../data/characterDetailsData.ts";
import { API_URL } from "../data/api.ts";
import type { Character, Episode } from "../types/api.ts";
import ErrorPage from "./ErrorPage.tsx";
import GoBackBtn from "../components/GoBackBtn.tsx";
import Loader from "../components/Loader.tsx";

export default function CharacterDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [characterObj, setCharacterObj] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCharacterData() {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(`${API_URL}/character/${id}`);
        const character = response.data;
        setCharacterObj(character);

        if (character.episode?.length) {
          const episodeIds = character.episode.map((url: string) => {
            const parts = url.split("/");
            return parts[parts.length - 1];
          });

          const episodeResponse = await axios.get(
            `${API_URL}/episode/${episodeIds.join(",")}`
          );

          const episodeData = episodeResponse.data;
          setEpisodes(Array.isArray(episodeData) ? episodeData : [episodeData]);
        } else {
          setEpisodes([]);
        }
      } catch (error) {
        console.error("Error fetching character:", error);
        setError(true);
        setCharacterObj(null);
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacterData();
  }, [id]);

  if (loading) {
    return <Loader item="character" />;
  }

  if (error || !characterObj) {
    return <ErrorPage />;
  }

  return (
    <div className="container pt-21 pb-20.5 md:pt-19 md:pb-9 container-centered">
      <GoBackBtn to="/" />

      <img
        className="size-37 md:size-75 border-5 border-gray9 rounded-full mx-auto md:-mt-7 mb-4"
        src={characterObj.image}
      />
      <p className="text-[2rem] text-center text-gray7 pb-4">
        {characterObj.name}
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-13 md:gap-5">
        <div className="max-w-103 w-full">
          <p className="font-medium text-xl leading-tight tracking-[.01em] text-gray5 mb-4">
            Informations
          </p>
          <ul>
            {getCharacterDetails(characterObj).map(([label, value]) => (
              <li
                key={label}
                className="w-full border-b border-gray6 pt-2 pb-3 px-4"
              >
                <p className="font-bold tracking-[0.01em] text-gray7">
                  {label}:
                </p>
                <p className="text-sm leading-[1.42] tracking-[.02em] text-gray8">
                  {value}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium text-xl leading-tight tracking-[.01em] text-gray5 mb-4">
            Episodes
          </p>
          <ul>
            {episodes.map((episode) => (
              <li
                key={episode.id}
                className="relative w-full border-b border-gray6 pt-[10px] pb-4 px-4"
              >
                <p className="font-bold tracking-[0.01em] text-gray7">
                  {episode.name}
                </p>
                <p className="text-sm leading-[1.42] tracking-[.02em] text-gray8">
                  {episode.episode}
                </p>
                <p className="font-medium text-[10px] leading-[1.6] tracking-[.15em] uppercase text-gray5">
                  {episode.air_date}
                </p>
                <svg className="absolute size-4 top-9.5 right-9.5 fill-gray5">
                  <use href="/sprite.svg#icon-arrow-right"></use>
                </svg>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
