import { NavLink } from "react-router";
import type { Character, Location } from "../types/api";

type CardProps = {
  item: Character | Location;
  stateKey?: string;
  route: string;
  title: string;
  subtitle: string;
  image?: string;
  height?: string;
  centered?: string;
};

export default function Card({
  item,
  stateKey = "characterObj",
  route,
  title,
  subtitle,
  image,
  height,
  centered,
}: CardProps) {
  const linkState = { [stateKey]: item };

  return (
    <li
      className={`${height} w-full md:w-60 rounded-sm shadow-card overflow-hidden cursor-pointer ${centered}`}
    >
      <NavLink to={route} state={linkState}>
        {image && (
          <img className="h-auto md:h-42 w-full" src={image} alt={title} />
        )}
        <div className="px-4 py-3">
          <p className="font-medium text-xl leading-6 tracking-[.01em] text-gray2">
            {title}
          </p>
          <p className="text-sm leading-6 tracking-[.02em] text-gray3">
            {subtitle}
          </p>
        </div>
      </NavLink>
    </li>
  );
}
