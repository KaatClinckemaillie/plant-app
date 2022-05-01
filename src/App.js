import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Plants from "./pages/Plants";
import Search from "./pages/Search";
import Location from "./pages/Location";
import Plant from './pages/Plant';
import Plantsort from './pages/Plantsort';
import PlantCategory from './pages/PlantCategory';
import AddPlant from './pages/AddPlant';
import Progress from "./pages/Progress";
import AddLocation from "./pages/AddLocation";
import LoginRedirect from './pages/LoginRedirect';
import AddPicture from "./pages/AddPicture";
import LogIn from "./pages/LogIn";
import { useStore } from './store';




function App() {

  const isLogged = useStore(state => state.isLoggedIn);
  const userId = useStore(state => state.userId);
 

  return (
    
    <Routes>
        <Route exact path="/connect/:providerName/redirect" element={<LoginRedirect />} />
        <Route path="/" element={<Layout />}  >
          <Route index element={userId ? <Home /> : <Navigate to="/LogIn" replace={true}/>} />
          <Route path="plants" element={isLogged ? <Plants /> : <Navigate to="/LogIn" replace={true}/>} />
          <Route path="search" element={isLogged ? <Search /> : <Navigate to="/LogIn" replace={true}/>} />
          <Route path="location/:locationId" element={isLogged ? <Location /> : <Navigate to="/LogIn" replace={true}/>}/>        
        </Route>
        <Route path="plant/:plantId" element={isLogged ? <Plant /> : <Navigate to="/LogIn" replace={true}/>}/>
        <Route path="plantsort/:plantsortId" element={isLogged ? <Plantsort /> : <Navigate to="/LogIn" replace={true}/>}/>
        <Route path="plantCategory/:plantCategoryId" element={ isLogged ? <PlantCategory /> : <Navigate to="/LogIn" replace={true}/>}/>
        <Route path='addPlant/:plantsortId' element={isLogged ? <AddPlant /> : <Navigate to="/LogIn" replace={true}/>} />
        <Route path='addPicture/:plantId' element={isLogged ? <AddPicture /> : <Navigate to="/LogIn" replace={true}/>} />
        <Route path='addLocation' element={isLogged ? <AddLocation /> : <Navigate to="/LogIn" replace={true}/>} />
        <Route path='progress/:progressId' element={isLogged ? <Progress /> : <Navigate to="/logIn" replace={true}/>} />
        <Route path='logIn' element={<LogIn />} />
        
      </Routes>

  );
}

export default App;
