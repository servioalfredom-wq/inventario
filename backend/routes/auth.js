const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "inventario2025";

// REGISTRO
router.post("/register", async(req,res)=>{
 const {nombre,email,password,rol} = req.body;

 const userExist = await pool.query(
  "SELECT * FROM usuarios WHERE email=$1",
  [email]
 );

 if(userExist.rows.length>0)
  return res.status(400).json({msg:"Usuario ya existe"});

 const hash = await bcrypt.hash(password,10);

 await pool.query(
  "INSERT INTO usuarios(nombre,email,password,rol) VALUES($1,$2,$3,$4)",
  [nombre,email,hash,rol || 'usuario']
 );

 res.json({msg:"Usuario registrado"});
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM usuarios WHERE email=$1",
    [email]
  );

  console.log("USUARIO ENCONTRADO:", user.rows);

  if (user.rows.length === 0)
    return res.status(400).json({ msg: "Usuario no existe" });

  const usuario = user.rows[0];

  const valid = await bcrypt.compare(password, usuario.password);
  if (!valid)
    return res.status(400).json({ msg: "Password incorrecto" });

  const payload = {
    id: usuario.id_usuario,
    email: usuario.email,
    rol: usuario.rol
  };

  console.log("PAYLOAD JWT:", payload);

  const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

  res.json({
    token,
    rol: usuario.rol
  });
});


module.exports = router;
