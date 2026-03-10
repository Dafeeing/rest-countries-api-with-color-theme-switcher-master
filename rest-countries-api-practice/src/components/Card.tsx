import { Link } from "react-router-dom";
import { useAppContext } from "./AppContext";

type CountryCardProps = {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, { official: string; common: string }>;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  flags: { png: string };
  borders: string[];
  languages: Record<string, string>;
  currencies: Record<string, { name: string; symbol: string }>;
  tld: string[];
};

const Card = (props: CountryCardProps) => {
  const { darkMode } = useAppContext();
  return (
    <div
      className={`${darkMode ? "bg-[hsl(207,26%,17%)] text-white" : "bg-gray-100 text-black"} shadow-md rounded-lg overflow-hidden`}
    >
      <div>
        <img
          className="w-full h-48 object-cover"
          src={props.flags.png}
          alt={props.name.common}
        />
      </div>
      <div className="p-8">
        <div className="mb-5 font-bold">
          <Link to="/details" state={props} className="hover:underline">
            {props.name.common}
          </Link>
        </div>
        <div className="mb-3">
          <span className="font-bold">Population: </span>
          <span>{props.population.toLocaleString()}</span>
        </div>
        <div className="mb-3">
          <span className="font-bold">Region: </span>
          <span>{props.region}</span>
        </div>
        <div className="mb-3">
          <span className="font-bold">Capital: </span>
          <span>{props.capital}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
