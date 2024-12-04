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
  /*
  #swagger.tags = ['Users']
  #swagger.security = [{
      "bearerAuth": []
  }]
  */
);
router.use(
  "/products",
  productsRouter
  /*
  #swagger.tags = ['Products']
  #swagger.security = [{
      "bearerAuth": []
  }]
  */
);

router.use(
  "/cart",
  cartRouter
  /*
  #swagger.tags = ['Cart']
  #swagger.security = [{
      "bearerAuth": []
  }]
  */
);
router.use(
  "/mercadopago",
  mercadopagoRouter
  /*
  #swagger.tags = ['Mercadopago']
  #swagger.security = [{
      "bearerAuth": []
  }]
  */
);

module.exports = router;
