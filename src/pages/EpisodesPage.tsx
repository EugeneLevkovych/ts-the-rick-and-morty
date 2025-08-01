import axios from "axios";
import episodesImg from "../assets/images/episodes.png";
import { useEffect, useState } from "react";
import Input from "../components/Input.tsx";
import LoadMoreBtn from "../components/LoadMoreBtn.tsx";
import { API_URL } from "../data/api.ts";
import { handleLoadMore } from "../utils/index.ts";
import Card from "../components/Card.tsx";

export default function EpisodesPage() {
  const [searchEpisodes, setSearchEpisodes] = useState("");
  const [episodesData, setEpisodesData] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${API_URL}/episode`, {
          params: {
            page: pageNumber,
            name: searchEpisodes,
          },
        });
        const data = response.data;

        if (pageNumber === 1) {
          setEpisodesData(data);
        } else {
          setEpisodesData((prev) => ({
            ...data,
            results: [...(prev?.results || []), ...data.results],
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, [searchEpisodes, pageNumber]);

  return (
    <div className="container pt-25 pb-6 container-centered">
      <img
        className="w-43.5 md:w-67.5 mx-auto mb-6"
        src={episodesImg}
        alt="Rick & Morty"
      />
      <div className="md:flex md:justify-center mb-12 md:mb-16">
        <Input
          search={searchEpisodes}
          setSearch={setSearchEpisodes}
          className="w-full md:w-125"
        />
      </div>
      <ul className="flex flex-wrap justify-center gap-5 mb-12">
        {episodesData &&
          episodesData.results.map((item) => (
            <Card
              key={item.id}
              item={item}
              stateKey="episodeObj"
              route="/episode-details"
              title={item.name}
              subtitle={item.air_date}
              height="h-78 md:h-32"
              centered="flex justify-center items-center"
            />
          ))}
      </ul>
      <LoadMoreBtn onClick={() => handleLoadMore(setPageNumber)} />
    </div>
  );
}
