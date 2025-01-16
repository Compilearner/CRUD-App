import express from 'express';
import dotenv from "dotenv";
import path from "path";
import { connectDB } from './config/db.js';
import productRoutes from "./Routes/productRoutes.js"; // Correct patth


dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middleware: allows us to get request body in understandable format using parsing
app.use(express.json());

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production"){
    // Deploying frontend as static files on the same port number
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    // Renders react app whenever, routes are other than this "/api/products"
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}


app.listen(PORT, ()=>{
    connectDB();
    console.log("Server started at http://localhost:PORT");
});
// 7G43uOEqSmhEW6O7