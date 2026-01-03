import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Dashboard(){

 return(
  <>
   <Navbar/>

   <div className="container mt-4">

    <h3>Panel Principal</h3>
    <p>Bienvenido al sistema de control de inventario</p>

    <div className="row">

      <div className="col-md-4 mb-3">
        <div className="card shadow">
         <div className="card-body">
          <h5 className="card-title">Gestión de Productos</h5>
          <p>Consulta, registra y administra productos</p>
          <Link to="/productos" className="btn btn-primary w-100">
            Ir a Productos
          </Link>
         </div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="card shadow">
         <div className="card-body">
          <h5 className="card-title">Historial</h5>
          <p>Consulta movimientos y auditoría</p>
          <Link to="/historial" className="btn btn-success w-100">
            Ver Historial
          </Link>
         </div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="card shadow">
         <div className="card-body">
          <h5 className="card-title">Cuenta</h5>
          <p>Opciones de usuario y configuración</p>
          <button className="btn btn-secondary w-100" disabled>
            Próximamente
          </button>
         </div>
        </div>
      </div>

    </div>

   </div>
  </>
 );
}
