import { useEffect, useState } from "react";
import axios from "axios";
import logoBig from "../assets/images/logo-big.png";
import LoadMoreBtn from "../components/LoadMoreBtn.tsx";
import { getCharactersFilters } from "../data/filtersData.ts";
import Select from "../components/Select.tsx";
import Input from "../components/Input.tsx";
import { API_URL } from "../data/api.ts";
import { handleLoadMore } from "../utils/index.ts";
import FiltersOverlay from "../components/FiltersOverlay.tsx";
import Card from "../components/Card.tsx";
import type { CharactersApiResponse } from "../types/api.ts";

export default function CharactersPage() {
  const [search, setSearch] = useState("");
  const [charactersData, setCharactersData] =
    useState<CharactersApiResponse | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const selectFilters = getCharactersFilters({
    species,
    setSpecies,
    gender,
    setGender,
    status,
    setStatus,
  });

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${API_URL}/character`, {
          params: {
            page: pageNumber,
            name: search,
            species,
            gender,
            status,
          },
        });
        const data = response.data;
        setError(null);

        if (pageNumber === 1) {
          setCharactersData(data);
        } else {
          setCharactersData((prev) => ({
            ...data,
            results: [...(prev?.results || []), ...data.results],
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load characters. Please try again later.");
      }
    }

    getData();
  }, [search, species, gender, status, pageNumber]);

  useEffect(() => {
    setPageNumber(1);
  }, [species, gender, status]);

  return (
    <div className="container pt-23 md:pt-21.5 pb-4 md:pb-11 container-centered">
      <img className="mx-auto mb-8 md:mb-4" src={logoBig} alt="Rick & Morty" />
      <div className="md:flex gap-5 justify-center mb-4 md:mb-12">
        <Input
          search={search}
          setSearch={setSearch}
          className="w-full md:w-60"
        />
        {selectFilters.map(({ name, value, onChange, options }) => (
          <Select
            key={name}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            name={name}
            className="hidden md:block w-60"
            options={options}
          />
        ))}
      </div>

      <FiltersOverlay>
        {selectFilters.map(({ name, value, onChange, options }) => (
          <Select
            key={name}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            name={name}
            className="w-full"
            options={options}
          />
        ))}
      </FiltersOverlay>

      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <ul className="flex flex-wrap justify-center gap-5 mb-12">
          {charactersData &&
            charactersData.results.map((item) => (
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
      <LoadMoreBtn onClick={() => handleLoadMore(setPageNumber)} />
    </div>
  );
}
