// src/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crypto Price & Alert API",
      version: "1.0.0",
      description: "API for monitoring cryptocurrency prices and alerts",
    },
    servers: [
      {
        url: "http://localhost:5000/api", // base path
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // look for Swagger comments inside TS routes
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
