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
import { useStore } from './store';
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";



function App() {

  const isLogged = useStore(state => state.isLoggedIn)

  return (
    
    <Routes>
        <Route exact path="/connect/:providerName/redirect" element={<LoginRedirect />} />
        <Route path="/" element={<Layout />}  >
          <Route index element={isLogged ? <Home /> : <Navigate to="/LogIn" replace={true}/>} />
          <Route path="plants" element={isLogged ? <Plants /> : <Navigate to="/LogIn" replace={true}/>} />
          <Route path="search" element={isLogged ? <Search /> : <Navigate to="/LogIn" replace={true}/>} />
          <Route path="location" element={isLogged ? <Location /> : <Navigate to="/LogIn" replace={true}/>}/>        
        </Route>
        <Route path="plant/:plantId" element={isLogged ? <Plant /> : <Navigate to="/LogIn" replace={true}/>}/>
        <Route path="plantsort/:plantsortId" element={isLogged ? <Plantsort /> : <Navigate to="/LogIn" replace={true}/>}/>
        <Route path="plantCategory/:plantCategoryId" element={ isLogged ? <PlantCategory /> : <Navigate to="/LogIn" replace={true}/>}/>
        <Route path='addPlant/:plantsortId' element={isLogged ? <AddPlant /> : <Navigate to="/LogIn" replace={true}/>} />
        <Route path='logIn' element={<LogIn />} />
        
      </Routes>

  );
}

export default App;
