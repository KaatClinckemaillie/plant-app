import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Plants from "./pages/Plants";
import Search from "./pages/Search";


function App() {
  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="plants" element={<Plants />} />
        <Route path="search" element={<Search />} />
      </Route>

    </Routes>

  );
}

export default App;
