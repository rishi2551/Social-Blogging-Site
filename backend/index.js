import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import blogrouter from "./routes/blog.js";
import dotenv from "dotenv";
import cors from "cors"
import bodyParser from "body-parser";
import {fileURLToPath} from "url"
import {dirname,join} from "path";
dotenv.config();
const app = express();
const port = process.env.Port;
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/blog",blogrouter);
const  __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)
app.use("/uploads",express.static(join(__dirname,"uploads")))
const connection=process.env.connect_string

mongoose
  .connect(connection, 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("db is connected");
  })
  .catch((error) => {
    console.log("db is not connect",error);
  });
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
