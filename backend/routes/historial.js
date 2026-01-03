const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async(req,res)=>{
 const data = await pool.query(`
  SELECT h.id_historial,
         p.nombre,
         h.tipo_movimiento,
         h.cantidad,
         to_char(h.fecha AT TIME ZONE 'America/Guayaquil', 'DD/MM/YYYY HH24:MI') AS fecha_local
  FROM historial h
  JOIN productos p ON h.id_producto = p.id_producto
  ORDER BY h.fecha DESC
 `);

 res.json(data.rows);
});

router.post("/", auth, async(req,res)=>{
 const {id_producto,tipo_movimiento,cantidad,usuario_responsable} = req.body;

 await pool.query(
  "INSERT INTO historial(id_producto,tipo_movimiento,cantidad,usuario_responsable) VALUES($1,$2,$3,$4)",
  [id_producto,tipo_movimiento,cantidad,usuario_responsable]
 );

 if(tipo_movimiento==="entrada"){
   await pool.query("UPDATE productos SET stock = stock + $1 WHERE id_producto=$2",
   [cantidad,id_producto]);
 }else{
   await pool.query("UPDATE productos SET stock = stock - $1 WHERE id_producto=$2",
   [cantidad,id_producto]);
 }

 res.json({msg:"Movimiento registrado"});
});

module.exports = router;
