import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getLocationDetails } from "../data/locationDetailData.js";
import { API_URL } from "../data/api.js";
import Card from "../components/Card.js";
import type { Character, Location } from "../types/api.ts";
import ErrorPage from "./ErrorPage.tsx";
// import GoBackBtn from "../components/GoBackBtn.tsx";
import Loader from "../components/Loader.tsx";

export default function LocationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [locationObj, setLocationObj] = useState<Location | null>(null);
  const [residentsData, setResidentsData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchLocationData() {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(`${API_URL}/location/${id}`);
        const location = response.data;
        setLocationObj(location);

        if (location.residents?.length) {
          const residentIds = location.residents
            .map((url: string) => url.split("/").pop())
            .join(",");
          const residentsResponse = await axios.get(
            `${API_URL}/character/${residentIds}`
          );

          const residentsData = residentsResponse.data;
          setResidentsData(
            Array.isArray(residentsData) ? residentsData : [residentsData]
          );
        } else {
          setResidentsData([]);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        setError(true);
        setLocationObj(null);
        setResidentsData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchLocationData();
  }, [id]);

  if (loading) {
    return <Loader item="location" />;
  }

  if (error || !locationObj) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="container pt-21 pb-20.5 md:pt-22.5 md:pb-9 container-centered">
        <div className="flex flex-col md:flex-row md:gap-40 lg:gap-70 xl:gap-100 md:items-center md:mb-6">
          {/* <GoBackBtn to="/locations" /> */}

          <p className="text-4xl text-center text-gray7 mb-6 md:mb-0">
            {locationObj.name}
          </p>
        </div>
        <ul className="flex justify-around mb-16">
          {getLocationDetails(locationObj).map(([label, value]) => (
            <li key={label}>
              <p className="font-bold tracking-[0.01em] text-gray7">{label}:</p>
              <p className="text-sm leading-[1.42] tracking-[.02em] text-gray8">
                {value}
              </p>
            </li>
          ))}
        </ul>
        <p className="font-medium text-xl leading-[1.2 tracking-[.01em]] text-gray5 mb-6">
          Residents
        </p>
        <ul className="flex flex-wrap justify-center gap-5">
          {residentsData.map((item) => (
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
