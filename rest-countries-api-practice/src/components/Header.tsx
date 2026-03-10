import { useAppContext } from "./AppContext";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const { darkMode, toggleDarkMode } = useAppContext();

  return (
    <nav
      className={`${darkMode ? "bg-[#2b3945]" : "bg-white"} py-6 shadow-md`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1
          className={`font-extrabold text-lg ${darkMode ? "text-white" : "text-black"}`}
        >
          Where in the world?
        </h1>
        <button
          onClick={toggleDarkMode}
          className={`flex items-center gap-2 font-semibold ${darkMode ? "text-white" : "text-black"}`}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Header;
