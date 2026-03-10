import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";

interface NativeName {
  official: string;
  common: string;
}

interface Currency {
  name: string;
  symbol: string;
}

interface Country {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, NativeName>;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  flags: { png: string; svg: string };
  borders: string[];
  languages: Record<string, string>;
  currencies: Record<string, Currency>;
  tld: string[];
}

const CountryDetail = () => {
  const { darkMode } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state as Country;

  if (!country) {
    return <div>No country data</div>;
  }

  const nativeName = country.name.nativeName
    ? (Object.values(country.name.nativeName)[0] as NativeName).common
    : country.name.common;

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c: Currency) => c.name)
        .join(", ")
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const tld = country.tld ? country.tld.join(", ") : "N/A";

  return (
    <div
      className={`${darkMode ? "bg-[hsl(207,26%,17%)] text-white" : "bg-gray-100 text-black"} min-h-screen font-['Nunito_Sans']`}
    >
      <main id="country-section" className="max-w-7xl mx-auto px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className={`${darkMode ? "bg-[hsl(207,26%,17%)] text-white" : "bg-gray-100 text-black"} flex items-center gap-2 px-8 py-2 rounded shadow-lg mb-16 hover:bg-opacity-80 transition-all`}
        >
          <FaArrowLeft /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="w-full shadow-2xl">
            <img
              src={country.flags.png}
              alt={`${country.name.common} Flag`}
              className="w-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl font-extrabold mb-8">
              {country.name.common}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Native Name:</span>{" "}
                  {nativeName}
                </p>
                <p>
                  <span className="font-semibold">Population:</span>{" "}
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Region:</span>{" "}
                  {country.region}
                </p>
                <p>
                  <span className="font-semibold">Sub Region:</span>{" "}
                  {country.subregion ?? "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Capital:</span>{" "}
                  {country.capital}
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Top Level Domain:</span> {tld}
                </p>
                <p>
                  <span className="font-semibold">Currencies:</span>{" "}
                  {currencies}
                </p>
                <p>
                  <span className="font-semibold">Languages:</span> {languages}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span className="font-semibold">Border Countries:</span>
              <div className="flex flex-wrap gap-2">
                {country.borders?.length ? (
                  country.borders.map((border: string) => (
                    <button
                      key={border}
                      className={`{${darkMode ? "bg-[hsl(207,26%,17%)] text-white" : "bg-gray-100 text-black"}} px-6 py-1 bg text-sm rounded shadow-md border border-transparent hover:border-gray-500`}
                    >
                      {border}
                    </button>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">None</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CountryDetail;
