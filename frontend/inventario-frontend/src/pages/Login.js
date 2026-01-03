import { useState } from "react";
import axios from "../api";
import { jwtDecode } from "jwt-decode";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
  try {
    const res = await axios.post("/auth/login", { email, password });

    console.log("RESPUESTA COMPLETA LOGIN:", res);
    console.log("DATA LOGIN:", res.data);

    const token = res.data.token;
    console.log("TOKEN:", token);

    const decoded = jwtDecode(token);
    console.log("TOKEN DECODIFICADO:", decoded);

    localStorage.setItem("token", token);
    localStorage.setItem("rol", decoded.rol);

    window.location = "/dashboard";
  } catch (e) {
    console.error("ERROR LOGIN:", e);
    alert("Credenciales incorrectas");
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Sistema de Inventario</h3>

        <input
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={login}>
          Ingresar
        </button>

        <button
          className="btn btn-link w-100 mt-2"
          onClick={() => (window.location = "/register")}
        >
          Crear cuenta
        </button>
      </div>
    </div>
  );
}
