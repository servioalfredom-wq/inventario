import axios from "../api";
import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

export default function Productos(){

 const[token] = useState(localStorage.getItem("token"));
 const[data,setData] = useState([]);

  useEffect(() => {
   const fetchProductos = async () => {
     try {
       const res = await axios.get("/productos", {
         headers: {
           Authorization: `Bearer ${token}`
         }
       });
       setData(res.data);
     } catch (error) {
       console.error("Error al obtener productos:", error);
     }
   };

   fetchProductos();
 }, [token]);

const itemsPerPage = 5;
const [itemOffset,setItemOffset] = useState(0);

const endOffset = itemOffset + itemsPerPage;
const currentItems = data.slice(itemOffset,endOffset);
const pageCount = Math.ceil(data.length / itemsPerPage);

const rol = localStorage.getItem("rol");


const handlePageClick = (event)=>{
  const newOffset = (event.selected * itemsPerPage) % data.length;
  setItemOffset(newOffset);
};

const registrarProducto = () => {
  Swal.fire({
    title: "Registrar Producto",
    html: `
      <input id="nombre" class="swal2-input" placeholder="Nombre">
      <input id="stock" class="swal2-input" placeholder="Stock">
      <input id="precio" class="swal2-input" placeholder="Precio">
      <input id="id_categoria" class="swal2-input" placeholder="ID Categoría">
    `,
    confirmButtonText: "Guardar",
    preConfirm: () => {
      const nombre = document.getElementById("nombre").value;
      const stock = document.getElementById("stock").value;
      const precio = document.getElementById("precio").value;
      const id_categoria = document.getElementById("id_categoria").value;

      if (!nombre || !stock || !precio || !id_categoria) {
        Swal.showValidationMessage("Todos los campos son obligatorios");
        return false;
      }

      return {
        nombre,
        stock,
        precio,
        id_categoria
      };
    }
  }).then(async (result) => {
    if (!result.isConfirmed) return;

    await axios.post("/productos", result.value, {
      headers: { Authorization: `Bearer ${token}` }
    });

    window.location.reload();
  });
};

const editarProducto = (p) => {
  Swal.fire({
    title: "Editar Producto",
    html: `
      <input id="nombre" class="swal2-input" value="${p.nombre}" placeholder="Nombre">
      <input id="stock" class="swal2-input" value="${p.stock}" placeholder="Stock">
      <input id="precio" class="swal2-input" value="${p.precio}" placeholder="Precio">
      <input
  id="id_categoria"
  class="swal2-input"
  value="${p.id_categoria ?? ""}"
  placeholder="ID Categoría"
/>
    `,
    confirmButtonText: "Actualizar",
    preConfirm: () => {
      const idCategoriaInput = document.getElementById("id_categoria").value;

      return {
        nombre: document.getElementById("nombre").value,
        stock: document.getElementById("stock").value,
        precio: document.getElementById("precio").value,
        id_categoria: idCategoriaInput !== "" ? idCategoriaInput : p.id_categoria
      };
    }
  }).then(async (result) => {
    if (!result.isConfirmed) return;

    await axios.put(`/productos/${p.id_producto}`, result.value, {
      headers: { Authorization: `Bearer ${token}` }
    });

    window.location.reload();
  });
};

const eliminarProducto=(id)=>{
 Swal.fire({
  title:"¿Eliminar?",
  text:"Esto no se puede deshacer",
  icon:"warning",
  showCancelButton:true,
  confirmButtonText:"Eliminar"
 }).then(async r=>{
  if(r.isConfirmed){
    await axios.delete(`/productos/${id}`,{
      headers:{Authorization:`Bearer ${token}`}
    });
    window.location.reload();
  }
 });
};

 return(
 <>
 <Navbar/>

 <div className="container mt-4">

  <div className="d-flex justify-content-between">
    <h3>Gestión de Productos</h3>

    {rol === "admin" &&
    <button className="btn btn-success"
      onClick={()=>registrarProducto()}>
      + Registrar Producto
    </button>}
  </div>

  <div className="table-responsive"></div>    
  <table className="table table-dark table-hover mt-3">
    <thead>
      <tr>
        <th>Producto</th>
        <th>Stock</th>
        <th>Precio</th>
        <th>Acciones</th>
      </tr>
    </thead>

    <tbody>
      {currentItems.map(p=>(
        <tr key={p.id_producto}>
          <td>{p.nombre}</td>
          <td>{p.stock}</td>
          <td>${p.precio}</td>

          {rol === "admin" &&
          <td>
            <button className="btn btn-warning btn-sm me-2" onClick={()=>editarProducto(p)}>
              Editar
            </button>

            <button className="btn btn-danger btn-sm" onClick={()=>eliminarProducto(p.id_producto)}>
              Eliminar
            </button>
          </td>}
        </tr>
      ))}
    </tbody>
  </table>

  <ReactPaginate
    className="pagination justify-content-center"
    pageClassName="page-item"
    pageLinkClassName="page-link"
    nextLabel=" Siguiente "
    previousLabel=" Anterior "
    activeClassName="active"
    onPageChange={handlePageClick}
    pageCount={pageCount}
  />

 </div>
 </>
);
  }
