import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import CharacterDetailsPage from "./pages/CharacterDetailsPage";
import CharactersPage from "./pages/CharactersPage";
import EpisodeDetailsPage from "./pages/EpisodeDetailsPage";
import EpisodesPage from "./pages/EpisodesPage";
import LocationDetailsPage from "./pages/LocationDetailsPage";
import LocationsPage from "./pages/LocationsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <CharactersPage /> },
      { path: "locations", element: <LocationsPage /> },
      { path: "episodes", element: <EpisodesPage /> },
      { path: "character/:id", element: <CharacterDetailsPage /> },
      { path: "location/:id", element: <LocationDetailsPage /> },
      { path: "episode/:id", element: <EpisodeDetailsPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
