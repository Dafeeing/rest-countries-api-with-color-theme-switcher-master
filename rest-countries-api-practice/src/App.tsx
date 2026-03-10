import { Routes, Route } from 'react-router-dom';
import Body from "./components/Body";
import Header from "./components/Header";
import CountryDetail from "./components/Details";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/details" element={<CountryDetail />} />
      </Routes>
    
    </>
  );
}

export default App;
