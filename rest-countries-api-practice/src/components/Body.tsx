import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import Card from "./Card";
import { useAppContext } from "./AppContext";
import Pagination from "./Pagination";

type Country = {
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

const Body = () => {
  const { darkMode } = useAppContext();
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(8)
 
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,borders,subregion,languages,currencies,tld"
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, []);

  const lastCountryIndex = currentPage * postsPerPage;
  const firstCountryIndex = lastCountryIndex - postsPerPage;
  const currentCountries =  countries.slice(firstCountryIndex, lastCountryIndex)


  const filteredCountries = currentCountries
    .filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    .filter((country) =>
      region ? country.region === region : true
    );

  return (
    <div className={`${darkMode ? "bg-[hsl(207,26%,17%)] text-white" : "bg-gray-100 text-black"} min-h-screen p-20 text-[0.875rem]`}>
      <div className="flex justify-between items-center py-10">
        <div className={`flex items-center ${darkMode ? "bg-[hsl(209,23%,22%)]" : "bg-white"} px-6 py-3 rounded-md w-[400px] shadow`}>
          <FaSearch className="text-gray-300 mr-4" />
          <input
            type="text"
            placeholder="Search for a country"
            className="bg-transparent outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className={`${darkMode ? "bg-[hsl(209,23%,22%)] text-white" : "bg-white text-black"} px-6 py-3 rounded-md cursor-pointer shadow`}
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          id="region"
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-10 mt-10">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <Card key={country.name.common} {...country} />
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-400">No countries found.</p>
        )}
      </div>
      <Pagination totalPosts={countries.length} postsPerPage={postsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Body;