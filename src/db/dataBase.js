const mongoose = require("mongoose");

const mongoUrl = process.env.URL_MONGO;

mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error : "));
db.once("open", () => {
  console.log("✅ [Base de dato Mongodb] Conexion establecida correctamente");
});

module.exports = { mongoose };
