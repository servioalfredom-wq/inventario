import { FaBoxes, FaHistory, FaHome, FaSignOutAlt } from "react-icons/fa";

export default function Navbar(){

 return(
  <nav className="navbar navbar-expand-md navbar-dark" style={{background:"#111827"}}>  {/* Cambia lg a md para colapsar antes */}
    <div className="container-fluid">

      <span className="navbar-brand fw-bold">
        Inventario
      </span>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="nav">
        <ul className="navbar-nav me-auto">

          <li className="nav-item">
            <a className="nav-link" href="/dashboard">
              <FaHome/> Inicio
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/productos">
              <FaBoxes/> Productos
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/historial">
              <FaHistory/> Historial
            </a>
          </li>

        </ul>

        <button 
          className="btn btn-danger btn-sm mt-2 mt-md-0"  // Ajusta para móvil
          onClick={()=>{
            localStorage.clear();
            window.location="/";
          }}>
          <FaSignOutAlt/> Cerrar Sesión
        </button>

      </div>
    </div>
  </nav>
 );
}
