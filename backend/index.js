const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/historial", require("./routes/historial"));

app.listen(4000, () => console.log("Servidor en puerto 4000"));
