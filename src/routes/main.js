const fs = require("fs");
const express = require("express");
const router = express.Router();

const PATH_ROUTES = __dirname;
const removeext = (filename) => filename.split(".").shift();
const xd = fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeext(file);

  if (name !== "main") {
    console.log("✅ [Rutas Cargadas] :", name);
    const route = require(`./${name}`);
    // router.use(`/${name}`, route.default || route); // Use the default export or the module itself
  }
});

const authRouter = require("./auth.js");
const usersRouter = require("./users");
const productsRouter = require("./productos");
const cartRouter = require("./cart");
const mercadopagoRouter = require("./mercadopago");

router.use(
  "/auth",
  authRouter
  // #swagger.tags = ['Auth']
);
router.use(
  "/users",
  usersRouter
  // #swagger.tags = ['Users']
);
router.use(
  "/products",
  productsRouter
  // #swagger.tags = ['Products']
);

router.use(
  "/cart",
  cartRouter
  // #swagger.tags = ['Cart']
);
router.use(
  "/mercadopago",
  mercadopagoRouter
  // #swagger.tags = ['MercadoPago']
);

module.exports = router;
