import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Plants from "./pages/Plants";
import Search from "./pages/Search";
import Location from "./pages/Location";
import Plant from './pages/Plant';


import { useQuery } from "react-query";



function App() {



  return (
    
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="plants" element={<Plants />} />
        <Route path="search" element={<Search />} />
        <Route path="location" element={<Location />}/>
        <Route path="plant/:plantSortId" element={<Plant />}/>
      </Route>

    </Routes>

  );
}

export default App;
