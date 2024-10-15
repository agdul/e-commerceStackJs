const mongoose = require("mongoose");

const mongoUrl = process.env.URL_MONGO;

mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error : "));
db.once("open", () => {
  console.log("Conexion exitosa a la db");
});

module.exports = { mongoose };
