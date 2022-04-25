import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Plants from "./pages/Plants";
import Search from "./pages/Search";
import Location from "./pages/Location";
import Plant from './pages/Plant';
import Plantsort from './pages/Plantsort';
import PlantCategory from './pages/PlantCategory';
import AddPlant from './pages/AddPlant';
import LoginRedirect from './pages/LoginRedirect';
import LogIn from "./pages/LogIn";

import { useQuery } from "react-query";



function App() {



  return (
    
    <Routes>
        <Route exact path="/connect/:providerName/redirect" element={<LoginRedirect />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="plants" element={<Plants />} />
          <Route path="search" element={<Search />} />
          <Route path="location" element={<Location />}/>        
        </Route>
        <Route path="plant/:plantId" element={<Plant />}/>
        <Route path="plantsort/:plantsortId" element={<Plantsort />}/>
        <Route path="plantCategory/:plantCategoryId" element={<PlantCategory />}/>
        <Route path='addPlant/:plantsortId' element={<AddPlant />} />
        <Route path='logIn' element={<LogIn />} />
        
      </Routes>

  );
}

export default App;
