import axios from "axios";
import { NavLink, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getEpisodeDetails } from "../data/episodeDetailsData.ts";
import { API_URL } from "../data/api.ts";
import Card from "../components/Card.tsx";

export default function EpisodeDetailsPage() {
  const episode = useLocation();
  const episodeObj = episode.state?.episodeObj;
  const [charactersData, setCharactersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEpisodes() {
      setLoading(true);

      if (!episodeObj?.characters?.length) {
        setLoading(false);
        return;
      }
      try {
        const ids = episodeObj.characters
          .map((url) => url.split("/").pop())
          .join(",");
        const response = await axios.get(`${API_URL}/character/${ids}`);

        const data = await response.data;

        setCharactersData(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setCharactersData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEpisodes();
  }, [episodeObj]);

  return (
    <>
      <div className="container pt-21 pb-20.5 md:pt-22.5 md:pb-9 container-centered">
        <div className="flex flex-col md:flex-row md:gap-40 lg:gap-70 xl:gap-100 md:items-center md:mb-6">
          <NavLink to={"/locations"}>
            <div className="flex items-center gap-2 font-bold text-lg text-black uppercase cursor-pointer mb-4">
              <svg className="size-6">
                <use href="./sprite.svg#icon-arrow-back"></use>
              </svg>
              <p>Go back</p>
            </div>
          </NavLink>

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
        {loading ? (
          <p>Loading Residents...</p>
        ) : (
          <ul className="flex flex-wrap justify-center gap-5">
            {charactersData.map((item) => (
              <Card
                key={item.id}
                item={item}
                stateKey="characterObj"
                route="/character-details"
                title={item.name}
                subtitle={item.species}
                image={item.image}
                height="h-auto md:h-61"
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
