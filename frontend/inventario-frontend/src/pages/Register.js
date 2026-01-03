import {useState} from "react";
import axios from "../api";

export default function Register(){

 const[nombre,setNombre] = useState("");
 const[email,setEmail] = useState("");
 const[password,setPassword] = useState("");

 const registrar = async()=>{
  await axios.post("/auth/register",{nombre,email,password});
  alert("Usuario registrado");
  window.location="/";
 }

 return(
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div className="card p-4 shadow" style={{width:"400px"}}>
      <h3 className="text-center mb-3">Registro de Usuario</h3>

      <input className="form-control mb-2" placeholder="Nombre" onChange={e=>setNombre(e.target.value)}/>
      <input className="form-control mb-2" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
      <input className="form-control mb-2" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>

      <button className="btn btn-success w-100" onClick={registrar}>
        Registrar
      </button>

      <button className="btn btn-link mt-2" onClick={()=>window.location="/"}>
        Ya tengo cuenta
      </button>
    </div>
  </div>
 );
}
