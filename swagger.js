const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    version: "", // by default: '1.0.0'
    title: "E-commerce API", // by default: 'REST API'
    description:
      "This project is part of the Talentos Digitales Bootcamp and focuses on developing a full-stack e-commerce website from scratch. The goal is to build a fully functional e-commerce platform, applying skills in both backend and frontend development.", // by default: ''
  },
  host: "", // by default: 'localhost:3000'
  basePath: "", // by default: '/'
  schemes: [], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: "", // Tag name
      description: "", // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {}, // by default: empty object
};

const outputFile = "./swagger-output.json";

const routes = ["./src/routes/main.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc)
  .then(() => {
    require("./index.js");
  })
  .catch((error) => {
    console.error("Error generating Swagger:", error);
  });
// swaggerAutogen()(outputFile, routes, doc)
//   .then(() => {
//     console.log("Swagger generation successful!");
//   })
//   .catch((error) => {
//     console.error("Error generating Swagger:", error);
//   });
