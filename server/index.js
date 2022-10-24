import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import getRouter from "./routers/index.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const URL = process.env.MONGODB_URL;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Citizen Management API",
      version: "1.0.0",
      description: "A simple UI for Citizen Management API"
    },
    servers: [
      {
        url: "http://localhost:" + process.env.PORT
      }
    ]
  },
  apis: ["./routers/*.js"]
}

const specs = swaggerJsDoc(options)
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', getRouter);

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Sever is running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });