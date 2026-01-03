import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Productos from "./pages/Productos";
import Historial from "./pages/Historial";
import Register from "./pages/Register";
import "./App.css";

export default function App(){
 return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/productos" element={<Productos/>}/>
      <Route path="/historial" element={<Historial/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  </BrowserRouter>
 );
}
  