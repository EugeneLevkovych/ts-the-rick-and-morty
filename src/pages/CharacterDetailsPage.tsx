import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getCharacterDetails } from "../data/characterDetailsData.ts";
import { API_URL } from "../data/api.ts";
import type { Character, Episode, LocationState } from "../types/api.ts";
import ErrorPage from "./ErrorPage.tsx";

export default function CharacterDetailsPage() {
  const location = useLocation() as { state: LocationState | null };
  const navigate = useNavigate();
  const characterObj: Character | undefined = location.state?.characterObj;
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEpisodes() {
      if (!characterObj?.episode?.length) {
        setLoading(false);
        return;
      }
      setLoading(true);

      try {
        const episodeIds = characterObj.episode.map((url: string) => {
          const parts = url.split("/");
          return parts[parts.length - 1];
        });

        const response = await axios.get(
          `${API_URL}/episode/${episodeIds.join(",")}`
        );

        const data = response.data;

        setEpisodes(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching episodes:", error);
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    }

    if (characterObj) {
      fetchEpisodes();
    } else {
      setLoading(false);
    }
  }, [characterObj]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!characterObj) {
    return <ErrorPage />;
  }

  return (
    <div className="container pt-21 pb-20.5 md:pt-19 md:pb-9 container-centered">
      <div
        onClick={handleGoBack}
        className="flex items-center gap-2 font-bold text-lg text-black uppercase cursor-pointer mb-4"
      >
        <svg className="size-6">
          <use href="./sprite.svg#icon-arrow-back"></use>
        </svg>
        <p>Go back</p>
      </div>
      <img
        className="size-37 md:size-75 border-5 border-gray9 rounded-full mx-auto md:-mt-11 mb-4"
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
          {loading ? (
            <p>Loading episodes...</p>
          ) : (
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
                    <use href="./sprite.svg#icon-arrow1"></use>
                  </svg>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
