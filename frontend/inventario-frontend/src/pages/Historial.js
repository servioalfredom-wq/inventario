import axios from "../api";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Historial() {
  const [token] = useState(localStorage.getItem("token"));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const res = await axios.get("/historial", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(res.data);
      } catch (err) {
        console.error("Error al obtener historial:", err);
        setError("Error al cargar el historial. Verifica tu conexión.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchHistorial();
    } else {
      setError("No autorizado. Inicia sesión.");
      setLoading(false);
    }
  }, [token]);

  const formatFechaEcuador = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString('es-EC', {
      timeZone: 'America/Guayaquil',
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  function FilaHistorial({ item }) {
    if (!item) return null;
    const textoFecha = item.fecha_local || formatFechaEcuador(item.fecha);
    const detalle = item.tipo_movimiento === "cambio_precio" ? `Precio: $${item.cantidad}` : `Stock: ${item.cantidad}`;
    return (
      <tr>
        <td>{item.nombre || "-"}</td>
        <td>{item.tipo_movimiento || "-"}</td>
        <td>{detalle}</td>
        <td>{textoFecha}</td>
      </tr>
    );
  }

  if (loading) return <><Navbar/><div className="container mt-4"><p>Cargando historial...</p></div></>;
  if (error) return <><Navbar/><div className="container mt-4"><p className="text-danger">{error}</p></div></>;

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Historial</h2>
        <table className="table table-dark table-striped mt-3">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Movimiento</th>
              <th>Detalle</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {data.map(h => (
              <FilaHistorial key={h.id_historial} item={h} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
