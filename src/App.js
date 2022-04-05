import logo from './logo.svg';
import './App.css';
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <h1>Home</h1>
        <Link to="/"> Home</Link>
        <Link to="/Plants">Plants</Link>
        <Link to="/Search">Search</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
