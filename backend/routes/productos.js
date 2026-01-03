const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.get("/", auth, async (req, res) => {
  const result = await pool.query("SELECT * FROM productos");
  res.json(result.rows);
});


router.post("/", auth, admin, async (req, res) => {
  try {
    const { nombre, stock, precio, id_categoria } = req.body;

    if (
  !nombre ||
  stock === "" ||
  precio === "" ||
  isNaN(parseInt(id_categoria))
) {
  return res.status(400).json({ msg: "Datos inválidos" });
}

    const result = await pool.query(
      `INSERT INTO productos(nombre, stock, precio, id_categoria)
       VALUES ($1,$2,$3,$4)
       RETURNING id_producto`,
      [nombre, parseInt(stock), parseFloat(precio), parseInt(id_categoria)]
    );

    const id_producto = result.rows[0].id_producto;

    await pool.query(
      `INSERT INTO historial(id_producto, tipo_movimiento, cantidad, usuario_responsable)
       VALUES ($1,$2,$3,$4)`,
      [id_producto, "creacion", parseInt(stock), req.user.id]
    );

    res.json({ msg: "Producto creado" });

  } catch (error) {
    console.error("ERROR POST productos:", error);
    res.status(500).json({ msg: "Error al crear producto" });
  }
});


router.put("/:id", auth, admin, async (req, res) => {
  try {
    const { nombre, stock, precio, id_categoria } = req.body;

    if (!nombre || stock == null || precio == null) {
  return res.status(400).json({ msg: "Datos inválidos" });
}

const categoriaFinal =
  id_categoria === null ||
  id_categoria === "" ||
  id_categoria === "null"
    ? null
    : parseInt(id_categoria);

    const prevProd = await pool.query(
      "SELECT stock, precio FROM productos WHERE id_producto=$1",
      [req.params.id]
    );

    if (prevProd.rows.length === 0) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    await pool.query(
  `UPDATE productos
   SET nombre=$1, stock=$2, precio=$3, id_categoria=$4
   WHERE id_producto=$5`,
  [
    nombre,
    parseInt(stock),
    parseFloat(precio),
    categoriaFinal,
    req.params.id
  ]
);

    if (parseInt(stock) !== prevProd.rows[0].stock) {
      await pool.query(
        `INSERT INTO historial(id_producto, tipo_movimiento, cantidad, usuario_responsable)
         VALUES ($1,$2,$3,$4)`,
        [req.params.id, "edicion_stock", parseInt(stock), req.user.id]
      );
    }

    if (parseFloat(precio) !== prevProd.rows[0].precio) {
      await pool.query(
        `INSERT INTO historial(id_producto, tipo_movimiento, cantidad, usuario_responsable)
         VALUES ($1,$2,$3,$4)`,
        [req.params.id, "cambio_precio", parseFloat(precio), req.user.id]
      );
    }

    res.json({ msg: "Producto actualizado" });

  } catch (error) {
    console.error("ERROR PUT productos:", error);
    res.status(500).json({ msg: "Error al actualizar producto" });
  }
});


router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const prod = await pool.query(
      "SELECT stock FROM productos WHERE id_producto=$1",
      [req.params.id]
    );

    if (prod.rows.length === 0) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    await pool.query(
      "DELETE FROM productos WHERE id_producto=$1",
      [req.params.id]
    );

    await pool.query(
      `INSERT INTO historial(id_producto, tipo_movimiento, cantidad, usuario_responsable)
       VALUES ($1,$2,$3,$4)`,
      [req.params.id, "eliminacion", prod.rows[0].stock, req.user.id]
    );

    res.json({ msg: "Producto eliminado" });

  } catch (error) {
    console.error("ERROR DELETE productos:", error);
    res.status(500).json({ msg: "Error al eliminar producto" });
  }
});

module.exports = router;
