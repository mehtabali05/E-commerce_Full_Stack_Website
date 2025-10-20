import express from "express";
import dotenv from "dotenv";
// CONFIGURE DOTENV
dotenv.config();
import connectDb from "./config/db.js";
import morgan from "morgan";
import authRoute from "./routes/authRoute.js"
import cors from "cors";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js"; 
import cookieParser from "cookie-parser";




// CONNECT DB CALL
connectDb();

// REST OBJECT
const app = express();

//MIDDLEWARE
app.use(cors({
  origin: process.env.CLIENT_URL, // example: 'http://localhost:3000'
  credentials: true               // ✅ allow cookies
}));
app.use(cookieParser()); 
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(morgan("dev"));
 

// ROUTES 
app.use("/api/v1/auth",authRoute); 
app.use("/api/v1/category",CategoryRoutes);
app.use("/api/v1/product",ProductRoutes)

const port = process.env.port || 8000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(
    `Server is running on mode ${process.env.DEV_MODE} and on port ${port}`
  );
});
